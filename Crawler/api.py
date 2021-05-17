import os

from flask import Flask
from flask_restful import Resource, Api, reqparse

import crawler

app = Flask(__name__)
api = Api(app)

# To parse request data
parser = reqparse.RequestParser()
parser.add_argument('key')
parser.add_argument('products')


class CrawlerApi(Resource):
    def get(self):
        return {'Hallo': 'Betterzon'}

    def post(self):
        # Accept crawler request here
        args = parser.parse_args()
        access_key = os.getenv('CRAWLER_ACCESS_KEY')
        if(args['key'] == access_key):
            crawler.crawl(args['products'])
            return {'message': 'success'}
        else:
            return {'message': 'Wrong access key'}


api.add_resource(CrawlerApi, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=22026)
