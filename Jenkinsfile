pipeline {
    environment {
        AWS_ACCOUNT_ID = '099199746132'
        AWS_DEFAULT_REGION = 'eu-west-1'
        ECR_REPOSITORY = 'node-app-ecr'
        ECS_CLUSTER_NAME = 'Demo-Node-App-Cluster'
        ECS_SERVICE_NAME = 'node-service'
    }
    agent any

    stages {
        stage('Checkout') {
            steps {
               
                checkout scm
            }
        }

        stage('Build and Tag Docker Image') {
            steps {
                script {
                    
                    GIT_COMMIT = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()

                    
                    IMAGE_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${ECR_REPOSITORY}:latest"

                    
                    sh "docker build -t ${IMAGE_URI} ."
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {
                    
                    sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"

                    
                    sh "docker push ${IMAGE_URI}"

                    
                    sh "aws ecs update-service --cluster ${ECS_CLUSTER_NAME} --service ${ECS_SERVICE_NAME} --force-new-deployment --region ${AWS_DEFAULT_REGION}"
                }
            }
        }

        // Include additional stages as needed
    }

    post {
        always {
    
            echo 'Build completed'
        }
    }
}
