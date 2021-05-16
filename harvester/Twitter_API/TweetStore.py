import couchdb
import couchdb.design

class TweetStore(object):
    def __init__(self, url, username, password, domain, ports, dbname):
        try:
            self.server = couchdb.Server(url.format(username, password, domain, ports))
            self.db = self.server.create(dbname)
            self._create_views()
        except couchdb.http.PreconditionFailed:
            self.db = self.server[dbname]

    def _create_views(self):
        count_map = 'function(doc) { emit(doc.id, 1); }'
        count_reduce = 'function(keys, values) { return sum(values); }'
        view = couchdb.design.ViewDefinition('twitter', 'count_tweets', count_map, reduce_fun=count_reduce)
        view.sync(self.db)

        get_tweets = 'function(doc) { emit(("0000000000000000000"+doc.id).slice(-19), doc); }'
        view = couchdb.design.ViewDefinition('twitter', 'get_tweets', get_tweets)
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