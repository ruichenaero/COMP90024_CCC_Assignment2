FROM python:3

WORKDIR /usr/src/app

COPY dependencies.txt ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r dependencies.txt

COPY . .

RUN chmod 777 run.sh

CMD ./run.sh