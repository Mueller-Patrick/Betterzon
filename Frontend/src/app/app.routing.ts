import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {LandingpageComponent} from './components/landingpage/landingpage.component';
import {ProductDetailPageComponent} from './components/product-detail-page/product-detail-page.component';

const routes: Routes = [
    {path: '', component: LandingpageComponent},
    {path: 'product', component: ProductDetailPageComponent}
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
