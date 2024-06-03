/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as monaco from 'monaco-editor';
import * as vscode from 'vscode';
import '@codingame/monaco-vscode-theme-defaults-default-extension';
import { whenReady } from '@codingame/monaco-vscode-python-default-extension';
import { LogLevel } from 'vscode/services';
import { createConfiguredEditor, createModelReference } from 'vscode/monaco';
import { ExtensionHostKind, registerExtension } from 'vscode/extensions';
import getConfigurationServiceOverride, { updateUserConfiguration } from '@codingame/monaco-vscode-configuration-service-override';
import getKeybindingsServiceOverride from '@codingame/monaco-vscode-keybindings-service-override';
import getThemeServiceOverride from '@codingame/monaco-vscode-theme-service-override';
import getTextmateServiceOverride from '@codingame/monaco-vscode-textmate-service-override';
import { initServices, MonacoLanguageClient } from 'monaco-languageclient';
import { CloseAction, ErrorAction, MessageTransports } from 'vscode-languageclient';
import { BrowserMessageReader, BrowserMessageWriter } from 'vscode-languageserver-protocol/browser.js';
import { RegisteredFileSystemProvider, registerFileSystemOverlay, RegisteredMemoryFile } from '@codingame/monaco-vscode-files-service-override';
import { Uri } from 'vscode';
import * as JSZip from 'jszip';

import { buildWorkerDefinition } from 'monaco-editor-workers';
// TODO: fix the workers path, maybe need to configure the bundler to copy the workers files
// we are running under a reverse proxy since we needed Node to run the monaco editor. We need to 
//   show the baseURL as /js/monaco to serve up the worker correctly.
buildWorkerDefinition('monaco-editor-workers/dist/workers', new URL('', window.location.href + 'js/monaco/').href, false);

const languageId = 'python';
let languageClient: MonacoLanguageClient;

let files: { [id: string]: string } = {};

/**
 * read file contents from zip file using jszip
 * @param url url of the zip file
 * @returns object with file path and file contents
 */
async function readZipFile(url: string) {
    try {
        const response = await fetch(url);
        const data = await response.arrayBuffer();
        const results: { [id: string]: string } = {};
        const zip = await JSZip.loadAsync(data);
        for (let [filename, file] of Object.entries(zip.files)) {
            // skip directories which suffixed with '/'
            if (filename.endsWith('/')) {
                // console.info(`Skip directory ${filename}`);
                continue;
            }
            if (filename.startsWith("__MACOSX")){
                // skip internal files
                continue;
            }
            // filename = filename.replace(/^stdlib/, '/workspace/typings');
            filename = filename.replace(/^(stdlib|stubs)/, '/$1');
            // filename = filename.replace(/^(stdlib|stubs)/, '/workspace/$1');
            //console.info(`Reading ${filename}`);
            results[filename] = await file.async('text');
        }
        console.info(`Read ${Object.keys(results).length} files`);
        // console.info(results);
        return results;
    } catch (error) {
        console.error(error);
        return {};
    }
}

const createLanguageClient = (transports: MessageTransports): MonacoLanguageClient => {
    return new MonacoLanguageClient({
        name: 'Pyright Language Client',
        clientOptions: {
            // use a language id as a document selector
            documentSelector: [languageId],
            // disable the default error handler
            errorHandler: {
                error: () => ({ action: ErrorAction.Continue }),
                closed: () => ({ action: CloseAction.DoNotRestart })
            },
            // pyright requires a workspace folder to be present, otherwise it will not work
            workspaceFolder: {
                index: 0,
                name: '/',
                // uri: monaco.Uri.parse('/workspace')
                uri: Uri.file('/')
            },
            synchronize: {
                fileEvents: [vscode.workspace.createFileSystemWatcher('**')]
            },
            initializationOptions: {
                files
            }
        },
        // create a language client connection from the JSON RPC connection on demand
        connectionProvider: {
            get: () => {
                return Promise.resolve(transports);
            }
        }
    });
};

export const startPythonClient = async () => {
    // read typeshed stdlib.zip file
    // files = await readZipFile(new URL('./stdlib.zip', window.location.href).href);
    console.log('readZipFile stdlib-source-with-typeshed-pyi.zip');

    let files1: { [id: string]: string } = {};
    let files2: { [id: string]: string } = {};
    files1 = await readZipFile(new URL('/js/monaco/stdlib-source-with-typeshed-pyi.zip', window.location.href).href);
    files2 = await readZipFile(new URL('/js/monaco/XRPLib.zip', window.location.href).href);
    files = Object.assign({}, files1, files2);
    console.log('starting initServices ...');
    // init vscode-api
    await initServices({
        userServices: {
            ...getThemeServiceOverride(),
            ...getTextmateServiceOverride(),
            ...getConfigurationServiceOverride(),
            ...getKeybindingsServiceOverride()
        },
        debugLogging: true,
        workspaceConfig: {
            workspaceProvider: {
                trusted: true,
                workspace: {
                    workspaceUri: Uri.file('/workspace')
                },
                async open() {
                    return false;
                }
            },
            developmentOptions: {
                logLevel: LogLevel.Debug
            }
        }
    });

    await whenReady();

    // extension configuration derived from:
    // https://github.com/microsoft/pyright/blob/main/packages/vscode-pyright/package.json
    // only a minimum is required to get pyright working
    const extension = {
        name: 'python-client',
        publisher: 'monaco-languageclient-project',
        version: '1.0.0',
        engines: {
            vscode: '^1.78.0'
        },
        contributes: {
            languages: [{
                id: languageId,
                aliases: [
                    'Python'
                ],
                extensions: [
                    '.py',
                    '.pyi'
                ]
            }],
            commands: [{
                command: 'pyright.restartserver',
                title: 'Pyright: Restart Server',
                category: 'Pyright'
            },
            {
                command: 'pyright.organizeimports',
                title: 'Pyright: Organize Imports',
                category: 'Pyright'
            }],
            keybindings: [{
                key: 'ctrl+k',
                command: 'pyright.organizeimports',
                when: 'editorTextFocus'
            }]
        }
    };
    registerExtension(extension, ExtensionHostKind.LocalProcess);

    updateUserConfiguration(`{
        "editor.fontSize": 14,
        "workbench.colorTheme": "Default Dark Modern"
    }`);

    const pythonWorkerUrl = new URL('/js/monaco/@typefox/pyright-browser/dist/pyright.worker.js', window.location.href).href;
    console.info(`main.ts, pythonWorkerUrl: ${pythonWorkerUrl}`);
    const worker = new Worker(pythonWorkerUrl);
    worker.postMessage({
        type: 'browser/boot',
        mode: 'foreground'
    });
    const reader = new BrowserMessageReader(worker);
    const writer = new BrowserMessageWriter(worker);
    languageClient = createLanguageClient({ reader, writer });
    languageClient.start();
    reader.onClose(() => languageClient.stop());

    const registerCommand = async (cmdName: string, handler: (...args: unknown[]) => void) => {
        // commands should not be there, but it demonstrates how to retrieve list of all external commands
        const commands = await vscode.commands.getCommands(true);
        if (!commands.includes(cmdName)) {
            vscode.commands.registerCommand(cmdName, handler);
        }
    };
    // always exectute the command with current language client
    await registerCommand('pyright.restartserver', (...args: unknown[]) => {
        languageClient.sendRequest('workspace/executeCommand', { command: 'pyright.restartserver', arguments: args });
    });
    await registerCommand('pyright.organizeimports', (...args: unknown[]) => {
        languageClient.sendRequest('workspace/executeCommand', { command: 'pyright.organizeimports', arguments: args });
    });
     
};

export const createEditor = async (HTMLID : any, path : string, data: string) => {

    const fileSystemProvider = new RegisteredFileSystemProvider(false);
    fileSystemProvider.registerFile(new RegisteredMemoryFile(vscode.Uri.file(path), data));
    registerFileSystemOverlay(1, fileSystemProvider);
    // use the file create before
    const modelRef = await createModelReference(monaco.Uri.file(path));
    modelRef.object.setLanguageId(languageId);

    // create monaco editor
    const ed = createConfiguredEditor(HTMLID, {
        model: modelRef.object.textEditorModel,
        automaticLayout: true,
        minimap: { enabled: false }
    });

    return ed;

};

export const setKeyboardHandler = async (editor : monaco.editor.IStandaloneCodeEditor, handler : Function) => {
    editor.addAction({
        id: 'my-unique-id',
        label: 'My Label!!!',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
        run: function(ed) { handler() }
    });
    
};
    // await startPythonClient();