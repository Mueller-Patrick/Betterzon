from flask import Flask
from flask_restful import Resource, Api, reqparse

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
        return args


api.add_resource(CrawlerApi, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=22026)
