angular.module("grupofamiliar")
       .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");
            
            $stateProvider.state("agenda", {
                url: "/",
                templateUrl: "templates/agenda.html",
                controller: "AgendaCtrl"
            });
        });