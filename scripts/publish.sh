
#!/bin/bash

# build site
gulp build

# deploy to master
npx gh-pages -b master -d dist