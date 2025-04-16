import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  BASE_URL = "http://127.0.0.1:5000";

  private webSocket$: WebSocketSubject<any>;

  constructor(
    private httpClient: HttpClient
  ) {
    this.webSocket$ = webSocket(this.BASE_URL + '/ws');
  };

  setStation(station: string): Observable<any> {
    const body = {
      "station": station
    }
    return this.httpClient.post<any>(this.BASE_URL + '/change_station', body)
  }

  getWeatherData(): Observable<any> {
    return this.webSocket$.asObservable();
  }

  closeConnection() {
    this.webSocket$.complete();
  }

}
