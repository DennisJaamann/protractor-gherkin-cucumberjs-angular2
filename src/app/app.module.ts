import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent, ROUTES} from './';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { SetNewPasswordComponent } from './set-new-password';
import { ForgotPasswordComponent } from './forgot-password';
import { SpeakerRegistrationModule } from './speaker-registration';

const APP_PROVIDERS = [
];

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(ROUTES, {useHash: false}),
        SpeakerRegistrationModule
    ],
    declarations: [AppComponent, LoginComponent, RegisterComponent, SetNewPasswordComponent, ForgotPasswordComponent],
    bootstrap: [AppComponent],
    providers: [
        APP_PROVIDERS
    ]
})
export class AppModule {

}
