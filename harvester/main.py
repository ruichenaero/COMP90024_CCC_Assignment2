from harvester.spider import twitterSpider
from harvester.twitterAPI import twitterCollector


def main():
    spider = twitterSpider()
    collector = twitterCollector()

    spider.start()
    collector.start()

if __name__ == "__main__":
    main()