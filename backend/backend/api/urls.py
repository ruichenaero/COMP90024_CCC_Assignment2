#
# Team: Team 47
# City: Melbourne
# Xiaoyu Wu (1218098)    
# Yifei Yang (1136477)
# Rui Chen (1100500)
# Wenhai Huo (1101297)
# Jingyuan Ma (988014)
#

"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from backend.api import views

urlpatterns = [
    path('region_tweet_count/', views.region_tweet_count),
    path('region_topic_count/food/', views.region_topic_count_food),
    path('region_topic_count/sport/', views.region_topic_count_sport),
    path('region_topic_count/covid_19/', views.region_topic_count_covid_19),
    path('region_sentiment_count/', views.region_sentiment_count),
    path('sentiment_scartter/', views.sentiment_scatter),
]
