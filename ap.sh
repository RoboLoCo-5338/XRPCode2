 #!/bin/bash
 

echo "Starting node server..."

# staging version
current_dir=$(pwd)
cd $current_dir/staging/js/monaco
# node --experimental-import-meta-resolve ./node_modules/vite/bin/vite.js --base=/staging/js/monaco &

# release version
 cd $current_dir/js/monaco
 #node --experimental-import-meta-resolve ./node_modules/vite/bin/vite.js --base=/js/monaco --port=5174 &
 node --experimental-import-meta-resolve ./node_modules/vite/bin/vite.js --base=/js/monaco --port=5174 &

while ! nc -z localhost 5174; do
  sleep 1
  echo "Waiting for server to start..."
done

echo "Starting apache..."
cd $current_dir
#current_dir=$(pwd)

/usr/local/opt/httpd/bin/httpd -f $current_dir/httpd.conf

wait
