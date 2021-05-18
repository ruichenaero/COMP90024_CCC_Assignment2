import tweepy
import json
import melbourne_region
import time
from TweetStore import TweetStore
from config import *


# This application uses Twitter's Search API to Sequentially search data
# up to 7 days ago from 13 specified regions at Melbourne

consumer_key = "XLpXawfnonn8n1LEBJgtmqUaE"
consumer_secret = "aDaoN5IWq8NiLZ8GsqK8dzAkBy683yjJt4RcZZ2sVf67hH6f6F"
access_token = "993804554880794624-K0gOvq6FYnycALj6I31cPeqjxxeL8VC"
access_token_secret = "TC0xFxOzRGAJb6R9q6PaQOiDDUG9Csq14HBtyDGNdMlSw"


# Handel Twitter Authentication
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

# Construct the API instance
api = tweepy.API(auth, wait_on_rate_limit=True)

# ConchDB
storage = TweetStore(url=COUCHDB_URL, username=COUCHDB_USERNAME, password=COUCHDB_PASSWORD,
                     domain=COUCHDB_DOMAIN, ports=COUCHDB_PORTS, dbname=COUCHDB_REGION_TWEET_DB)


# reference: API rate limit error handler from tweepy official documentation
def limit_handled(cursor):
    while True:
        try:
            yield next(cursor)
            return
        except tweepy.RateLimitError: # set the sleep time to 15min
            time.sleep(15 * 60)
            print("\n Reaches the rate limit - Sleep 15 min \n")



def search_location(query, max_count):
    for region in melbourne_region.region_code:
        geocode = region["geo_code"]
        center_coordinate = region["center_coordinate"]

        while True:
            try:
                #search_tweets = api.search(q=query, geocode=geocode, count=max_count)
                search_tweets = limit_handled(tweepy.Cursor(api.search, q=query,
                                                            geocode=geocode, count=max_count).items())

                if not search_tweets:
                    print("\n no more new tweets \n")
                    break

                for tweet in search_tweets:
                    # get twitter data
                    result = tweet._json

                    result_dic = {}
                    result_dic["_id"] = result["id_str"]
                    # add center coordinate of search area
                    result_dic["center_coordinate"] = center_coordinate

                    # combine with twitter data
                    result_dic.update(result)

                    #################### Please check here ##################
                    # store the tweet to the db
                    storage.save_tweet(result_dic)

                    json_object = json.dumps(result_dic, indent=4)
                    with open("region_search_ouput.json", "a") as outfile:
                        outfile.write(json_object)

            except tweepy.TweepError as error:
                print("ERROR:" + str(error)+"\n")
                break


query = ""
max_count = 100   # max number of tweet per request is 100
#geocode = "-37.840935,144.946457,100km"
search_location(query, max_count)
