from TweetStore import TweetStore
from TwitterAPI.TwitterAPI import TwitterAPI


COUCH_DATABASE = 'test_db'
TWITTER_ENDPOINT = 'statuses/filter'
TWITTER_PARAMS = {'track':'pizza'}

API_KEY = XXX
API_SECRET = XXX
ACCESS_TOKEN = XXX
ACCESS_TOKEN_SECRET = XXX

storage = TweetStore(COUCH_DATABASE)

api = TwitterAPI(API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET)


for item in api.request(TWITTER_ENDPOINT, TWITTER_PARAMS):
	if 'text' in item:
		print('%s -- %s\n' % (item['user']['screen_name'], item['text']))
		storage.save_tweet(item)
	elif 'message' in item:
		print('ERROR %s: %s\n' % (item['code'], item['message']))