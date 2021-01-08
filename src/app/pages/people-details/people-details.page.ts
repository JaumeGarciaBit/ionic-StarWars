import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.page.html',
  styleUrls: ['./people-details.page.scss'],
})
export class PeopleDetailsPage implements OnInit {

  people: any;
  info = [];

  constructor() { }

  ngOnInit() 
  {
    this.people = history.state;

    Object.keys(this.people).forEach((k) =>
    {
      this.info.push(`${k}: ${this.people[k]}`);
    })  }
}
