import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular-6-social-login';
import {login} from "../../shared/constant/login";
import {LocalStorageService} from "../../providers/localStorage.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    password: string;
    name: string;
    userdata: any;

    constructor(private router: Router,
                private socialAuthService: AuthService,
                private localStorage: LocalStorageService) {
    }

    public socialSignIn(socialPlatform: string) {
        let socialPlatformProvider;
        if (socialPlatform == "facebook") {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        } else if (socialPlatform == "google") {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }
        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                this.userdata = userData;
                if (userData.name === "Julien Rajerison") {
                    this.router.navigate(['dashboard']);
                } else {
                    window.alert("Name or password incorect");
                    this.router.navigate(['']);
                }
            }
        );
    }

    ngOnInit() {
        document.body.style.overflow = "hidden";
    }

    login() {
        if (this.password === login.password && this.name === login.name) {
            this.localStorage.setLocalstorage('nom', this.name);
            this.router.navigate(['dashboard'])
        } else {
            window.alert("Name or password incorect");
            this.router.navigate(['']);
        }
    }
}
