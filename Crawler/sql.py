import logging

import pymysql
import os


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


def getProductsForVendor(vendor_id: int) -> [{}]:
    """
    Queries the product links for all products of the given shop
    :param vendor_id: The vendor / shop to query products for
    :return: A list of product objects, each having the following parameters:
                product_id, vendor_id, url
    """
    conn = __getConnection__()
    cur = conn.cursor()

    query = 'SELECT product_id, url FROM product_links WHERE vendor_id = %s'

    cur.execute(query, (vendor_id,))

    products = list(map(lambda x: {'product_id': x[0], 'vendor_id': vendor_id, 'url': x[1]}, cur.fetchall()))

    return products

def getProductLinksForProduct(product_id: int) -> [dict]:
    """
    Queries all the product links for the given product
    :param product_id: The product to query data for
    :return: A list of product objects, each having the following parameters:
                product_id, vendor_id, url
    """
    conn = __getConnection__()
    cur = conn.cursor()

    query = 'SELECT vendor_id, url FROM product_links WHERE product_id = %s'
    cur.execute(query, (product_id,))

    products = list(map(lambda x: {'product_id': product_id, 'vendor_id': x[0], 'url': x[1]}, cur.fetchall()))

    return products



def insertData(data_to_insert: [tuple]) -> bool:
    """
    Inserts the given list of tuples into the DB
    :param dataToInsert: A list of tuples, where each tuple has to contain product id, vendor id and the price
                         in exactly this order
    :return: If the insert was successful
    """
    conn = __getConnection__()
    cur = conn.cursor()

    query = 'INSERT INTO prices (product_id, vendor_id, price_in_cents, timestamp) VALUES (%s, %s, %s, NOW())'

    affectedRows = cur.executemany(query, data_to_insert)

    if affectedRows != len(data_to_insert):
        # Something went wrong, revert the changes
        conn.rollback()
    else:
        conn.commit()

    cur.close()
    conn.close()

    return affectedRows == len(data_to_insert)
