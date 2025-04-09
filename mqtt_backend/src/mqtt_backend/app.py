import json

from quart import Quart, request
from .client.weather_client import WeatherClient

app = Quart(__name__)

weather_client = WeatherClient()


@app.route('/ping')
def ping():
    response = 'Hello, World!'
    return response


@app.route('/current_weather')
def current_weather():
    return weather_client.latest_data.toJSON()


@app.route('/change_station', methods=['POST'])
async def change_station():
    station = (await request.get_json())['station']
    try:
        weather_client.change_station(station)
    except:
        return 500
    else:
        return weather_client.latest_data.toJSON(), 200
