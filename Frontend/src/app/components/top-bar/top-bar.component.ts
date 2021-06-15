import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  sidenav: any;

  constructor(
      private api: ApiService
  ) { }

    ngOnInit() {

        this.api.getUserInfo().subscribe(data=>{console.log(data)});
    }
}
