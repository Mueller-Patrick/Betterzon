import scrapy
import re

class AmazonSpider(scrapy.Spider):
    name = 'amazon'
    allowed_domains = ['amazon.de']
    start_urls = ['https://amazon.de/dp/B083DRCPJG']

    def parse(self, response):
        price = response.xpath('//*[@id="priceblock_ourprice"]/text()').extract_first()
        if not price:
            price = response.xpath('//*[@data-asin-price]/@data-asin-price').extract_first() or \
                    response.xpath('//*[@id="price_inside_buybox"]/text()').extract_first()

        euros = re.match('(\d*),\d\d', price).group(1)
        cents = re.match('\d*,(\d\d)', price).group(1)
        priceincents = euros + cents

        yield {'price': priceincents}






