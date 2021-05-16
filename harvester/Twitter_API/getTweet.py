from TweetStore import TweetStore
from config import *

COUCH_DATABASE = 'test_db'


storage = TweetStore(url=COUCHDB_URL, username=COUCHDB_USERNAME, password=COUCHDB_PASSWORD,
                     domain=COUCHDB_DOMAIN, ports=COUCHDB_PORTS, dbname=COUCHDB_TWEET_DB)

print('tweet count is %d\n' % storage.count_tweets())

for doc in storage.get_tweets():
	print('%s\n' % doc.value['text'])