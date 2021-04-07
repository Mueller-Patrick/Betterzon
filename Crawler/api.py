from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)


class CrawlerApi(Resource):
    def get(self):
        return {'Hallo': 'Betterzon'}


api.add_resource(CrawlerApi, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=22026)
