import json

from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse

from backend.backend.api.utils import *
from backend.backend.couchDAO.couchDBHandler import *

couch_db_banlancer = CouchDBBalancer()
couch_db_banlancer.connect_database(COUCHDB_REGION_TWEET_DB)
tweet_database = couch_db_banlancer.get_current_database()
tweet_parser = Parse("../common/AFINN.txt")

def region_tweet_count(request):
    response = JsonResponse({"name":"tweet_count"})
    response['Access-Contro1-Allow-origin'] = "*"  # 设置请求头
    return response

def region_topic_count_food(request):
    #tweet_database = couch_db_banlancer.get_current_database()
    #docs = tweet_database.view("region_tweet_map")
    #topic_food_count = food_topic_count(docs)
    response = JsonResponse({"name":"food"})
    response['Access-Contro1-Allow-origin'] = "*"  # 设置请求头
    return response

def region_topic_count_sport(request):
    response = JsonResponse({"name": "tweet_count"})
    response['Access-Contro1-Allow-origin'] = "*"  # 设置请求头
    return response

def sentiment_scatter(request):
    tweet_database = couch_db_banlancer.get_current_database()
    coordinates_map = {}
    for doc in tweet_database.view('statistic/coordinates_map'):
       coordinates_map[str(doc.key)] = doc.value
    return JsonResponse(coordinates_map)

def region_sport_count(docs):
    region_sport_count = {}
    for value in REGION_MAP.values():
        region_sport_count[value] = 0

    for doc in docs:
        word_set = clean_tweet(doc.value)
        if len(SPORTS_TOP_HASHTAGS.intersection(word_set)) > 0:
            region_sport_count[REGION_MAP[doc.key]] += 1

    json_object = json.dumps(region_sport_count, indent=4)
    with open("region_sport_count", "a") as outfile:
        outfile.write(json_object)

def region_sport_count(docs):
    region_sport_count = {}
    for value in REGION_MAP.values():
        region_sport_count[value] = 0

    for doc in docs:
        word_set = clean_tweet(doc.value)
        if len(SPORTS_TOP_HASHTAGS.intersection(word_set)) > 0:
            region_sport_count[REGION_MAP[doc.key]] += 1

    json_object = json.dumps(region_sport_count, indent=4)
    with open("region_sport_count", "a") as outfile:
        outfile.write(json_object)


def region_sentimentscore_count(docs):
    region_sentimentscore_count = {}
    for value in REGION_MAP.values():
        region_sentimentscore_count[value] = 0

    for doc in docs:
        sentiment_score = tweet_parser.parse(doc.value)
        region_sentimentscore_count[REGION_MAP[doc.key]] += sentiment_score

    json_object = json.dumps(region_sentimentscore_count, indent=4)
    with open("region_sentimentscore_count", "a") as outfile:
        outfile.write(json_object)

if __name__ == '__main__':

    docs = tweet_database.view('statistic/region_tweet_map')
    region_sentimentscore_count(docs)





