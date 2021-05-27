import tweepy
import json
from TweetStore import TweetStore
import time
from harvester.Twitter_API.common import token_file
from harvester.Twitter_API.common.config import *

#
# Team: Team 47
# City: Melbourne
# Xiaoyu Wu (1218098)    
# Yifei Yang (1136477)
# Rui Chen (1100500)
# Wenhai Huo (1101297)
# Jingyuan Ma (988014)
#

# This application uses Twitter's Search API to harvest data
# up to 7 days ago from the whole area of Melbourne


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
                     domain=COUCHDB_DOMAIN, ports=COUCHDB_PORTS, dbname=COUCHDB_TWEET_DB)


# reference: API rate limit error handler from tweepy official documentation
def limit_handled(cursor):
    while True:
        try:
            yield next(cursor)
            return
        except tweepy.RateLimitError: #set the sleep time to 15min
            time.sleep(15 * 60)
            print("\n Reach the rate limit - Sleep 15 min \n")


def search_location(query, geocode, max_count):
    while True:
        try:
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

                # combine new key with twitter data
                result_dic.update(result)

                #################### Please check here ##################
                # store the tweet to the db
                storage.save_tweet(result_dic)

                json_object = json.dumps(result_dic, indent=4)
                with open("whole_search_output.json", "a") as outfile:
                    outfile.write(json_object)

        except tweepy.TweepError as error:
            print("ERROR:" + str(error)+"\n")
            break



query = ""
max_count = 100   # max number of tweet per request is 100
geocode = "-37.840935,144.946457,100km"

search_location(query, geocode, max_count)
