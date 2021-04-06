import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRouting} from './app.routing';
import {ProductListComponent} from './components/product-list/product-list.component';
import {LandingpageComponent} from './pages/landingpage/landingpage.component';
import {ProductDetailPageComponent} from './pages/product-detail-page/product-detail-page.component';
import {FooterComponent} from './components/footer/footer.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {NgApexchartsModule} from 'ng-apexcharts';
import {ProductSearchPageComponent} from './pages/product-search-page/product-search-page.component';
import {HeaderComponent} from './components/header/header.component';
import {NewestPricesListComponent} from './components/newest-prices-list/newest-prices-list.component';
import {FormsModule} from '@angular/forms';
import {PageNotFoundPageComponent} from './pages/page-not-found-page/page-not-found-page.component';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
        NewestPricesListComponent,
        PageNotFoundPageComponent
    ],
    imports: [
        BrowserModule,
        AppRouting,
        HttpClientModule,
        NgApexchartsModule,
        FormsModule,
        MatMenuModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
