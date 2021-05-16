import tweepy
import json
from TweetStore import TweetStore
#import couchdb
#import time

# This application uses Twitter's Search API to do a single search for testing
# on the intance

consumer_key = "XLpXawfnonn8n1LEBJgtmqUaE"
consumer_secret = "aDaoN5IWq8NiLZ8GsqK8dzAkBy683yjJt4RcZZ2sVf67hH6f6F"
access_token = "993804554880794624-K0gOvq6FYnycALj6I31cPeqjxxeL8VC"
access_token_secret = "TC0xFxOzRGAJb6R9q6PaQOiDDUG9Csq14HBtyDGNdMlSw"

COUCH_DATABASE = 'test_db'

#Handel Twitter Authentication
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

# Construct the API instance
api = tweepy.API(auth, wait_on_rate_limit=True)

storage = TweetStore(COUCH_DATABASE)
result_dic = {}

def search_location(query, geocode, max_count):
    try:
        search_tweets = api.search(q=query, geocode=geocode, count=max_count)

        for tweet in search_tweets:
            result_dic[tweet.id] = tweet._json
            storage.save_tweet(tweet._json)

        json_object = json.dumps(result_dic, indent=4)
        with open("output.json", "w") as outfile:
            outfile.write(json_object)

    except tweepy.TweepError as error:
        print("ERROR:" + str(error)+"\n")

query = ""
max_count = 2   # max number of tweet per request
geocode = "-37.840935,144.946457,100km"

search_location(query, geocode, max_count)
