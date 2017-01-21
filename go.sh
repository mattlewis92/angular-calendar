#!/bin/bash
npm run build:demos && npm run compodoc
git add . && git commit -m 'chore: build demos and docs' && git push -f && git checkout master