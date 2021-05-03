import sql


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
                crawled_data.append(__crawl_amazon__(product_vendor_info))
            elif product_vendor_info['vendor_id'] == 2:
                # Apple
                crawled_data.append(__crawl_apple__(product_vendor_info))
            elif product_vendor_info['vendor_id'] == 3:
                # Media Markt
                crawled_data.append(__crawl_mediamarkt__(product_vendor_info))
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
    return (product_info['product_id'], product_info['vendor_id'], 123)


def __crawl_apple__(product_info: dict) -> tuple:
    """
    Crawls the price for the given product from apple
    :param product_info: A dict with product info containing product_id, vendor_id, url
    :return: A tuple with the crawled data, containing (product_id, vendor_id, price_in_cents)
    """
    return (product_info['product_id'], product_info['vendor_id'], 123)


def __crawl_mediamarkt__(product_info: dict) -> tuple:
    """
    Crawls the price for the given product from media markt
    :param product_info: A dict with product info containing product_id, vendor_id, url
    :return: A tuple with the crawled data, containing (product_id, vendor_id, price_in_cents)
    """
    pass