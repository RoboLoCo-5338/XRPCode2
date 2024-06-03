 #!/bin/bash
 
 
 echo "Starting python server..."
 python3 -m http.server --cgi 8081 &

while ! nc -z localhost 8081; do
  sleep 1
  echo "Waiting for server to start..."
done

echo "Starting node server..."
cd ./js/monaco
 node --experimental-import-meta-resolve ./node_modules/vite/bin/vite.js --base=/js/monaco &

while ! nc -z localhost 5173; do
  sleep 1
  echo "Waiting for server to start..."
done

echo "Starting Nginx..."
cd ../..
nginx -c ~/dev/github/XRPCode/nginx.conf


wait
