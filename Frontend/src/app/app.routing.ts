import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {ProductListComponent} from './product-list/product-list.component';
import {LandingpageComponent} from './landingpage/landingpage.component';

const routes: Routes = [
    {path: '', component: LandingpageComponent},
    {path: 'pdp', component: ProductListComponent}
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
