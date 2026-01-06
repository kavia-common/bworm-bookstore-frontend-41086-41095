#!/bin/bash
cd /home/kavia/workspace/code-generation/copy-of-bworm-bookstore-frontend-bworm-bookstore-frontend-41086-41095-41174/frontend_bworm
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

