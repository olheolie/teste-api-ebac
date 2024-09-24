pipeline {
    agent any

    stages {
        stage('Clonar repositório'){
            steps{
                git branch: 'main',url: 'https://github.com/olheolie/teste-api-ebac.git'    
            }
        }
        stage('Instalar dependencias'){
            steps{
                    bat 'npm install'
            }
        }
        stage('Testes'){
            steps{
                   bat 'set NO_COLOR=1 npm run cy run'
            }
        }
    }
}