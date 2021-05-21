from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from backend.couchDAO.couchDBHandler import *

couch_db_banlancer = CouchDBBalancer()
couch_db_banlancer.connect_database(COUCHDB_REGION_TWEET_DB)

def region_tweet_count(request):
    return JsonResponse({"name":"tweet_count"})

def region_topic_count_food(request):
    return JsonResponse({"name":"food"})

def region_topic_count_sport(request):
    return JsonResponse({"name":"sport"})

def sentiment_scatter(request):
    tweet_database = couch_db_banlancer.get_current_database()
    coordinates_map = {}
    for doc in tweet_database.view('statistic/coordinates_map'):
        coordinates_map[str(doc.key)] = doc.value
    return JsonResponse(coordinates_map)
