#!/usr/bin/env sh

istanbul cover -x "**/vendor/**" _mocha -- -R spec --recursive ./test
export CODECLIMATE_REPO_TOKEN=44e854e9f538b5e8df7ed5e7efc78533999817d9b9a088a7
codeclimate < coverage/lcov.info