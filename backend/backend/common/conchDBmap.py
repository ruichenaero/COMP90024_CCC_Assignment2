"""
This file define the map of the couchdb

"""
STATISTIC = {
  "_id": "_design/statistic",
  "views": {
    "count_tweets": {
      "map": "function(doc) { emit(doc.id, 1); }",
      "reduce": "function(keys, values) { return sum(values); }"
    },
    "get_tweets": {
      "map": "function(doc) { emit((\"0000000000000000000\"+doc.id).slice(-19), doc); }"
    },
    "region_tweet_count": {
      "map": "function (doc) {\n if(doc.region != null)\n emit(doc.region, 1);\n}",
      "reduce": "function (keys, values, reduce) {return sum(values);}"
    },
    "region_tweet_map": {
      "map": "function (doc) {\n if(doc.region != null)\n emit(doc.region, [doc.txt, doc.entity]);\n}",
    },
    "coordinates_map": {
      "map": "function (doc) {\n  if(doc.coordinates != null)\n  emit(doc.coordinates.coordinates, doc.text);\n}"
    },
    "place_map": {
      "map": "function (doc) {\n  if(doc.place != null)\n  emit(doc.place.bounding_box.coordinates, doc.text);\n}"
    },
  },
  "language": "javascript"
}
