#!/bin/bash
set -e

export AWS_DEFAULT_REGION=eu-west-1
export AWS_ACCOUNT_ID=099199746132
export REPOSITORY_URI=099199746132.dkr.ecr.eu-west-1.amazonaws.com/private-ecr-repository-app1-node-api1

# Login , authenticate your Docker client to your registry
aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com


# Pull the Docker image from ECR
docker pull $REPOSITORY_URI:latest

# Run
# Run the Docker image as a container
docker run -d -p 3000:3000 $REPOSITORY_URI:latest
# cd /home/ubuntu/project-root/node-application1
# docker-compose up -d
