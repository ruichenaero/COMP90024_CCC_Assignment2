import couchdb
import couchdb.design


class TweetStore(object):
    def __init__(self, url, username, password, domain, ports, dbname):
        try:
            self.server = couchdb.Server(url.format(username, password, domain, ports))
            self.db = self.server.create(dbname)
            self._ini_views()
        except couchdb.http.PreconditionFailed:
            self.db = self.server[dbname]

    def _ini_views(self):
        count_map = 'function(doc) { emit(doc.id, 1); }'
        count_reduce = 'function(keys, values) { return sum(values); }'
        view = couchdb.design.ViewDefinition('twitter', 'count_tweets', count_map, reduce_fun=count_reduce)
        view.sync(self.db)

        get_tweets = 'function(doc) { emit(("0000000000000000000"+doc.id).slice(-19), doc); }'
        view = couchdb.design.ViewDefinition('twitter', 'get_tweets', get_tweets)
        view.sync(self.db)

        region_count_map = 'function (doc) {emit(doc.region, 1);}'
        region_count_reduce = 'function (keys, values, reduce) {return sum(values);}'
        view = couchdb.design.ViewDefinition('twitter', 'region_count', region_count_map, reduce_fun=region_count_reduce)
        view.sync(self.db)

        index = "geo_count"
        geo_mac = "function (doc) { if(doc.place != null) emit(doc._id, 1);}"

    def create_view(self, index: str, map_func: str, reduce_func: str):
        view = couchdb.design.ViewDefinition('twitter',index, map_func, reduce_fun=reduce_func)
        view.sync(self.db)

    def save_tweet(self, tw):
        tw['_id'] = tw['id_str']
        try:
            self.db.save(tw)
        except couchdb.http.ResourceConflict:
            pass

    def count_tweets(self):
        for doc in self.db.view('twitter/count_tweets'):
            return doc.value

    def get_tweets(self):
        return self.db.view('twitter/get_tweets')

    def get_region_count(self):
        result = {}
        for doc in self.db.view('twitter/region_count', reduce='true', group='true'):
            result[doc.key] = doc.value
        return result

    def twitter_with_geo(self):
        for doc in self.db.view('twitter/geo_count'):
            return doc.value


