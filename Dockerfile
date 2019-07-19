FROM nginx:1.12-alpine
COPY _site /usr/share/nginx/html
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]