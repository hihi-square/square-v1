

# Dockerfile
# Stage 1 - the build process13123
FROM node:18 as build-deps
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 3000

# Stage 2 - the production environment wow1232
FROM nginx:1.19.0-alpine
COPY --from=build-deps /app/build /usr/share/nginx/html
# nginx 의 default.conf 를 삭제
RUN rm /etc/nginx/conf.d/default.conf
# host pc 의 nginx.conf 를 아래 경로에 복사
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]