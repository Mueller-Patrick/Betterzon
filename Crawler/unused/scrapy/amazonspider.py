import scrapy
from scrapy.crawler import CrawlerProcess
import re

class AmazonSpider(scrapy.Spider):
    name = 'amazon'
    allowed_domains = ['amazon.de']
    start_urls = ['https://amazon.de/dp/B083DRCPJG']

    # def __init__(self, start_urls):
    #   self.start_urls = start_urls

    def parse(self, response):
        price = response.xpath('//*[@id="priceblock_ourprice"]/text()').extract_first()
        if not price:
            price = response.xpath('//*[@data-asin-price]/@data-asin-price').extract_first() or \
                    response.xpath('//*[@id="price_inside_buybox"]/text()').extract_first()

        euros = re.match('(\d*),\d\d', price).group(1)
        cents = re.match('\d*,(\d\d)', price).group(1)
        priceincents = euros + cents

        yield {'price': priceincents}


def start_crawling():
    process = CrawlerProcess(
        settings={'COOKIES_ENABLED': 'False', 'CONCURRENT_REQUESTS_PER_IP': 1, 'ROBOTSTXT_OBEY': False,
                  'USER_AGENT': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
                  'DOWNLOAD_DELAY': 3}
        , install_root_handler=False)
    process.crawl()
    process.start()
