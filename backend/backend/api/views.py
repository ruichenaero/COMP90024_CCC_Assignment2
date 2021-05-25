import json

from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from backend.couchDAO.couchDBHandler import *

couch_db_banlancer = CouchDBBalancer()
couch_db_banlancer.connect_database(COUCHDB_REGION_TWEET_DB)
tweet_database = couch_db_banlancer.get_current_database()


def region_tweet_count(request):
    count_result = {}
    for doc in tweet_database.view('statistic/region_tweet_count', reduce='true', group='true'):
        count_result[str(doc.key)] = doc.value

    geojson_result = region_geojson_fill(count_result)
    response = JsonResponse(geojson_result)
    response['Access-Contro1-Allow-origin'] = "*"
    return response


def region_topic_count_food(request):
    food_result = {}
    for doc in tweet_database.view('statistic/region_food', reduce='true', group='true'):
        food_result[str(doc.key)] = doc.value

    geojson_result = region_geojson_fill(food_result)
    response = JsonResponse(geojson_result)
    response['Access-Contro1-Allow-origin'] = "*"  # 设置请求头
    return response


def region_topic_count_sport(request):
    sport_result = {}
    for doc in tweet_database.view('statistic/region_sport', reduce='true', group='true'):
        sport_result[str(doc.key)] = doc.value

    geojson_result = region_geojson_fill(sport_result)
    response = JsonResponse(geojson_result)
    response['Access-Contro1-Allow-origin'] = "*"  # 设置请求头
    return response

def region_topic_count_covid_19(request):
    covid_19_result = {}
    for doc in tweet_database.view('statistic/region_covid_19', reduce='true', group='true'):
        covid_19_result[str(doc.key)] = doc.value

    geojson_result = region_geojson_fill(covid_19_result)
    response = JsonResponse(geojson_result)
    response['Access-Contro1-Allow-origin'] = "*"
    return response

def region_sentiment_count(request):
    sentiment_result = {}
    for doc in tweet_database.view('statistic/region_sentiment_score', reduce='true', group='true'):
        sentiment_result[str(doc.key)] = doc.value

    geojson_result = region_geojson_fill(sentiment_result)
    response = JsonResponse(geojson_result)
    response['Access-Contro1-Allow-origin'] = "*"
    return response

def sentiment_scatter(request):
    sentiment_scatter = {"type": "FeatureCollection", "features": []}
    for doc in tweet_database.view('statistic/sentiment_scatter', reduce='true', group='true'):
        coordinates = doc.key
        sentiment_score = doc.value
        sentiment_info = {"type": "Feature",
                            "properties": {"sentiment_score": sentiment_score},
                            "geometry": {"type": "Point", "coordinates": [coordinates[1], coordinates[0]]}}
        sentiment_scatter["features"].append(sentiment_info)
    response = JsonResponse(sentiment_scatter)
    response['Access-Contro1-Allow-origin'] = '*'
    return response


def region_geojson_fill(result):
    region_topic_count = {"type": "FeatureCollection", "features": []}
    for key, value in result.items():
        region_name = REGION_NAME_MAP[key]
        region_code = REGION_CODE_MAP[region_name]
        geo_info = region_code.split(',')
        coordinates = [float(geo_info[1]), float(geo_info[0])]
        radius = float(geo_info[2])
        region_topic_info = {"type": "Feature",
                            "properties": {"region_name": region_name, "count": value, "radius": radius},
                            "geometry": {"type": "Point", "coordinates": coordinates}}
        region_topic_count["features"].append(region_topic_info)
    return region_topic_count

def make_result(func = HttpResponse, respose=None):
    result = func(respose)
    return result


if __name__ == '__main__':

    '''
    covid_19_result = {}
    for doc in tweet_database.view('statistic/sentiment_scatter', reduce='true', group='true'):
        covid_19_result[str(doc.key)] = doc.value

    geojson_result = region_geojson_fill(covid_19_result)
    json_object = json.dumps(geojson_result, indent=4)
    with open("sentiment_scartter.json", "a") as outfile:
        outfile.write(json_object)
    '''
    sentiment_scatter = {"type": "FeatureCollection", "features": []}
    for doc in tweet_database.view('statistic/sentiment_scatter', reduce='true', group='true'):
        coordinates = doc.key
        sentiment_score = doc.value
        sentiment_info = {"type": "Feature",
                          "properties": {"sentiment_score": sentiment_score},
                          "geometry": {"type": "Point", "coordinates": [coordinates[1], coordinates[0]]}}
        sentiment_scatter["features"].append(sentiment_info)
    json_object = json.dumps(sentiment_scatter, indent=4)
    with open("sentiment_scatter.json", "a") as outfile:
        outfile.write(json_object)
