import couchdb
import couchdb.design

from backend.common.conchDBmap import *
from backend.common.config import *


class CouchDBHandler(object):

    server = None
    database = dict()
    status = True

    def __init__(self, url=COUCHDB_URL, username=COUCHDB_USERNAME, password=COUCHDB_PASSWORD, domain=COUCHDB_DOMAIN, ports=COUCHDB_PORTS):

        self.domain = domain
        self.ports = ports.__str__()

        try:
            self.server = couchdb.Server(url.format(username, password, domain, ports))
        except Exception:
            self.status = False
            print('CouchDB Connected Failed: %s@%s:%s' % (username, domain, ports.__str__()))

    def get_database(self, _database):
        if not self.status:
            return None

        if _database in self.database:
            return self.database[_database]

        try:
            self.database.update({
                _database: self.server[_database]
            })
            # Save views into the db if they doesn't exist
            try:
                self.server[_database].save(STATISTIC)
            except couchdb.http.ResourceConflict:
                pass
        except Exception:
            self.database.update({
                _database: self.server.create(_database)
            })
            self.database[_database].save(STATISTIC)
            print('CouchDB Database %s Created Success: %s:%s' % (_database, self.domain, self.ports))
        return self.database[_database]

class CouchDBBalancer(object):
    """
    Distribute the access to different couchdb nodes
    """
    servers = []
    databases = []
    domains = []
    balance = 0

    def __init__(self, domains=COUCHDB_DOMAINS):
        self.domains = domains
        for domain in domains:
            self.servers.append(CouchDBHandler(domain=domain))

    def connect_database(self, database):
        for server in self.servers:
            self.databases.append(server.get_database(database))

    def tick(self):
        self.balance += 1
        self.balance %= len(self.databases)

    def save_tweet(self, tw):
        tw['_id'] = tw['id_str']
        try:
            self.db.save(tw)
        except couchdb.http.ResourceConflict:
            pass

    def get(self, id):
        self.tick()
        return self.databases[self.balance].get(id=id)

    def find(self, mango):
        self.tick()
        return self.databases[self.balance].find(mango)

    def get_current_database(self):
        self.tick()
        return self.databases[self.balance]

    def iterview(self, view, batch, wrapper=None):
        self.tick()
        return self.databases[self.balance].iterview(view, batch, wrapper)

    def compact(self):
        self.tick()
        return self.databases[self.balance].compact()


'''
    def create_view(self, index: str, map_func: str, reduce_func: str):
        view = couchdb.design.ViewDefinition('twitter',index, map_func, reduce_fun=reduce_func)
        view.sync(self.db)

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
'''

couch_db_banlancer = CouchDBBalancer()
couch_db_banlancer.connect_database(COUCHDB_REGION_TWEET_DB)
if __name__ == '__main__':
    tweet_database = couch_db_banlancer.get_current_database()
    coordinates_map = {}
    for doc in tweet_database.view('statistic/coordinates_map'):
        coordinates_map[str(doc.key)] = doc.value
    #print(coordinates_map)

