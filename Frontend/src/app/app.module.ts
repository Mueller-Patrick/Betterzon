import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRouting} from './app.routing';
import {ProductListComponent} from './components/product-list/product-list.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import {NgApexchartsModule} from 'ng-apexcharts';
import { ProductSearchPageComponent } from './pages/product-search-page/product-search-page.component';
import { HeaderComponent } from './components/header/header.component';
import { NewestPricesListComponent } from './components/newest-prices-list/newest-prices-list.component';

@NgModule({
    declarations: [
        AppComponent,
        ProductListComponent,
        LandingpageComponent,
        ProductDetailPageComponent,
        FooterComponent,
        ProductDetailsComponent,
        ProductSearchPageComponent,
        HeaderComponent,
        NewestPricesListComponent
    ],
    imports: [
        BrowserModule,
        AppRouting,
        HttpClientModule,
        NgApexchartsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
