import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ApiService} from "../../../services/api.service";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    form: any;
    loading = false;
    submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private api : ApiService
  ) { }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
          username: ['', Validators.required],
          email: ['', Validators.required],
          password: ['', [
              Validators.required,
              Validators.minLength(8)]
          ],
      });
  }

  get me() { return this.form.controls; }

  onSubmit() {
      console.log(this.form.value);
      this.api.registerUser(this.form.value.username, this.form.value.password, this.form.value.email).subscribe(res=>console.log(res));
  }
}
