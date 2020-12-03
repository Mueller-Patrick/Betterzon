import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {ProductListComponent} from './product-list/product-list.component';
import {LandingpageComponent} from './landingpage/landingpage.component';
import {ProductDetailPageComponent} from './product-detail-page/product-detail-page.component';

const routes: Routes = [
    {path: '', component: LandingpageComponent},
    {path: 'product/:id', component: ProductDetailPageComponent}
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
