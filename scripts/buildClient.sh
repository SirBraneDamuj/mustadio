#!/bin/sh

(cd client && npm install && npm run build)
cp client/build/* public/