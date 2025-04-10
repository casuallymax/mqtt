import {WeatherDefinition} from '../type/WeatherDefinition';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Parser {

  parse(weatherData: any): WeatherDefinition {
    const tempCurrent = weatherData.tempCurrent;
    const tempMax = weatherData.tempMax;
    const tempMin = weatherData.tempMin;
    const comment = weatherData.comment;
    const timeStamp = new Date(weatherData.timeStamp);
    const city = weatherData.city;
    const cityId = weatherData.cityId;

    return {
      tempCurrent,
      tempMax,
      tempMin,
      comment,
      timeStamp,
      city,
      cityId
    }
  }

}
