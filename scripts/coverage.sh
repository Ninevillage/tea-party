#!/usr/bin/env sh
BASEDIR=$(dirname $(readlink -f $0))

export NODE_ENV='test'
export DEBUG='tea-party:tea-party:*'
export CONFIG="$BASEDIR/../app/config"
export HELPERS="$BASEDIR/../app/helpers"
export MODELS="$BASEDIR/../app/models"
export MODULES="$BASEDIR/../app/helpers/modules"

istanbul cover -x "**/vendor/**" _mocha -- -R spec --recursive ./test
export CODECLIMATE_REPO_TOKEN=86f5769ffecb56e9cec7a8cc032a5dff38db15ca64e76016fab0efa13e484dbd
codeclimate < coverage/lcov.info