from TweetStore import TweetStore


COUCH_DATABASE = 'test_db'


storage = TweetStore(COUCH_DATABASE)

print('tweet count is %d\n' % storage.count_tweets())

for doc in storage.get_tweets():
	print('%s\n' % doc.value['text'])