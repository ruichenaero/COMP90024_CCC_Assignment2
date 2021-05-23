token_file.py 
- It stores all the Twitter API tokens we have applied 
- **(imported in all 3 harvesters)**

stream.py 
- An stream harvester for real-time data from the whole area of Melborune 
- **(for statistical analysis)**

search.py 
- An search harvester for historical data from the whole area of Mebourne 
- **(for statistical analysis)** 

random_search_region.py 
- An search harvester for historical data from 13 specified regions of Melbourne 
- **(mainly used one harvested 500000+ tweets(4.32GB))**

melbourne_region.py 
- It contains 13 specified regions' coordinates and searching areas 
- **(imported only by random_search_region.py)**

id_check.json 
- It is used for tracking harvested tweets' id to help **random_search_region.py** to search older data 
- **(imported only by random_search_region.py)**


