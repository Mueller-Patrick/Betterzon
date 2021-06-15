import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    private isSuccessful: boolean;
    private isSignUpFailed: boolean;
    private errorMessage: '';


    constructor(
        private formBuilder: FormBuilder,
        private api: ApiService,
        private router: Router
    ) { }

    ngOnInit(): void {
          this.loginForm = this.formBuilder.group({
              username: ['', Validators.required],
              password: ['', [Validators.required, Validators.minLength(8)]]
          });
      }

      onSubmit() {

          this.submitted = true;

          if (this.loginForm.invalid) {
              return;
          }

          this.api.loginUser(this.loginForm.value.username, this.loginForm.value.password)
              .subscribe(
                  data => {
                      this.router.navigate(['']);
                      this.isSuccessful = true;
                      this.isSignUpFailed = false;
                  },
                  err => {
                      this.errorMessage = err.error.message;
                      this.isSignUpFailed = true;
              })
      }
}
