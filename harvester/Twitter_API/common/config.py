'''
Team 47 
City: Melbourne
Team Members:
    Xiaoyu Wu (1218098) 
    Yifei Yang (1136477)
    Rui Chen (1100500)
    Wenhai Huo (1101297)
    Jingyuan Ma (988014)
'''

COUCHDB_URL = 'http://{}:{}@{}:{}/'
COUCHDB_DOMAIN = '127.0.0.1'
COUCHDB_DOMAINS = ['172.26.37.225', '172.26.38.1', '172.26.38.110']
COUCHDB_USERNAME = 'admin'
COUCHDB_PASSWORD = '123'
COUCHDB_PORTS = 5984
COUCHDB_TWEET_DB = 'test_tweet'
COUCHDB_REGION_TWEET_DB = 'region_tweet'
COUCHDB_TRACK_DB = 'track'
COUCHDB_TIME_DB = 'time_{}_{}_{}_{}_{}'

ORIGIN_TWEET = {
    "_id": "",
    "id_str": "",
    "created_at": "",
    "text": "",
    "user": {
        "id_str": "",
        "name": "",
        "followers_count": 0,
        "friends_count": 0,
    },
    "geo": None,
    "place": {
        "full_name": None,
        "bounding_box": {
            "coordinates": None
        }
    },
    "lang": ""
}

# statistic config
FOOD_TOP_HASHTAGS = {'food', 'foodporn', 'foodie', 'nomnom', 'vegetarian', 'snack', 'yummy', 'yum', 'healthyfood',
                     'healthy', 'foodlover', 'foodblogger', 'delicious', 'brunch', 'starbucks', 'breakfast', 'beer',
                     'chocolate', 'pizza', 'wine', 'vegan', 'coffe'}

SPORTS_TOP_HASHTAGS = {'sport', 'fitness', 'gym', 'workout', 'fitfam', 'bodybuilding', 'fitnessmotivation', 'yoga',
                       'gymlife', 'crossfit', 'fitnessmodel', 'training', 'train', 'nba', 'soccer', 'golf', 'tennis',
                       'basketball', 'nike', 'ball', 'nfl', 'game', 'gameday', 'win'}

COVID_19_TOPIC = {'covid', 'covid-19', 'covid_19', 'epidemic', 'pandemic', 'coronal', 'coronalvirus', 'virus',
                  'mask', 'wearamask', 'quarantine', 'stayhome', 'vaccin', 'astrazeneca', 'lockdown', 'pfizer'}