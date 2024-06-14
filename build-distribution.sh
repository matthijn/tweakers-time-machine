#!/bin/bash
npm run build-dev

DIST_DIR=./distribution
NOW=$(date +"%Y-%m-%d_%H-%M")
ZIP_FILE="tweakers-time-machine ${NOW}.zip"
rm -rf ${DIST_DIR}
rm -f
mkdir ${DIST_DIR}

cp -r ./dist ./assets ./manifest.json ./popup.html ${DIST_DIR}

rm -f "${ZIP_FILE}"

cd ${DIST_DIR}

zip -r "${ZIP_FILE}" ./
mv "${ZIP_FILE}" ../

cd ../

rm -rf ${DIST_DIR}