#!/usr/bin/env bash

set -e

export COLOR='\033[0;32m'
export NC='\033[0m'
export ERR='\033[0;31m'

export TAG_NAME=${TAG:-"latest-$(git rev-parse HEAD)"}
export AWS_PROFILE_PARAM=''
export ENV_FILE_PATH='.env'
export ENV_NAME='STAGING'

# todo: REPLACE HERE: environment for Test instance
export AWS_PRIVATE_KEY_PATH=~/Desktop/projects/keys/subin-dev.pem
export AWS_ECR_REPO_URL="531285185480.dkr.ecr.us-east-2.amazonaws.com/flex-test-auto-setup:${TAG_NAME}"
export AWS_INSTANCE_URL='ubuntu@3.22.19.10'
export AWS_INSTANCE_REGION='us-east-2'
export AWS_SECURITY_GROUP_ID='sg-075560295c72c3b86'
export AWS_ACCESS_KEY_PATH=~/Desktop/projects/keys/accessKeys_subin.csv
export AWS_ENV_USER_ACCESS_KEY_PATH=~/Desktop/projects/keys/accessKeys_env_user_credentials.csv
export ENV_FILE_PATH='.env.staging'
export ENV_NAME='STAGING'
export AWS_ENV_SECRET_NAME='subin/web/staging/hxL5vtNilAcP2xdU'

if [ "$CIRCLECI" != "true" ]; then
  cp .env.staging .env
fi

if [ "$ENV" == "production" ] || [ "$CIRCLE_BRANCH" == "production" ]; then
  echo -e "${COLOR}:::::::::::::Setting environment for PRODUCTION::::::::::::::${NC}"
  # todo: REPLACE HERE: environment for Production instance
  export AWS_PRIVATE_KEY_PATH=~/Desktop/projects/keys/journey-horizon-prod.pem
  export AWS_ECR_REPO_URL="050309102952.dkr.ecr.ap-southeast-2.amazonaws.com/jh-flex-demo-prod:${TAG_NAME}"
  export AWS_INSTANCE_URL='ubuntu@ec2-13-54-28-75.ap-southeast-2-prod.compute.amazonaws.com'
  export AWS_INSTANCE_REGION='ap-southeast-2'
  export AWS_SECURITY_GROUP_ID='sg-01f6fe3f3d538d8ac'
  export ENV_FILE_PATH='.env.prod'
  export ENV_NAME='PRODUCTION'
  export AWS_ENV_SECRET_NAME='projectName/projectEnv/randomKey'

  if [ "$CIRCLECI" != "true" ]; then
    cp .env.prod .env
  fi

else
  echo -e "${COLOR}:::::::::::::Setting environment for TEST::::::::::::::${NC}"
fi

if [ "$CIRCLECI" == "true" ]; then
  echo -e "${COLOR}:::::::::::::Deploying by the CIRCLE CI::::::::::::::${NC}"
  export AWS_PRIVATE_KEY_PATH='permission.pem'

  if [ "$CIRCLE_BRANCH" != "master" ] && [ "$CIRCLE_BRANCH" != "production" ]; then
    echo -e "${COLOR}:::::::::Current branch $CIRCLE_BRANCH will not be deployed from the CI:::::::::${NC}"
    echo -e "${COLOR}:::::::::Exiting:::::::::${NC}"
    exit 0
  fi

else
  echo -e "${COLOR}:::::::::Deploying by the local machine:::::::::${NC}"
  # todo: REPLACE HERE: indicate AWS profile
  export AWS_PROFILE_PARAM='--profile=subin'
  cp Dockerfile_local Dockerfile
  echo -e 'node_modules\nbuild\nnpm-debug.log\nyarn-error.log' > .dockerignore
fi
