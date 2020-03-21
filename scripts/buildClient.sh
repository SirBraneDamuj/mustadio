#!/bin/sh

(cd client && npm install && npm run build)
mkdir public
cp -R client/build/* public/