#!/usr/bin/env sh

istanbul cover -x "**/vendor/**" _mocha -- -R spec --recursive ./test