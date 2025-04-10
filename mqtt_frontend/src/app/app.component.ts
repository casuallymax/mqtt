import {Component, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatList, MatListItem} from '@angular/material/list';
import {WeatherService} from './service/weather.service';
import {WeatherDefinition} from './type/WeatherDefinition';
import {Parser} from './class/Parser';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatGridList, MatGridTile, MatList, MatListItem],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'mqtt_frontend';

  protected currentWeather!: WeatherDefinition
  private weatherSubscription!: Subscription

  constructor(
    private weatherService: WeatherService,
    private parser: Parser
  ) {};

  ngOnInit(): void {
    this.executeStationChange('mosbach');
    this.connectWebSocket();
  }

  ngOnDestroy() {
    this.weatherService.closeConnection();
    this.weatherSubscription.unsubscribe();
  }

  connectWebSocket() {
    this.weatherSubscription = this.weatherService.getWeatherData().subscribe((message) => {
      this.currentWeather = this.parser.parse(message);
    });
  }

  executeStationChange(station: string) {
    this.weatherService.setStation(station)
  }

}
