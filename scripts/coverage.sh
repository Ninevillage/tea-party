#!/usr/bin/env sh

istanbul cover -x "**/vendor/**" _mocha -- -R spec --recursive ./test

#export CODECLIMATE_REPO_TOKEN=
#codeclimate < coverage/lcov.info