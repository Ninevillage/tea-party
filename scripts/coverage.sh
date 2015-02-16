#!/usr/bin/env sh

istanbul cover -x "**/vendor/**" _mocha -- -R spec --recursive ./test
export CODECLIMATE_REPO_TOKEN=86f5769ffecb56e9cec7a8cc032a5dff38db15ca64e76016
codeclimate < coverage/lcov.info