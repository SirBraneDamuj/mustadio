#!/bin/sh

(cd client && npm run build)
cp client/build/* public/