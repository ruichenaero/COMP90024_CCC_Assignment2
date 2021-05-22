FROM node:12.15.0 AS builder

ENV http_proxy http://wwwproxy.unimelb.edu.au:8000
ENV https_proxy http://wwwproxy.unimelb.edu.au:8000
ENV HTTP_PROXY http://wwwproxy.unimelb.edu.au:8000
ENV HTTPS_PROXY http://wwwproxy.unimelb.edu.au:8000

WORKDIR /home/ubuntu/COMP90024_CCC_ASSIGNMENT2/frontend

ADD package.json /home/ubuntu/frontend
ADD . /home/ubuntu/frontend

RUN yarn
RUN yarn prod

FROM nginx:latest

ENV http_proxy http://wwwproxy.unimelb.edu.au:8000
ENV https_proxy http://wwwproxy.unimelb.edu.au:8000
ENV HTTP_PROXY http://wwwproxy.unimelb.edu.au:8000
ENV HTTPS_PROXY http://wwwproxy.unimelb.edu.au:8000

COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/ubuntu/frontend/build /usr/share/nginx/html

EXPOSE 8080