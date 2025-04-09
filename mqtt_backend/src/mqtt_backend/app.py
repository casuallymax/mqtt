from quart import Quart, request
from .mqtt_client import MQTTClient

app = Quart(__name__)

mqtt_client = MQTTClient()


@app.route('/ping')
def ping():
    response = 'Hello, World!'
    return response


@app.route('/current_weather', methods=['POST'])
async def current_weather():
    station = (await request.get_json())['station']
    return mqtt_client.get_station_data(station).toJSON(), 200

