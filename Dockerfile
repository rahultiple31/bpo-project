FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="nexora-cx-bpo-site"
LABEL org.opencontainers.image.description="Static BPO website served by nginx"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY assets /usr/share/nginx/html/assets

RUN mkdir -p /tmp/nginx/client_temp /tmp/nginx/proxy_temp /tmp/nginx/fastcgi_temp /tmp/nginx/uwsgi_temp /tmp/nginx/scgi_temp \
    && chown -R 101:101 /tmp/nginx /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1

USER 101:101

CMD ["nginx", "-g", "daemon off; pid /tmp/nginx.pid;"]
