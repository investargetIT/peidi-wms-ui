#!/bin/bash

docker run -it --rm \
  --name peidi-wms-ui \
  -v $(pwd):/app \
  -v /app/node_modules \
  -v /app/.pnpm-store \
  -p 5173:5173 \
  peidi-wms-ui

