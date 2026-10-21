# Small web server image with only the files the page needs
# (no tests, research or notes). Coolify builds this on every push.
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html sw.js manifest.webmanifest icon-180.png icon-192.png icon-512.png leaflet.html leaflet-qr.png /usr/share/nginx/html/
COPY fonts /usr/share/nginx/html/fonts
COPY ocr /usr/share/nginx/html/ocr
EXPOSE 80
