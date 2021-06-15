import json
import requests
import os

import sql


def call_crawlers() -> bool:
    """
    Fetches the list of all shops, does some load balancing magic and calls all registered crawler
    instances to start them
    :return: If the calls have been successful
    """
    product_ids = sql.getProductsToCrawl()

    # crawler_urls = ['crawl.p4ddy.com', 'crawl.betterzon.xyz']
    crawler_urls = ['http://localhost:22026']

    balanced_lists = []

    products_per_crawler = len(product_ids) // len(crawler_urls)
    rest = len(product_ids) % len(crawler_urls)

    # Distrubute available products over available crawler instances
    for crawler_id in range(len(crawler_urls)):
        amount_of_prods = products_per_crawler

        # If we e.g. have 7 products but 2 crawlers, the first needs to crawl 4 products and the 2nd 3
        if crawler_id < rest:
            amount_of_prods += 1

        # Assign the required amount of product ids to the current crawler and remove them from the
        # list of all product ids
        balanced_lists.append(product_ids[:amount_of_prods])
        product_ids = product_ids[amount_of_prods:]

    # Make the callouts to the instances
    successful = 0
    for crawler_id in range(len(crawler_urls)):
        prods = balanced_lists[crawler_id]
        url = crawler_urls[crawler_id]

        # Send request
        data = {
            'key': os.environ['CRAWLER_ACCESS_KEY'],
            'products': prods
        }
        headers = {'content-type': 'application/json', 'accept': 'application/json'}

        resp = requests.post(url=url, data=json.dumps(data), headers=headers)

        if resp.status_code == 200:
            successful += 1

    return successful == len(crawler_urls)


if __name__ == '__main__':
    call_crawlers()
