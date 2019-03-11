
#!/bin/bash

# build site
npx gulp build

# deploy to master
npx gh-pages -b master -d dist