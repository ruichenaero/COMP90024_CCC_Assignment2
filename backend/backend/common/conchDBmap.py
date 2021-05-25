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
    "region_tweet_count": {
      "map": "function (doc) {\n if(doc.region != null)\n emit(doc.region, 1);\n}",
      "reduce": "function (keys, values, reduce) {return sum(values);}"
    },
    "sentiment_scatter": {
      "reduce": "function (keys, values, rereduce) {\n  return sum(values);\n}",
      "map": "function (doc) {\n  emit(doc.geo.coordinates, doc.sentiment_score);\n}"
    },
    "region_sport": {
      "reduce": "function (keys, values, reduce) {return sum(values);}",
      "map": "function (doc) {\n  emit(doc.region, doc.sport_related);\n}"
    },
    "region_food": {
      "reduce": "function (keys, values, rereduce) {\n  return sum(values);\n}",
      "map": "function (doc) {\n  emit(doc.region, doc.food_related);\n}"
    },
    "region_sentiment_score": {
      "reduce": "function (keys, values, rereduce) {\n  return sum(values);\n}",
      "map": "function (doc) {\n  emit(doc.region, doc.sentiment_score);\n}"
    },
    "region_covid_19": {
      "reduce": "function (keys, values, rereduce) {\n  return sum(values);\n}",
      "map": "function (doc) {\n  emit(doc.region, doc.covid_19_related);\n}"
    }
  },
  "language": "javascript"
}
