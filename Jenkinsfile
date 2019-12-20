@Library('variables')_

pipeline {
          
environment{
		 deploydate = System.currentTimeMillis();
		command="test"
}
agent any
      
      	stages {
	
		
		stage('Build image'){
                      steps{
				script{
					slackNotify("STARTED", env.JOB_NAME, env.BUILD_NUMBER, env.BUILD_URL)
					commitId = sh(returnStdout: true, script: "git rev-parse HEAD")
					image="560434304607.dkr.ecr.us-east-2.amazonaws.com/molecule-quickstart:${commitId}"
					echo image
					sh "docker image prune -af"
					sh '''docker-compose build molecule-quickstart'''
					sh "docker tag molecule-quickstart:latest ${image}"
					sh "`aws ecr get-login --no-include-email --region=us-east-2`"
				        sh "docker push ${image}"
						}	

  					}		
				}
		stage('Deploy') {
			steps {
			script{
				sh ". /etc/profile > /dev/null 2>&1 ; kubectl config use-context devqa;"
				sh " kubectl --namespace=dev set image deployment molecule-quickstart-deployment molecule-quickstart=${image}"
				sh ". /etc/profile > /dev/null 2>&1 ; kubectl config use-context devqa; kubectl rollout status deployment molecule-quickstart-deployment --namespace=dev"
			}
}
			}
		}
	post{
		always {
			 cleanWs()
			slackNotify(currentBuild.currentResult, env.JOB_NAME, env.BUILD_NUMBER, env.BUILD_URL)
		}
	}


		}

