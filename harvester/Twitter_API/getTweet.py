import json

from TweetStore import TweetStore
from config import *

storage_statistic = TweetStore(url=COUCHDB_URL, username=COUCHDB_USERNAME, password=COUCHDB_PASSWORD,
                     domain=COUCHDB_DOMAIN, ports=COUCHDB_PORTS, dbname=COUCHDB_TWEET_DB)

storage_region = TweetStore(url=COUCHDB_URL, username=COUCHDB_USERNAME, password=COUCHDB_PASSWORD,
                     domain=COUCHDB_DOMAIN, ports=COUCHDB_PORTS, dbname=COUCHDB_REGION_TWEET_DB)

print('tweet count of test_tweet db is %d\n' % storage_statistic.count_tweets())

print('tweet count of region_tweet db is %d\n' % storage_region.count_tweets())

print("The tweet count of each region", storage_region.get_region_count())

'''
twitter_dict = {"new_edits": False, "docs": []}

for doc in storage.get_tweets():
    twitter_dict["docs"].append(doc.value)
    print('%s\n' % doc.value)

with open("twitter.json", "a") as outfile:
    outfile.write(json.dumps(twitter_dict))
'''