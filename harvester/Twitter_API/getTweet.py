import json

from TweetStore import TweetStore
from config import *

storage_statistic = TweetStore(url=COUCHDB_URL, username=COUCHDB_USERNAME, password=COUCHDB_PASSWORD,
                     domain=COUCHDB_DOMAIN, ports=COUCHDB_PORTS, dbname=COUCHDB_TWEET_DB)

storage_region = TweetStore(url=COUCHDB_URL, username=COUCHDB_USERNAME, password=COUCHDB_PASSWORD,
                     domain=COUCHDB_DOMAIN, ports=COUCHDB_PORTS, dbname=COUCHDB_REGION_TWEET_DB)

index = "geo_count"
geo_mac = "function (doc) { if(doc.place != null) emit(doc._id, 1);}"
geo_reduce = 'function (keys, values, reduce) {return sum(values);}'
storage_region.create_view(index, geo_mac, reduce_func=geo_reduce)


print('tweet count of region_tweet db is %d\n' % storage_region.count_tweets())

print('tweet count with coordinate is %d\n' % storage_region.twitter_with_geo())

print("The tweet count of each region", storage_region.get_region_count())

