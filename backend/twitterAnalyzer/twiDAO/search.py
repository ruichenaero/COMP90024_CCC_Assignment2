import tweepy
#import json
#import couchdb
import time

# This application uses Twitter's Search API to harvest data upto 7 days ago
# from the specified radius with a center at Melbourne

consumer_key = "XLpXawfnonn8n1LEBJgtmqUaE"
consumer_secret = "aDaoN5IWq8NiLZ8GsqK8dzAkBy683yjJt4RcZZ2sVf67hH6f6F"
access_token = "993804554880794624-K0gOvq6FYnycALj6I31cPeqjxxeL8VC"
access_token_secret = "TC0xFxOzRGAJb6R9q6PaQOiDDUG9Csq14HBtyDGNdMlSw"


#Handel Twitter Authentication
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

# Construct the API instance
api = tweepy.API(auth, wait_on_rate_limit=True)


# reference: API rate limit error handler from tweepy official documentation
def limit_handled(cursor):
    while True:
        try:
            yield next(cursor)
        except tweepy.RateLimitError: #set the sleep time to 15min
            time.sleep(15 * 60)
            print("\n Reaches the rate limit - Sleep 15 min \n")


def search_location(query, geocode, max_count):
    max_id = 0
    while True:
        try:
            if max_id == 0:
                #search_tweets = api.search(q=query, geocode=geocode, count=max_count)
                search_tweets = limit_handled(tweepy.Cursor(api.search, q=query, geocode=geocode,
                                                            count=max_count).items())
            else:
                search_tweets = limit_handled(tweepy.Cursor(api.search, q=query, geocode=geocode,
                                                            count=max_count,max_id=max_id).items())

            if not search_tweets:
                print("\n no more new tweets \n")
                break
            max_id = search_tweets[-1].id - 1  #avoid redundency

            for tweet in search_tweets:
                print(tweet.id)

        except tweepy.TweepError as error:
            print("ERROR:" + str(error)+"\n")
            break



query = ""
max_count = 1   # max number of tweet per request
geocode = "-37.840935,144.946457,100km"

search_location(query, geocode, max_count)


