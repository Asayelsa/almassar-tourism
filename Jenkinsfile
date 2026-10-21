pipeline {
    agent any
    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '5'))
        timeout(time: 30, unit: 'MINUTES')
    }
    environment {
        IMAGE = 'localhost:5000/cc-prod-12334612'
        DEPLOY_HOST = '152.67.9.249'
        DEPLOY_USER = 'ubuntu'
        DEPLOY_PORT = '21631'
        SSH_PORT = '22'
        CONTAINER = 'cc-prod-12334612'
        ENV_FILE = credentials('env-cc-prod-12334612')
    }
    stages {
        stage('Prepare') {
            steps {
                // Pull project files from SDK server via SSH.
                // Works for all projects regardless of git/SCM setup.
                sh """
                    ssh -o StrictHostKeyChecking=no -i /var/lib/jenkins/.ssh/sdk_access_key root@149.5.247.109 \\
                      "tar czf - -C /opt/tediux/projects/default/locally_initialised/42d6f3fc-6853-4abf-a5bf-9e132af66c77 --exclude=.git --exclude=node_modules --exclude=__pycache__ --exclude=.next --exclude=.venv --exclude=venv --exclude=.cache --exclude=.config --exclude=.local --exclude='*.pyc' ." \\
                      | tar xzf - -C \${WORKSPACE}/
                    echo "\${ENV_FILE}" | base64 -d > \${WORKSPACE}/.env
                    ls -la \${WORKSPACE}/
                """
            }
        }
        stage('Validate') {
            steps {
                // Validate docker-compose.prod.yml syntax and config.
                // Catches YAML errors, invalid service references, and
                // interpolation issues BEFORE building anything.
                sh """
                    cd \${WORKSPACE}
                    echo "=== Validating docker-compose.prod.yml ==="
                    docker compose -f docker-compose.prod.yml config --quiet
                    echo "Compose config: VALID"
                """
            }
        }
        stage('CI Build and Smoke Test') {
            steps {
                // Build images and run a smoke test ON JENKINS (not on prod).
                // This catches: Dockerfile build errors, missing dependencies,
                // container crash-on-start, broken health checks — all before
                // touching the production server.
                sh """
                    cd \${WORKSPACE}
                    echo "=== Building images locally (CI) ==="
                    docker compose -f docker-compose.prod.yml build
                """
                sh """
                    cd \${WORKSPACE}
                    echo "=== Starting containers for smoke test ==="
                    docker network create traefik-public 2>/dev/null || true
                    docker compose -f docker-compose.prod.yml -p cc-prod-12334612-ci up -d --remove-orphans
                """
                // Wait for at least one healthy container (2 min max).
                // Shorter timeout than prod health check — this is just a smoke test.
                sh """
                    PASSED=0
                    for i in \$(seq 1 12); do
                        PS=\$(docker compose -f \\${WORKSPACE}/docker-compose.prod.yml -p cc-prod-12334612-ci ps 2>/dev/null || true)
                        HEALTHY=\$(echo "\$PS" | grep -c '(healthy)' || true)
                        BAD=\$(echo "\$PS" | grep -cE '\\(unhealthy\\)|Restarting|Exited \\([1-9]' || true)
                        echo "CI smoke test: \$HEALTHY healthy, \$BAD failing (attempt \$i/12)"
                        if [ "\$HEALTHY" -gt 0 ] && [ "\$BAD" -eq 0 ] 2>/dev/null; then
                            echo "CI smoke test PASSED"
                            PASSED=1
                            break
                        fi
                        if [ "\$BAD" -gt 0 ] && [ "\$i" -gt 3 ] 2>/dev/null; then
                            echo "CI smoke test: containers crashing, failing fast"
                            break
                        fi
                        sleep 10
                    done
                    if [ "\$PASSED" -eq 0 ]; then
                        echo "=== CI SMOKE TEST FAILED ==="
                        echo "=== Container status ==="
                        docker compose -f \\${WORKSPACE}/docker-compose.prod.yml -p cc-prod-12334612-ci ps -a || true
                        echo "=== Container logs ==="
                        docker compose -f \\${WORKSPACE}/docker-compose.prod.yml -p cc-prod-12334612-ci logs --tail=30 || true
                        docker compose -f \\${WORKSPACE}/docker-compose.prod.yml -p cc-prod-12334612-ci down --remove-orphans --volumes 2>/dev/null || true
                        exit 1
                    fi
                """

                // Tear down CI containers — smoke test passed, safe to deploy.
                sh """
                    docker compose -f \\${WORKSPACE}/docker-compose.prod.yml -p cc-prod-12334612-ci down --remove-orphans --volumes 2>/dev/null || true
                    echo "CI cleanup complete"
                """
            }
        }
        stage('Deploy') {
            steps {
                sshagent(credentials: ['ssh-cc-prod-12334612']) {
                    // Transfer project files to the target via tarball
                    sh """
                        tar czf /tmp/${CONTAINER}-src.tar.gz -C \${WORKSPACE} .
                        ssh -o StrictHostKeyChecking=no -p ${SSH_PORT} ${DEPLOY_USER}@${DEPLOY_HOST} "mkdir -p ~/deployments/${CONTAINER} && docker run --rm -v ~/deployments/${CONTAINER}:/wipe alpine find /wipe -mindepth 1 -delete"
                        scp -o StrictHostKeyChecking=no -P ${SSH_PORT} /tmp/${CONTAINER}-src.tar.gz ${DEPLOY_USER}@${DEPLOY_HOST}:/tmp/
                        ssh -o StrictHostKeyChecking=no -p ${SSH_PORT} ${DEPLOY_USER}@${DEPLOY_HOST} "cd ~/deployments/${CONTAINER} && tar xzf /tmp/${CONTAINER}-src.tar.gz && rm /tmp/${CONTAINER}-src.tar.gz"
                        rm -f /tmp/${CONTAINER}-src.tar.gz
                    """
                    // Rollout: build new images while old containers still
                    // serve traffic, then bring the stack up. Traefik detects
                    // the new containers via Docker events and routes traffic
                    // once healthy — no explicit down needed.
                    // Snapshot current images as :rollback BEFORE building
                    // over them — a failed health check restores these. The
                    // .deploy-started marker gates the rollback handler so
                    // failures before this point can never trigger it.
                    sh """
                        ssh -o StrictHostKeyChecking=no -p ${SSH_PORT} ${DEPLOY_USER}@${DEPLOY_HOST} \\
                          "docker images --format '{{.Repository}}' | grep '^${CONTAINER}-' | sort -u | xargs -r -I@ docker tag @:latest @:rollback" || true
                        touch \${WORKSPACE}/.deploy-started
                        ssh -o StrictHostKeyChecking=no -p ${SSH_PORT} ${DEPLOY_USER}@${DEPLOY_HOST} \\
                          "docker network create traefik-public 2>/dev/null || true && \\
                           cd ~/deployments/${CONTAINER} && \\
                           docker compose -f docker-compose.prod.yml build && \\
                           docker compose -f docker-compose.prod.yml up -d --force-recreate --remove-orphans"
                    """
                }
            }
        }
        stage('Health Check') {
            steps {
                sshagent(credentials: ['ssh-cc-prod-12334612']) {
                    // Strict gate: at least one (healthy) container AND
                    // none unhealthy, restarting, or exited non-zero. A bare
                    // bare grep for the word healthy also counts unhealthy — never that.
                    sh """
                        for i in \$(seq 1 24); do
                            PS=\$(ssh -o StrictHostKeyChecking=no -p ${SSH_PORT} ${DEPLOY_USER}@${DEPLOY_HOST} \\
                              "cd ~/deployments/${CONTAINER} && docker compose -f docker-compose.prod.yml ps 2>/dev/null" || true)
                            HEALTHY=\$(echo "\$PS" | grep -c '(healthy)' || true)
                            BAD=\$(echo "\$PS" | grep -cE '\\(unhealthy\\)|Restarting|Exited \\([1-9]' || true)
                            echo "Health: \$HEALTHY healthy, \$BAD failing (attempt \$i/18)"
                            if [ "\$HEALTHY" -gt 0 ] && [ "\$BAD" -eq 0 ] 2>/dev/null; then
                                echo "Deployment healthy!"
                                ssh -o StrictHostKeyChecking=no -p ${SSH_PORT} ${DEPLOY_USER}@${DEPLOY_HOST} "docker image prune -f >/dev/null" || true
                                exit 0
                            fi
                            sleep 5
                        done
                        echo "Health check failed after 2 minutes"
                        exit 1
                    """
                }
            }
        }
    }
    post {
        always {
            // Clean up any leftover CI containers and images
            sh """

                docker compose -f \\${WORKSPACE}/docker-compose.prod.yml -p cc-prod-12334612-ci down --remove-orphans --volumes 2>/dev/null || true
                docker rmi ${IMAGE}:${BUILD_NUMBER} 2>/dev/null || true
            """
        }
        failure {
            sshagent(credentials: ['ssh-cc-prod-12334612']) {
                // Roll back to the pre-deploy images — only when this
                // build's Deploy stage actually replaced containers
                sh """
                    if [ -f \${WORKSPACE}/.deploy-started ]; then
                        echo "=== ROLLING BACK to pre-deploy images ==="
                        ssh -o StrictHostKeyChecking=no -p ${SSH_PORT} ${DEPLOY_USER}@${DEPLOY_HOST} \\
                          "docker images --format '{{.Repository}}' | grep '^${CONTAINER}-' | sort -u | xargs -r -I@ docker tag @:rollback @:latest" || true
                        ssh -o StrictHostKeyChecking=no -p ${SSH_PORT} ${DEPLOY_USER}@${DEPLOY_HOST} \\
                          "cd ~/deployments/${CONTAINER} && docker compose -f docker-compose.prod.yml up -d --no-build --remove-orphans" || true
                    fi
                """
                sh """
                    echo "=== CONTAINER STATUS ==="
                    ssh -o StrictHostKeyChecking=no -p ${SSH_PORT} ${DEPLOY_USER}@${DEPLOY_HOST} \\
                      "cd ~/deployments/${CONTAINER} && docker compose -f docker-compose.prod.yml ps -a" 2>/dev/null || true
                    echo "=== SERVICE LOGS ==="
                    ssh -o StrictHostKeyChecking=no -p ${SSH_PORT} ${DEPLOY_USER}@${DEPLOY_HOST} \\
                      "cd ~/deployments/${CONTAINER} && docker compose -f docker-compose.prod.yml logs --tail=20" 2>/dev/null || true
                """
            }
            echo "Failed ${IMAGE}:${BUILD_NUMBER}"
        }
        success { echo "Deployed ${IMAGE}:${BUILD_NUMBER}" }
        cleanup {
            // Runs LAST of all post conditions — the failure handler reads
            // the .deploy-started marker in the workspace, so it must survive
            // until then (post 'always' runs BEFORE 'failure').
            cleanWs()
        }
    }
}