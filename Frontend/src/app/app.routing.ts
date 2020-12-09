import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {LandingpageComponent} from './pages/landingpage/landingpage.component';
import {ProductDetailPageComponent} from './pages/product-detail-page/product-detail-page.component';
import {ProductSearchPageComponent} from './pages/product-search-page/product-search-page.component';

const routes: Routes = [
    {path: '', component: LandingpageComponent},
    {path: 'search', component: ProductSearchPageComponent},
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
