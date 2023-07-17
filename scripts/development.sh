
#!/bin/bash

# build site
gulp build

# watch files and launch http-server
gulp watch & http-server -p 9999 -o -c-1 ./dist && fg

