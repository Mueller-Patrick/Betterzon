import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";


@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

    sidenav: any;
    isLoggedIn: boolean;
    searchQuery: string;

    constructor(
        private api: ApiService,
        private router: Router
    ) {
    }

    ngOnInit() {

        this.api.getUserInfo().subscribe(data => {
            console.log(data)
        });

        if (this.api.getSessionInfoFromLocalStorage().session_id != "") {
            this.isLoggedIn = true;
        }
    }

    logout(): void {
        localStorage.setItem('session_id', '');
        localStorage.setItem('session_key', '');
        this.router.navigate(['/']);
    }

    getSearchedProducts(): void {
        console.log(this.searchQuery);
        this.redirectTo('/search', {queryParams: {q: this.searchQuery}});
    }

    redirectTo(uri: string, queryParams: object): void {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate([uri], queryParams));
    }
}
