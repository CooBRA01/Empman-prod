pipeline {
    agent any
    
    stages {
        stage('Build and Push Docker Images') {
             environment {
                dockerhub=credentials('bk-dockerhub')
        }
            steps {
                sh 'docker build -t front:latest ./client'
                sh 'docker build -t back:latest ./server'
                sh 'echo $dockerhub_PSW | docker login -u $dockerhub_USR --password-stdin'
                sh 'docker tag front:latest bkhedher/front:latest'
                sh 'docker tag back:latest  bkhedher/back:latest'
                sh 'docker push  bkhedher/front:latest'
                sh 'docker push  bkhedher/back:latest'
            }
        }
        stage('Deploy Staging') {
            steps {
                script {
                ansiblePlaybook become: true, colorized: true, credentialsId: 'access-creds', disableHostKeyChecking: true, installation: 'ansible', inventory: 'inventory', playbook: 'ansible-staging.yml', vaultCredentialsId: 'ansible-vault-password'}
            }
        }
        stage('Approve Production Deployment') {
            input {
                message "Do you want to deploy to production?"
                ok "Yes"
            }
            steps {
                // Empty block; just for the approval step
            }
        }
        stage('Deploy Production') {
            steps {
                script {
		ansiblePlaybook become: true, colorized: true, credentialsId: 'access-creds', disableHostKeyChecking: true, installation: 'ansible', inventory: 'inventory', playbook: 'ansible-production.yml', vaultCredentialsId: 'ansible-vault-password'
                }

            }
        }
    }
}

