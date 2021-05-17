import sql
import requests
from bs4 import BeautifulSoup

HEADERS = ({'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 '
            'Safari/537.36'})


def crawl(product_ids: [int]) -> dict:
    """
    Crawls the given list of products and saves the results to sql
    :param products: The list of product IDs to fetch
    :return: A dict with the following fields:
                total_crawls: number of total crawl tries (products * vendors per product)
                successful_crawls: number of successful products
                products_with_problems: list of products that have not been crawled successfully
    """
    total_crawls = 0
    successful_crawls = 0
    products_with_problems = []

    # Iterate over every product that has to be crawled
    for product_id in product_ids:
        # Get all links for this product
        product_links = sql.getProductLinksForProduct(product_id)

        crawled_data = []

        # Iterate over every link / vendor
        for product_vendor_info in product_links:
            total_crawls += 1

            # Call the appropriate vendor crawling function and append the result to the list of crawled data
            if product_vendor_info['vendor_id'] == 1:
                # Amazon
                data = __crawl_amazon__(product_vendor_info)
                if data:
                    crawled_data.append(data)
            elif product_vendor_info['vendor_id'] == 2:
                # Apple
                data = __crawl_apple__(product_vendor_info)
                if data:
                    crawled_data.append(data)
            elif product_vendor_info['vendor_id'] == 3:
                # Media Markt
                data = __crawl_mediamarkt__(product_vendor_info)
                if data:
                    crawled_data.append(data)
            else:
                products_with_problems.append(product_vendor_info)
                continue

            successful_crawls += 1

        # Insert data to SQL
        sql.insertData(crawled_data)

    return {
        'total_crawls': total_crawls,
        'successful_crawls': successful_crawls,
        'products_with_problems': products_with_problems
    }

def __crawl_amazon__(product_info: dict) -> tuple:
    """
    Crawls the price for the given product from amazon
    :param product_info: A dict with product info containing product_id, vendor_id, url
    :return: A tuple with the crawled data, containing (product_id, vendor_id, price_in_cents)
    """
    page = requests.get(product_info['url'], headers= HEADERS)
    soup = BeautifulSoup(page.content, features="lxml")
    try:
        price = int(soup.find(id='priceblock_ourprice').get_text().replace(".", "").replace(",", "").replace("€", "").strip())
    except RuntimeError:
        price = -1
    except AttributeError:
        price = -1

    if price != -1:
        return (product_info['product_id'], product_info['vendor_id'], price)
    else:
        return None


def __crawl_apple__(product_info: dict) -> tuple:
    """
    Crawls the price for the given product from apple
    :param product_info: A dict with product info containing product_id, vendor_id, url
    :return: A tuple with the crawled data, containing (product_id, vendor_id, price_in_cents)
    """
    #return (product_info['product_id'], product_info['vendor_id'], 123)
    pass


def __crawl_mediamarkt__(product_info: dict) -> tuple:
    """
    Crawls the price for the given product from media markt
    :param product_info: A dict with product info containing product_id, vendor_id, url
    :return: A tuple with the crawled data, containing (product_id, vendor_id, price_in_cents)
    """
    pass
