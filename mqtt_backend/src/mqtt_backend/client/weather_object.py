import json


class WeatherObject:

    def __init__(self, data):
        deserialized_json = json.loads(data)
        self.tempCurrent = deserialized_json["tempCurrent"]
        self.tempMax = deserialized_json["tempMax"]
        self.tempMin = deserialized_json["tempMin"]
        self.comment = deserialized_json["comment"]
        self.timeStamp = deserialized_json["timeStamp"]
        self.city = deserialized_json["city"]
        self.cityId = deserialized_json["cityId"]

    def toJSON(self):
        weather_data = {
            "tempCurrent": self.tempCurrent,
            "tempMax": self.tempMax,
            "tempMin": self.tempMin,
            "comment": self.comment,
            "timeStamp": self.timeStamp,
            "city": self.city,
            "cityId": self.cityId
        }
        return json.dumps(weather_data)
