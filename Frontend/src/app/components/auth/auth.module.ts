import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {SigninComponent} from './signin/signin.component';
import {RegistrationComponent} from './registration/registration.component';
import {ResetpasswortComponent} from './resetpasswort/resetpasswort.component';


@NgModule({
    declarations: [SigninComponent, RegistrationComponent, ResetpasswortComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
    ],
    exports: [
        SigninComponent,
        RegistrationComponent,
        ResetpasswortComponent,
    ],
})
export class AuthModule {
}
