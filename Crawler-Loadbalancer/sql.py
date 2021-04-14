import pymysql
import os
import logging


def __getConnection__() -> pymysql.Connection:
    """
    Opens a new pymysql connection and returns it
    :return: A pymysql Connection object
    """
    logger = logging.getLogger()
    try:
        conn = pymysql.connect(
            user=os.environ['BETTERZON_CRAWLER_USER'],
            password=os.environ['BETTERZON_CRAWLER_PASSWORD'],
            host=os.environ['BETTERZON_CRAWLER_HOST'],
            port=3306,
            database=os.environ['BETTERZON_CRAWLER_DB']
        )

        return conn
    except pymysql.Error as e:
        logger.error('SQL Connection error: %s', e)
        return


def getShopsToCrawl() -> [int]:
    """
    Queries the list of vendor IDs and returns them
    :return: The list of IDs
    """
    conn = __getConnection__()
    cur = conn.cursor()

    query = 'SELECT vendor_id FROM vendors'

    cur.execute(query)

    # Extract the IDs from the returned tuples into a list
    vendor_ids = list(map(lambda x: x[0], cur.fetchall()))

    return vendor_ids

def getProductsToCrawl() -> [int]:
    """
    Queries the list of product IDs and returns them
    :return: The list of IDs
    """
    conn = __getConnection__()
    cur = conn.cursor()

    query = 'SELECT product_id FROM products'

    cur.execute(query)

    # Extract the IDs from the returned tuples into a list
    product_ids = list(map(lambda x: x[0], cur.fetchall()))

    return product_ids
