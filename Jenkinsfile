pipeline {
  agent any

  environment {
    APP = "svelte-sample"
    BUILD = "${JOB_NAME.replace('/', '-').replace(' ', '-').toLowerCase()}-${BUILD_NUMBER}"
    EMAIL = sh(script: "git show -s --format='%ae' HEAD", returnStdout: true)
    GIT_LAST_CHANGE = sh(script: 'git show', returnStdout: true)
    EMAIL_BODY = "Project: ${JOB_NAME}\nBuild Number: ${BUILD_NUMBER}\n\nLast change:\n\n${env.GIT_LAST_CHANGE}"
    COMPOSE = "docker-compose -f docker-compose.yml -p $APP"
    VERSION = sh(script: 'git describe --tags --always --long', returnStdout: true).trim()
    RUN_TESTS = "docker run --network ${APP}_default -e BUILD=$BUILD"
  }

  stages {
    stage('Build UI') {
      steps {
        sh "docker build --target build-ui -t ${BUILD}_ui ."
      }
    }
    stage('Test UI') {
      steps {
        sh "docker run -t ${BUILD}_ui npm run test"
      }
    }
    stage('Build final') {
      when {
         branch 'master'
      }
      steps {
        sh "$COMPOSE build --build-arg VERSION=$VERSION"
      }
    }
    stage('Deploy') {
      when {
         branch 'master'
      }
      steps {
        sh "$COMPOSE up -d --remove-orphans"
      }
    }
  }
  post {
    failure {
      script {
        if (EMAIL) mail to: EMAIL, subject: "$APP ($BRANCH_NAME) build failed", body: EMAIL_BODY
      }
    }
  }
}
