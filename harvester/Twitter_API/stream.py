import tweepy
from tweepy.streaming import StreamListener
from harvester.Twitter_API.common import token_file
from TweetStore import TweetStore
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

# This application uses Twitter's Stream API to harvest data in real time
# from the specified bounding box of Melbourne


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


class TwitterStreamListener(StreamListener):
    """
    A stream listener used to get data,
    and stores real-time tweets into json file and CouchDB
    """

    def __init__(self, file, api=None):
        self.file = file
        super().__init__(api=api)

    def on_data(self, raw_data):
        # print tweets to the specified file
        print(raw_data, file=self.file)

        # store the tweet to the db
        storage.save_tweet(raw_data)
        return True

    def on_error(self, status_code):
        print(status_code)
        if status_code == 420:
            # after reach limit, sleep 30 secs then restart
            #time.sleep(30)
            #print("\n Reaches the rate limit - Sleep 30 secs \n")

            # if exceed rate limit returns False and disconnects the stream
            return False


# create stream object
stream_listener = TwitterStreamListener(open("stream_tweets.json", "a"))
stream_tweets = tweepy.Stream(auth=api.auth, listener=stream_listener)

# specified bounding box of Melbourne
location = [144.667009,-38.091425,145.460771,-37.527243]
#location = 144.946457,-37.840935

# start streaming the tweets that in the bounding box of Melbourne
stream_tweets.filter(locations=location)
#stream_tweets.filter(track="food")     #only for testing

