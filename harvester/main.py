from spider import twitterSpider
from twitterAPI import twitterCollector

def main():
    spider = twitterSpider()
    collector = twitterCollector()

    spider.start()
    collector.start()

if __name__ == "__main__":
    main()