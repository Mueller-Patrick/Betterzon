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
import {ImprintComponent} from './pages/imprint/imprint.component';
import {PrivacyComponent} from './pages/privacy/privacy.component';
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';

// For cookie popup
const cookieConfig: NgcCookieConsentConfig = {
    cookie: {
        domain: 'betterzon.xyz'
    },
    palette: {
        popup: {
            background: '#000'
        },
        button: {
            background: '#f1d600'
        }
    },
    theme: 'edgeless',
    type: 'opt-out',
    layout: 'my-custom-layout',
    layouts: {
        'my-custom-layout': '{{messagelink}}{{compliance}}'
    },
    elements: {
        messagelink: `
    <span id="cookieconsent:desc" class="cc-message">{{message}}
      <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{whatAreCookiesHref}}" target="_blank">{{whatAreCookiesLink}}</a>
      <a aria-label="learn more about our privacy policy" tabindex="1" class="cc-link" href="{{privacyPolicyHref}}" target="_blank">{{privacyPolicyLink}}</a>
    </span>
    `,
    },
    content: {
        // Custom message
        // message: 'By using our site, you acknowledge that you have read and understand our ',

        whatAreCookiesLink: 'Learn more',
        whatAreCookiesHref: 'https://www.cookiesandyou.com/',

        privacyPolicyLink: 'Privacy Policy',
        privacyPolicyHref: '/datenschutz',
    }
};

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
        PageNotFoundPageComponent,
        ImprintComponent,
        PrivacyComponent
    ],
    imports: [
        BrowserModule,
        AppRouting,
        HttpClientModule,
        NgApexchartsModule,
        FormsModule,
        MatMenuModule,
        BrowserAnimationsModule,
        NgcCookieConsentModule.forRoot(cookieConfig)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
