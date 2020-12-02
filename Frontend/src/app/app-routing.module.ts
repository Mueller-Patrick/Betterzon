import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HelloWorldComponent} from './hello-world/hello-world.component';
import {AppComponent} from './app.component';
import {ProductListComponent} from './product-list/product-list.component';

const routes: Routes = [
    {path: '', component: AppComponent},
    {path: 'helloworld', component: HelloWorldComponent},
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
export class AppRoutingModule {
}
