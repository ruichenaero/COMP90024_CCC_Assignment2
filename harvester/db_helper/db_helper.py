import couchdb

SERVER_URL = 'localhost:5984/'

class DbHelper:
    def __init__(self):
        self.database = None
        self.server = couchdb.Server(SERVER_URL)

    def create_database(self, name:str):
        assert isinstance(name, str)

        self.database = self.server.create(name)

    def set_database(self, name:str):
        assert isinstance(name, str)
        
        self.database = self.server[name]

    def get_database(self, name:str):
        assert isinstance(name, str)

        if self.database == None:
            self.set_database(name)
        return self.database

    def list_database(self):
        print("{")
        for docID in self.database:
            print(docID + ",")
        print("}")

    def count_docs(self):
        if self.database != None:
            return len(self.database)
        return 0

    def get_doc(self, docID:str):
        assert isinstance(docID, str)

        if self.database != None:
            return self.database[docID]
        return None

    def list_doc(self, docID:str):
        assert isinstance(docID, str)

        print("{")
        for k, v in self.database[docID].items():
            print(k + ":" + v)
        print("}")

    def search_doc(self, searchKey='hashtag', searchVal='', fields=[], sortKey='_id', sortVal='asc'):
        if fields == []:
            mango = {'selector': {searchKey: searchVal},'sort':[{sortKey: sortVal}]}
        else:
            mango = {'selector': {searchKey: searchVal},'fields': fields,'sort':[{sortKey: sortVal}]}
        
        if self.database != None:
            return self.database.find(mango)
        return None

    def update_doc(self, docID:str, data:dict):
        assert isinstance(data, dict)

        if self.database != None:
            doc = self.get_doc(docID)
            if doc != None:
                for k, v in data.items():
                    doc[k] = v
                return self.save_doc(doc)  
        return None

    def save_doc(self, doc:dict):
        assert isinstance(doc, dict)

        if self.database != None:
            return self.database.save(doc)
        return None
