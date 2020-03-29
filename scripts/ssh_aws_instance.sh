#!/usr/bin/env bash

source ./scripts/set_environment.sh

echo -e "${COLOR}::::Connecting to AWS Instance::::${NC}"

if [ "$ENV" == "production" ]; then
  ./scripts/whitelist_ip_for_production.sh
fi

ssh -o StrictHostKeyChecking=no -i "${AWS_PRIVATE_KEY_PATH}" ${AWS_INSTANCE_URL}
