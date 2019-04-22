
#!/bin/bash

# build site
npx gulp build

# watch files and launch http-server
npx gulp watch & npx http-server -p 9999 -o -c-1 ./dist && fg

