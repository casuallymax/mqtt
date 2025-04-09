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

    def __init__(self):
        self.mqtt_client = mqtt.Client()
        self.mqtt_client.on_connect = on_connect
        self.mqtt_client.on_message = on_message
        self.mqtt_client.connect("10.50.12.150", 1883)
        self.mqtt_client.loop_start()

    def close(self):
        self.mqtt_client.unsubscribe(self.weather_topic + "#")
        self.mqtt_client.loop_stop()

    def get_station_data(self, station):
        station = self.weather_topic + station
        print(station)
        if station in self.weather_cache:
            return self.weather_cache.get(station)
