import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRouting} from './app.routing';
import {ProductListComponent} from './product-list/product-list.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [
        AppComponent,
        ProductListComponent,
        LandingpageComponent,
        ProductDetailPageComponent,
        FooterComponent
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
