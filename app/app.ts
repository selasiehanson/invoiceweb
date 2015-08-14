/// <reference path="../typings/tsd.d.ts" />

import { PeopleCtrl } from "./controllers/people";
import { UserService } from "./services/people";
import { Routes } from "./conf/routes";

import { RouteFinder } from './components/shared/route-finder';
import { AuthToken } from './components/shared/auth-token'
import { MasterCtrl } from './components/master/master';
import { AppIndexController } from './components/shared/app-index-ctrl'


//components
import { BlockHeader } from './components/block-header/block-header'
import { Card } from './components/card/card'
import { AxForm } from './components/forms/form'

var app = angular.module("sample", [
    'ui.router',
    'ng-mfb'
]);

app.service("app.services.UserService", UserService);
app.service("RouteFinder", RouteFinder);
app.service("AuthToken", AuthToken);
app.controller("PeopleController", PeopleCtrl);
app.controller("AppIndexController", AppIndexController);

app.controller('MasterCtrl', MasterCtrl);
//directives
app.directive('axBlockHeader', () => new BlockHeader());
app.directive('axCard', () =>  new Card() );
app.directive('axForm', AxForm );
export { app };

app.config(Routes);

app.run(() => {
    console.log("Application Started");
});
