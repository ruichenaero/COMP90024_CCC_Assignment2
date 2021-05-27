#
# Team: Team 47
# City: Melbourne
# Xiaoyu Wu (1218098)    
# Yifei Yang (1136477)
# Rui Chen (1100500)
# Wenhai Huo (1101297)
# Jingyuan Ma (988014)
#

import tweepy
import json
from common import melbourne_region, token_file
import time
import random
import itertools
from TweetStore import TweetStore
from common.config import *
from utils import *


# This application uses Twitter's Search API to RANDOMLY search data
# up to 7 days ago from 13 specified regions at Melbourne

consumer_key = token_file.CR_API["consumer_key"]
consumer_secret = token_file.CR_API["consumer_secret"]
access_token = token_file.CR_API["access_token"]
access_token_secret = token_file.CR_API["access_token_secret"]


# Handel Twitter Authentication
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

# Construct the API instance
api = tweepy.API(auth, wait_on_rate_limit=True)

# ConchDB
storage = TweetStore(url=COUCHDB_URL, username=COUCHDB_USERNAME, password=COUCHDB_PASSWORD,
                    domain=COUCHDB_DOMAIN, ports=COUCHDB_PORTS, dbname=COUCHDB_REGION_TWEET_DB)

# Sentiment score parser
parser = Parse("common/AFINN.txt")

# reference: API rate limit error handler from tweepy official documentation
def limit_handled(cursor):
    while True:
        try:
            yield next(cursor)
            return
        except tweepy.RateLimitError: # set the sleep time to 15min
            time.sleep(15 * 60)
            print("\n Reaches the rate limit - Sleep 15 min \n")


region_tweet_id = {}
with open("common/id_check.json", "r") as file:
    maxid_file = json.load(file)
def search_location(query, max_count):
    while True:
        try:
            # randomly pick a region from all 13 regions
            region = random.choice(melbourne_region.region_code)
            print(f'Pick {region["name"]}')
            geocode = region["geo_code"]
            center_coordinate = region["center_coordinate"]
            region_name = region["name"]
            max_id = maxid_file[region_name]

            for i in itertools.count():
                try:
                    search_tweets = api.search(q=query, geocode=geocode, count=max_count,max_id=str(max_id-1))

                except tweepy.RateLimitError: # set the sleep time to 15min
                    time.sleep(15 * 60)
                    print("\n Reaches the rate limit - Sleep 15 min \n")

                if not search_tweets:
                    print(f"{region_name} has no tweets")
                    break

                if i == 0:
                    print(f"{region_name} first harvest")

                for tweet in search_tweets:
                    # for status checking
                    print(f"{tweet.created_at} , {tweet.id}")

                    # update current max id for testing:
                    region_tweet_id[region_name] = tweet.id

                    # get twitter data
                    result = tweet._json
                    extract_tweet = ORIGIN_TWEET
                    extract_tweet['_id'] = result['id_str']
                    extract_tweet['id_str'] = result['id_str']
                    extract_tweet['created_at'] = result['created_at']
                    extract_tweet['text'] = result['text']
                    extract_tweet['user']['id_str'] = result['user']['id_str']
                    extract_tweet['user']['name'] = result['user']['name']
                    extract_tweet['user']['followers_count'] = result['user']['followers_count']
                    extract_tweet['user']['friends_count'] = result['user']['friends_count']

                    if result['geo'] is not None:
                        extract_tweet['geo'] = result['geo']
                    else:
                        result['geo'] = None

                    if result['place'] is not None:
                        extract_tweet['place']['full_name'] = result['place']['full_name']
                        extract_tweet['place']['bounding_box']['coordinates'] = result['place']['bounding_box']['coordinates']
                    else:
                        result['place'] = None

                    extract_tweet['lang'] = result['lang']

                    result_dic = {}
                    # add center coordinate of search area
                    result_dic["center_coordinate"] = center_coordinate
                    result_dic["region"] = region_name

                    # count the sentiment score
                    sentiment_score = parser.parse(extract_tweet['text'])
                    result_dic['sentiment_score'] = sentiment_score

                    # topic count
                    result_dic['food_related'] = 0
                    result_dic['sport_related'] = 0
                    result_dic['covid_19_related'] = 0
                    word_set = clean_tweet(extract_tweet['text'])
                    if len(FOOD_TOP_HASHTAGS.intersection(word_set)) > 0:
                        result_dic['food_related'] += 1

                    if len(SPORTS_TOP_HASHTAGS.intersection(word_set)) > 0:
                        result_dic['sport_related'] += 1

                    if len(COVID_19_TOPIC.intersection(word_set)) > 0:
                        result_dic['covid_19_related'] += 1

                    # combine new key with twitter data
                    result_dic.update(extract_tweet)

                    #################### Please check here ##################
                    # store the tweet to the db
                    # if result_dic['geo'] is not None:
                    storage.save_tweet(result_dic)

                    # output data to json
                    json_object = json.dumps(result_dic, indent=4)
                    with open("random_search_output.json", "a") as outfile:
                        outfile.write(json_object)

                # update the max id for current round of current region
                maxid_file[region_name] = search_tweets[-1].id
                max_id = maxid_file[region_name]
                json_object1 = json.dumps(maxid_file, indent=4)
                with open("common/id_check.json", "w") as outfile:
                    outfile.write(json_object1)
                # for testing
                json_object2 = json.dumps(region_tweet_id, indent=4)
                with open("common/each_run_id.json", "w") as outfile:
                    outfile.write(json_object2)

        except tweepy.TweepError as error:
            print("ERROR:" + str(error)+"\n")
            break


query = ""
max_count = 100   # max number of tweet per request is 100
search_location(query, max_count)


