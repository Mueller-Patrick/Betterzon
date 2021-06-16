import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    currentUser: any;
    obj:any

    constructor(private api: ApiService ) { }

    ngOnInit(): void {

        this.api.getUserInfo().subscribe(
            user=> {
                this.currentUser = user
                console.log(this.currentUser);
            },
        );
    }
}
