pipeline {
	agent none
	stages {
		stage('Build') {
			agent {
				docker {
					image 'node:9-alpine'
				}
			}
			steps {
				sh 'npm install'
				sh 'npm run build'
			}
		}
	}
}
