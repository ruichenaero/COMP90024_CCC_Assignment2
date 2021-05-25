# couchDB config
COUCHDB_URL = 'http://{}:{}@{}:{}/'
COUCHDB_DOMAIN = '127.0.0.1'
COUCHDB_DOMAINS = ['127.0.0.1']
COUCHDB_USERNAME = 'admin'
COUCHDB_PASSWORD = '123'
COUCHDB_PORTS = 5984
COUCHDB_TWEET_DB = 'test_tweet'
COUCHDB_REGION_TWEET_DB = 'region_tweet'

# region map
REGION_MAP = {'region_1': 'Melbourne City', 'region_2': 'Wyndham', 'region_3': 'Whittlesea-Wallan',
              'region_4': 'Mornington Peninsula', 'region_5': 'Franston-Cranbourne', 'region_6': 'Dandenong Ranges',
              'region_7': 'Yarra Ranges', 'region_8': 'Melton-Bacchus Marsh', 'region_9': 'Cardinia',
              'region_10': 'Nillumbik-Kinglake', 'region_11': 'Diamon Creek-Doreen', 'region_12': 'Melbourne Airport',
              'region_13': 'Macedon Ranges'}

REGION_CODE_MAP = {
    "Melbourne City": "-37.831716,145.026625,17.66km",
    "Wyndham": "-37.921831,144.626096,13.14km",
    "Whittlesea-Wallan": "-37.428459,145.088149,13.93km",
    "Mornington Peninsula": "-38.341791,144.969605,19.85km",
    "Franston-Cranbourne": "-38.086608,145.194009,14.10km",
    "Dandenong Ranges": "-37.916231,145.302436,6.88km",
    "Yarra Ranges": "-37.745579,145.504487,18.88km",
    "Melton-Bacchus Marsh": "-37.676556,144.551064,12.66km",
    "Cardinia": "-38.091471,145.587586,19.90km",
    "Nillumbik-Kinglake": "-37.544132,145.306394,8.97km",
    "Diamon Creek-Doreen": "-37.632059,145.151265,6.79km",
    "Melbourne Airport": "-37.635542,144.870431,7.85km",
    "Macedon Ranges": "-37.453482,144.725104,15.80km"
}
