# === STAGE 1: Proses Build Aplikasi ===
FROM node:20-alpine AS builder

# Tentukan folder kerja di dalam container
WORKDIR /app

# Salin file dependensi terlebih dahulu (mengoptimalkan cache Docker)
COPY package*.json ./

# Install seluruh dependensi project
RUN npm install

# Salin seluruh source code project ke dalam container
COPY . .

# Lakukan build aplikasi (Vite akan menghasilkan folder 'dist')
RUN npm run build


# === STAGE 2: Proses Production Menggunakan Nginx ===
FROM nginx:stable-alpine

# Salin hasil build dari Stage 1 ke dalam folder web server Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Ganti konfigurasi default Nginx agar mendukung React Router (Client-side routing)
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Buka port 80 untuk akses web
EXPOSE 80

# Jalankan Nginx di foreground
CMD ["nginx", "-g", "daemon off;"]