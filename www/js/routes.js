angular.module("grupofamiliar")
        .config(function($stateProvider, $urlRouterProvider) {
          $stateProvider

            .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html' /*,
            controller: 'AppCtrl'*/
          })

          .state('app.inicio', {
            url: '/inicio',
            views: {
              'menuContent': {
                templateUrl: 'templates/inicio.html'
              }
            }
          })
          
          .state('app.meu', {
            url: '/meu',
            views: {
              'menuContent': {
                templateUrl: 'templates/meu.html',
                controller: 'MeuCtrl'
              }
            }
          })
          
          .state('app.agenda', {
            url: '/agenda',
            views: {
              'menuContent': {
                templateUrl: 'templates/agenda.html',
                controller: 'AgendaCtrl'
              }
            }
          })
          
          .state('app.sobre', {
            url: '/sobre',
            views: {
              'menuContent': {
                templateUrl: 'templates/sobre.html'
              }
            }
          });
/*
          .state('app.browse', {
              url: '/browse',
              views: {
                'menuContent': {
                  templateUrl: 'templates/browse.html'
                }
              }
            })
            .state('app.playlists', {
              url: '/playlists',
              views: {
                'menuContent': {
                  templateUrl: 'templates/playlists.html',
                  controller: 'PlaylistsCtrl'
                }
              }
            })

          .state('app.single', {
            url: '/playlists/:playlistId',
            views: {
              'menuContent': {
                templateUrl: 'templates/playlist.html',
                controller: 'PlaylistCtrl'
              }
            }
          });*/
          // if none of the above states are matched, use this as the fallback
          $urlRouterProvider.otherwise('/app/inicio');
        });