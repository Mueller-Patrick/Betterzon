import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {LandingpageComponent} from './pages/landingpage/landingpage.component';
import {ProductDetailPageComponent} from './pages/product-detail-page/product-detail-page.component';
import {ProductSearchPageComponent} from './pages/product-search-page/product-search-page.component';
import {PageNotFoundPageComponent} from './pages/page-not-found-page/page-not-found-page.component';
import {ImprintComponent} from './pages/imprint/imprint.component';
import {PrivacyComponent} from './pages/privacy/privacy.component';
import {SigninComponent} from './components/auth/signin/signin.component';
import {RegistrationComponent} from './components/auth/registration/registration.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';

const routes: Routes = [
    {path: '', component: LandingpageComponent, pathMatch: 'full'},
    {path: 'search', component: ProductSearchPageComponent},
    {path: 'product/:id', component: ProductDetailPageComponent},
    {path: 'impressum', component: ImprintComponent},
    {path: 'datenschutz', component: PrivacyComponent},
    {path: 'signin', component: SigninComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'product-detail', component: ProductDetailPageComponent},
    {path: 'profile', component: ProfilePageComponent},
    {path: '**', component: PageNotFoundPageComponent}
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouting {
}
