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

  setStation(station: string) {
    const body = {
      "station": station
    };
    this.webSocket$.next(body);
  }

  getWeatherData(): Observable<any> {
    return this.webSocket$.asObservable();
  }

  closeConnection() {
    this.webSocket$.complete();
  }

}
