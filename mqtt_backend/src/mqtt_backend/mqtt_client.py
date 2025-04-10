import paho.mqtt.client as mqtt
from .weather_object import WeatherObject


def on_connect(client, userdata, flags, reason_code):
    print(f"Connected with result code {reason_code}")
    client.subscribe(MQTTClient.weather_topic + "#")


def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))
    MQTTClient.weather_cache[msg.topic] = WeatherObject(msg.payload)


class MQTTClient:
    weather_topic = '/weather/'
    weather_cache = dict()
    weather_station = 'mosbach'

    def __init__(self):
        self.mqtt_client = mqtt.Client()
        self.connect()

    def connect(self):
        self.mqtt_client.on_connect = on_connect
        self.mqtt_client.on_message = on_message
        self.mqtt_client.connect("10.50.12.150", 1883)

    def close(self):
        self.mqtt_client.unsubscribe(self.weather_topic + "#")
        self.mqtt_client.loop_stop()

    def get_station_data(self):
        station = self.weather_topic + self.weather_station
        return self.weather_cache.get(station)

    def mqtt_start_loop(self):
        self.mqtt_client.loop_start()

    def change_station(self, station):
        new_station = self.weather_topic + station
        print(self.weather_cache)
        if new_station in self.weather_cache:
            self.weather_station = station
            return "Success", 200
        else:
            return "Error", 404

