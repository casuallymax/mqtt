import paho.mqtt.client as mqtt
from .weather_object import WeatherObject


def on_connect(client, userdata, flags, reason_code):
    print(f"Connected with result code {reason_code}")
    client.subscribe(WeatherClient.weather_topic + WeatherClient.current_station)


def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))
    WeatherClient.latest_data = WeatherObject(msg.payload)


class WeatherClient:
    weather_topic = '/weather/'
    latest_data = ''
    current_station = 'mosbach'

    def __init__(self):
        self.mqtt_client = mqtt.Client()
        self.mqtt_client.on_connect = on_connect
        self.mqtt_client.on_message = on_message
        self.mqtt_client.connect("10.50.12.150", 1883)
        self.mqtt_client.loop_start()

    def close(self):
        self.mqtt_client.unsubscribe(self.weather_topic + self.current_station)
        self.mqtt_client.loop_stop()

    def change_station(self, new_station):
        self.mqtt_client.unsubscribe(self.weather_topic + self.current_station)
        self.mqtt_client.subscribe(self.weather_topic + new_station)
        self.current_station = new_station
