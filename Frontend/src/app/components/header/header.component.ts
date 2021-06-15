import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {
    searchInput: string;
    @Input() showSearch: boolean;

    constructor(
        private router: Router
    ) {
    }

    ngOnInit(): void {
        if (!this.showSearch) {
            this.showSearch = false;
        }
    }

    clickedLogo(): void {
        this.router.navigate([('/')]);
    }

    startedSearch(): void {
        this.redirectTo('/search', {queryParams: {q: this.searchInput}});
    }

    redirectTo(uri: string, queryParams: object): void {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate([uri], queryParams));
    }

}
