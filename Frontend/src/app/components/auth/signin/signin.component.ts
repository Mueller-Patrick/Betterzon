import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
    form: any;
    loginInvalid: any;

  constructor() { }

  ngOnInit(): void {
  }

    onSubmit() {
        
    }
}
