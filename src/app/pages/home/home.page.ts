import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

dataRepId: number;
dataRepName: any;
title = 'toto';

  constructor( public activeRoute: ActivatedRoute) {}

  ngOnInit() {
    let dataRepId = this.activeRoute.snapshot.paramMap.get('id');
    let dataRepName = this.activeRoute.snapshot.paramMap.get('name');
    console.log(dataRepId, dataRepName);
  }
}

