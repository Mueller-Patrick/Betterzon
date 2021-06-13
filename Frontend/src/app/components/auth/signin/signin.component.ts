import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {

    form: any;

    constructor(
        private formBuilder: FormBuilder,
        private api : ApiService
    ) { }

    ngOnInit(): void {
          this.form = this.formBuilder.group({
              email: ['', Validators.required],
              password: ['', Validators.required]
          });
      }

      onSubmit() {
          console.log(this.form.value);
          this.api.loginUser(this.form.value.username, this.form.value.password);
      }
}
