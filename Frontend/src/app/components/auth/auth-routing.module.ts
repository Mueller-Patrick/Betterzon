import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from "./registration/registration.component";
import {SigninComponent} from "./signin/signin.component";
import {ResetpasswortComponent} from "./resetpasswort/resetpasswort.component";

const routes: Routes = [
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: 'signin',
        component: SigninComponent
    },
    {
        path: 'resetpasswort',
        component: ResetpasswortComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
