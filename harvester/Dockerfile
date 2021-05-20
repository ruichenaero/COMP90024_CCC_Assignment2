FROM python:3

ENV http_proxy http://wwwproxy.unimelb.edu.au:8000
ENV https_proxy http://wwwproxy.unimelb.edu.au:8000
ENV HTTP_PROXY http://wwwproxy.unimelb.edu.au:8000
ENV HTTPS_PROXY http://wwwproxy.unimelb.edu.au:8000

WORKDIR /usr/src/harvester

COPY dependencies.txt ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chmod 777 run.sh

CMD ./run.sh