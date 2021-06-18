import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
    }

    navigateImprint(): void {
        this.router.navigate([('/impressum')]);
    }

}
