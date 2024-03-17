pipeline {
    agent any
    environment {
        // Define static environment variables
        AWS_ACCOUNT_ID = '099199746132'
        AWS_DEFAULT_REGION = 'eu-west-1'
        ECR_REPOSITORY = 'node-app-ecr'
        ECS_CLUSTER_NAME = 'Demo-Node-App-Cluster'
        ECS_SERVICE_NAME = 'Demo-Node-App-Service'
    }
    stages {
        stage('Prepare') {
            steps {
                script {
                    // Dynamically define IMAGE_TAG based on BUILD_NUMBER
                    IMAGE_TAG="$(date +%Y-%m-%d.%H.%M.%S).$(echo $CODEBUILD_RESOLVED_SOURCE_VERSION | head -c 8)"
                }
            }
        }
        stage('Checkout Code') {
            steps {
                checkout scm: [
                    $class: 'GitSCM',
                    branches: [[name: '*/master']], // Adjust branch as needed
                    userRemoteConfigs: [[
                        credentialsId: 'GitHub-PAT',
                        url: 'https://github.com/jawadsaeed126/node-app1.git'
                    ]]
                ]
            }
        }
        stage('Login to ECR') {
            steps {
                script {
                    // Login to ECR
                    sh "aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build your Docker image with the build number as tag
                    sh "docker build -t ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG} ."
                }
            }
        }
        
        stage('Push Docker Image to ECR') {
            steps {
                script {
                    // Push the Docker image to your ECR repository
                    sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${ECR_REPOSITORY}:${IMAGE_TAG}"
                }
            }
        }
        stage('Deploy to ECS') {
            steps {
                script {
                    // Update the ECS service to use the new Docker image
                    sh "aws ecs update-service --cluster ${ECS_CLUSTER_NAME} --service ${ECS_SERVICE_NAME} --force-new-deployment"
                }
            }
        }
    }
    post {
        always {
            // Added a simple echo step to ensure the block is not empty
            echo 'Cleanup or notification steps can be added here.'
        }
    }
}
