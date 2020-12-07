import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRouting} from './app.routing';
import {ProductListComponent} from './components/product-list/product-list.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { ProductDetailPageComponent } from './components/product-detail-page/product-detail-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@NgModule({
    declarations: [
        AppComponent,
        ProductListComponent,
        LandingpageComponent,
        ProductDetailPageComponent,
        FooterComponent,
        ProductDetailsComponent
    ],
    imports: [
        BrowserModule,
        AppRouting,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
