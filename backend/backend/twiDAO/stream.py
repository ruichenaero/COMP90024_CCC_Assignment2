import tweepy
from tweepy.streaming import StreamListener
#import json
#import couchdb
import time


# This application uses Twitter's Stream API to harvest data in real time
# from the specified radius with a center at Melbourne

consumer_key = "XLpXawfnonn8n1LEBJgtmqUaE"
consumer_secret = "aDaoN5IWq8NiLZ8GsqK8dzAkBy683yjJt4RcZZ2sVf67hH6f6F"
access_token = "993804554880794624-K0gOvq6FYnycALj6I31cPeqjxxeL8VC"
access_token_secret = "TC0xFxOzRGAJb6R9q6PaQOiDDUG9Csq14HBtyDGNdMlSw"

# Handel Twitter Authentication
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

# Construct the API instance
api = tweepy.API(auth, wait_on_rate_limit=True)


class TwitterStreamListener(StreamListener):

    def on_status(self, status):
        print(status.text)

    def on_data(self, raw_data):
        print(raw_data)
        return True

    def on_error(self, status_code):
        print(status_code)
        if status_code == 420:
            print("\n Reach Rate Limit \n")
            return False

    def on_exception(self, exception):
        print(exception)
        return


stream_listener = TwitterStreamListener()
stream_tweets = tweepy.Stream(auth=api.auth, listener=stream_listener)

location = [144.667009,-38.091425,145.460771,-37.527243]
#location = 144.946457,-37.840935

stream_tweets.filter(locations=location)