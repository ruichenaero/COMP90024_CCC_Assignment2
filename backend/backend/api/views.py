from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
#from backend.couchDAO.couchDBHandler import *

#couch_db_banlancer = CouchDBBalancer()
#couch_db_banlancer.connect_database(COUCHDB_REGION_TWEET_DB)

def region_tweet_count(request):
    response = JsonResponse({"name":"tweet_count"})
    response['Access-Contro1-Allow-origin'] = "*"  # 设置请求头
    return response

def region_topic_count_food(request):
    #tweet_database = couch_db_banlancer.get_current_database()
    #docs = tweet_database.view("region_tweet_map")
    #topic_food_count = food_topic_count(docs)
    return JsonResponse({"name":"food"})

def region_topic_count_sport(request):
    response = JsonResponse({"name": "tweet_count"})
    response['Access-Contro1-Allow-origin'] = "*"  # 设置请求头
    return response

def sentiment_scatter(request):
    #tweet_database = couch_db_banlancer.get_current_database()
    coordinates_map = {}
    #for doc in tweet_database.view('statistic/coordinates_map'):
    #   coordinates_map[str(doc.key)] = doc.value
    return JsonResponse(coordinates_map)

'''
def food_topic_count(docs):
    for doc in docs:
        reg(doc)
        for word in reg(doc):
            if food_topic_set.contains(word)


def process_tweet(text):
    result = text.split()
    return result
'''




