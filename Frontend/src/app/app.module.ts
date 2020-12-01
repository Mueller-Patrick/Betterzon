import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { ProductListComponentComponent } from './product-list-component/product-list-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    ProductListComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
