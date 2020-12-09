import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-landingpage',
    templateUrl: './landingpage.component.html',
    styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
    searchInput: string;

    constructor(
        private router: Router
    ) {
    }

    ngOnInit(): void {
    }

    startedSearch(): void {
        this.redirectTo('/search', {queryParams: {q: this.searchInput}});
    }

    redirectTo(uri: string, queryParams: object): void {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate([uri], queryParams));
    }

}
