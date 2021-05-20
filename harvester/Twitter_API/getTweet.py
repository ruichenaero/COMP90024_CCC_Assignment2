import json

from TweetStore import TweetStore
from config import *

storage_statistic = TweetStore(url=COUCHDB_URL, username=COUCHDB_USERNAME, password=COUCHDB_PASSWORD,
                     domain=COUCHDB_DOMAIN, ports=COUCHDB_PORTS, dbname=COUCHDB_TWEET_DB)

storage_region = TweetStore(url=COUCHDB_URL, username=COUCHDB_USERNAME, password=COUCHDB_PASSWORD,
                     domain=COUCHDB_DOMAIN, ports=COUCHDB_PORTS, dbname=COUCHDB_REGION_TWEET_DB)

print('tweet count of test_tweet db is %d\n' % storage_statistic.count_tweets())

print('tweet count of region_tweet db is %d\n' % storage_region.count_tweets())

index = 'region_count'
region_count_map = 'function (doc) {emit(doc.region, 1);}'
region_count_reduce = 'function (keys, values, reduce) {return sum(values);}'
storage_region.create_view(index, region_count_map, region_count_reduce)


'''
twitter_dict = {"new_edits": False, "docs": []}

for doc in storage.get_tweets():
    twitter_dict["docs"].append(doc.value)
    print('%s\n' % doc.value)

with open("twitter.json", "a") as outfile:
    outfile.write(json.dumps(twitter_dict))
'''