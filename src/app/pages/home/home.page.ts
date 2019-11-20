import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  dataRepId: number;
  dataRepName: any;
  title = 'toto';

  constructor( public activeRoute: ActivatedRoute, private storage: Storage) {}

  ngOnInit() {
    this.storage.get('USER_NAME').then((val) => {
      console.log('Le USER_NAME storé est : ', val);
    });

    let dataRepId = this.activeRoute.snapshot.paramMap.get('id');
    let dataRepName = this.activeRoute.snapshot.paramMap.get('name');
    console.log(dataRepId, dataRepName);
  }
}

