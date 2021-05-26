#
# Team: Team 47
# City: Melbourne
# Xiaoyu Wu (1218098)    
# Yifei Yang (1136477)
# Rui Chen (1100500)
# Wenhai Huo (1101297)
# Jingyuan Ma (988014)
#

from TweetStore import TweetStore
from harvester.Twitter_API.common.config import *

storage_statistic = TweetStore(url=COUCHDB_URL, username=COUCHDB_USERNAME, password=COUCHDB_PASSWORD,
                     domain=COUCHDB_DOMAIN, ports=COUCHDB_PORTS, dbname=COUCHDB_TWEET_DB)

storage_region = TweetStore(url=COUCHDB_URL, username=COUCHDB_USERNAME, password=COUCHDB_PASSWORD,
                     domain=COUCHDB_DOMAIN, ports=COUCHDB_PORTS, dbname=COUCHDB_REGION_TWEET_DB)

index = "geo_count"
geo_map = "function (doc) { if(doc.place != null) emit(doc._id, 1);}"
geo_reduce = 'function (keys, values, reduce) {return sum(values);}'
storage_region.create_view(index, geo_map, reduce_func=geo_reduce)


print('tweet count of region_tweet db is %d\n' % storage_region.count_tweets())

#print('tweet count with coordinate is %d\n' % storage_region.twitter_with_geo())

print("The tweet count of each region", storage_region.get_region_count())

"""
# get each twitter from db
# doc.value is the document of twitter
for doc in storage_region.get_tweets():
    # print the source text of each twitter
    print('%s\n' % doc.value['text'])
"""


