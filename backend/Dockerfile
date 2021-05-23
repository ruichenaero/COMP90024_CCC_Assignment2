FROM python:3

ENV http_proxy http://wwwproxy.unimelb.edu.au:8000
ENV https_proxy http://wwwproxy.unimelb.edu.au:8000
ENV HTTP_PROXY http://wwwproxy.unimelb.edu.au:8000
ENV HTTPS_PROXY http://wwwproxy.unimelb.edu.au:8000

WORKDIR /home/ubuntu/COMP90024/COMP90024_CCC_Assignment2/backend

COPY /home/ubuntu/COMP90024/COMP90024_CCC_Assignment2/backend/requirements.txt ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8001

RUN chmod 777 run.sh

CMD ./run.sh