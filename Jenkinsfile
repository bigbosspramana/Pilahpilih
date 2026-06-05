pipeline {
    agent any

    environment {
        // Nama image yang akan disimpan di dalam Docker Proxmox Anda
        DOCKER_IMAGE = 'pilahpilih-frontend'
    }

    stages {
        stage('1. Clone Source Code') {
            steps {
                echo 'Mengambil kode terbaru dari Git...'
                checkout scm
            }
        }

        stage('2. Build Docker Image') {
            steps {
                echo "Memulai pengetesan build image: ${DOCKER_IMAGE}"
                script {
                    // Jenkins akan mencoba membuat Docker image berdasarkan Dockerfile project.
                    // Jika ada error di kode React/Vite (misal salah ketik/missing import), 
                    // stage ini akan otomatis gagal dan memberi tahu Anda.
                    sh "docker build -t ${DOCKER_IMAGE}:local-test ."
                }
            }
        }

        stage('3. Kebersihan Sistem (Cleanup)') {
            steps {
                echo 'Membersihkan sisa build yang tidak terpakai...'
                // Menghapus image sisa build lama agar Disk LXC Proxmox Anda tidak cepat penuh
                sh "docker image prune -f"
            }
        }
    }

    post {
        success {
            echo '✅ Mantap! Aplikasi PilahPilih aman dan sukses di-build tanpa ada error.'
        }
        failure {
            echo '❌ Waduh, build gagal! Cek log di Blue Ocean untuk melihat baris kode mana yang error.'
        }
    }
}