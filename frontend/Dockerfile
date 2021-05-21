FROM node:12.15.0 AS builder
WORKDIR /home/ubuntu/frontend
ADD package.json /home/ubuntu/frontend
ADD . /home/ubuntu/frontend
RUN yarn
RUN yarn prod

FROM nginx:alpine
COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/ubuntu/frontend/build /usr/share/nginx/html
EXPOSE 8080