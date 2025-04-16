import {Component, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WeatherService} from './service/weather.service';
import {WeatherDefinition} from './type/WeatherDefinition';
import {Parser} from './class/Parser';
import {Subscription} from 'rxjs';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, DecimalPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'mqtt_frontend';

  protected currentWeather!: WeatherDefinition | undefined
  private subscriptions: Subscription[] = [];

  station = new FormControl('', { nonNullable: true });

  constructor(
    private weatherService: WeatherService,
    private parser: Parser,
    private toaster: ToastrService,
  ) {};

  ngOnInit(): void {
    this.connectWebSocket();
  }

  ngOnDestroy() {
    this.weatherService.closeConnection();
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }

  connectWebSocket() {
    this.subscriptions.push(this.weatherService.getWeatherData().subscribe((message) => {
      this.currentWeather = this.parser.parse(message);
    }));
  }

  executeStationChange() {
    this.subscriptions.push(this.weatherService.setStation(this.station.value).subscribe((response) => {
      this.toaster.success(response.message, 'Changed station: ' + this.station.value);
    }, (error) => {
      this.toaster.error(error.error.message, 'Couldn`t change station: ' + this.station.value);
    }));
  }

}
