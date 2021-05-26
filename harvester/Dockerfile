#
# Team: Team 47
# City: Melbourne
# Xiaoyu Wu (1218098)    
# Yifei Yang (1136477)
# Rui Chen (1100500)
# Wenhai Huo (1101297)
# Jingyuan Ma (988014)
#

FROM python:3

ENV http_proxy http://wwwproxy.unimelb.edu.au:8000
ENV https_proxy http://wwwproxy.unimelb.edu.au:8000
ENV HTTP_PROXY http://wwwproxy.unimelb.edu.au:8000
ENV HTTPS_PROXY http://wwwproxy.unimelb.edu.au:8000

WORKDIR /home/ubuntu/COMP90024/COMP90024_CCC_Assignment2/harvester

COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

WORKDIR /home/ubuntu/COMP90024/COMP90024_CCC_Assignment2/harvester/Twitter_API

CMD ["python", "random_search_region.py"]