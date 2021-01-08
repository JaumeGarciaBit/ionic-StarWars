import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.page.html',
  styleUrls: ['./planet-details.page.scss'],
})
export class PlanetDetailsPage implements OnInit {

  planet: any;
  info = [];

  constructor() { }

  ngOnInit() 
  {
    this.planet = history.state;

    Object.keys(this.planet).forEach((k) =>
    {
      this.info.push(`${k}: ${this.planet[k]}`);
    });
  }
}
