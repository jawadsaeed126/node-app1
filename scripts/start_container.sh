#!/bin/bash
set -e

# Login , authenticate your Docker client to your registry
aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com


# Pull the Docker image from Docker Hub
docker pull $REPOSITORY_URI:latest

# Run the Docker image as a container
docker run -d -p 3000:3000 --name container-app1 $REPOSITORY_URI:latest
