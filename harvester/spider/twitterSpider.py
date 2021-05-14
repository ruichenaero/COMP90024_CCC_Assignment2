import re
from requests_html import HTMLSession, HTML
from datetime import datetime
from urllib.parse import quote
from lxml.etree import ParserError
import json


class twitterSpider:
    def __init__(self):
        self.session = HTMLSession()

    def coll_tweets(self, header: str, url: str, pages: int):
        request = self.session.get(url + '&max_position', headers=header)

        while pages > 0:
            try:
                print(request)
                json_response = json.loads(request.text)
                json_response = request.json()
                html = HTML(html=json_response["items_html"],
                            url="bunk",
                            default_encoding="utf-8")
            except KeyError:
                raise ValueError(
                    'Collection failed, query does not exist or is private.')
            except ParserError:
                break

            tweets = []
            for tweet, profile in zip(
                    html.find(".stream-item"),
                    html.find(".js-profile-popup-actionable")):
                # 10~11 html elements have `.stream-item` class and also their `data-item-type` is `tweet`
                # but their content doesn't look like a tweet's content
                try:
                    text = tweet.find(".tweet-text")[0].full_text
                except IndexError:  # issue #50
                    continue

                tweet_id = tweet.attrs["data-item-id"]
                tweet_url = profile.attrs["data-permalink-path"]
                username = profile.attrs["data-screen-name"]
                user_id = profile.attrs["data-user-id"]
                time = datetime.fromtimestamp(
                    int(tweet.find("._timestamp")[0].attrs["data-time-ms"]) /
                    1000.0)

                hashtags = [
                    hashtag.full_text
                    for hashtag in tweet.find(".twitter-hashtag")
                ]

                urls = [
                    url_node.attrs["data-expanded-url"] for url_node in
                    (tweet.find("a.twitter-timeline-link:not(.u-hidden)") +
                     tweet.find(
                         "[class='js-tweet-text-container'] a[data-expanded-url]"
                     ))
                ]
                urls = list(set(urls))  # delete duplicated elements

                tweets.append({
                    "tweetId": tweet_id,
                    "tweetUrl": tweet_url,
                    "username": username,
                    "userId": user_id,
                    "time": time,
                    "text": text,
                    "entries": {
                        "hashtags": hashtags,
                        "urls": urls,
                    },
                })

            for tweet in tweets:
                tweet["text"] = re.sub(r"(\S)http", "\g<1> http",
                                       tweet["text"], 1)
                tweet["text"] = re.sub(r"(\S)pic\.twitter",
                                       "\g<1> pic.twitter", tweet["text"], 1)
                yield tweet

            request = self.session.get(
                url,
                params={"max_position": json_response['min_position']},
                headers=header)
            pages += -1

    def get_tweets(self, query, page=25):
        if query.startswith("#"):
            query = quote(query)
            
            url = f"https://twitter.com/i/search?q={query}&src=tyah&reset_error_state=false&"
        else:
            url = f"https://twitter.com/i/profiles/show/{query}/timeline/tweets?"
        url += "include_available_features=1&include_entities=1&include_new_items_bar=true"

        header = {
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Referer": f"https://twitter.com/{query}",
            "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8",
            "X-Twitter-Active-User": "yes",
            # "X-Requested-With": "XMLHttpRequest",
            "Accept-Language": "en-US",
        }

        yield from self.coll_tweets(header, url, page)

    def start(self):
        for tweet in self.get_tweets('covid-19', page=1):
            print(tweet['text'])


if __name__ == "__main__":
    spider = twitterSpider()
    spider.start()