import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
        title = 'app';
        loadedFeature = 'recipe';


        ngOnInit() {
                firebase.initializeApp({
                        apiKey: "AIzaSyBOeoPHZefc-VgECSlnhzmxfGby2s3dxfY",
                        authDomain: "ng-recipe-book-2de1c.firebaseapp.com"
                });
        }

        onNavigate(feature: string) {
                this.loadedFeature = feature;
        }
}
