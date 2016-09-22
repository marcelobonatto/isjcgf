angular.module('grupofamiliar.controllers', [])
/*
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})*/
.controller("AgendaCtrl", function($scope, $timeout, $http, $ionicModal) {
            var temporizador    = null;
    
            $scope.passos       = [];
            $scope.dadopassosel = null;
    
            $http.get("data/agenda.json")
                 .then(function successCallback(response) {
                            $scope.passos = response.data;
                        });
    
            $scope.passoatual   = -1;
            $scope.selecionado  = false;
    
            $scope.mudarPasso = function() {
                if ($scope.passoatual > -1)
                {
                    var atual = $scope.passos[$scope.passoatual];
                    
                    atual.selected = false;
                    $scope.finalizarTemporizador();
                    atual.okico = "ion-checkmark-circled";
                    atual.oktitle = "Finalizado";
                }
                
                $scope.passoatual++;
                
                if ($scope.passoatual <= 5)
                {
                    $scope.passos[$scope.passoatual].selected = true;
                    $scope.iniciarTemporizador();
                }
            };
    
            $scope.pularPasso = function() {
                if ($scope.passoatual > -1)
                {
                    var atual = $scope.passos[$scope.passoatual];
                    
                    atual.selected = false;
                    atual.segundos = 0;
                    atual.tempoform = "0m00";
                    atual.perc = 0;
                    $scope.finalizarTemporizador();
                    atual.okico = "ion-close-circled";
                    atual.oktitle = "Cancelado";
                }
                
                $scope.passoatual++;
                
                if ($scope.passoatual <= 5)
                {
                    $scope.passos[$scope.passoatual].selected = true;
                    $scope.iniciarTemporizador();
                }
            };
    
            $scope.onTimeout = function() {
                $scope.passos[$scope.passoatual].segundos++;
                
                var total = $scope.passos[$scope.passoatual].durseg;
                var segnum = $scope.passos[$scope.passoatual].segundos;
                var perc = Math.floor((segnum / total) * 100);
                var minutos = Math.floor(segnum / 60);
                var segundos = segnum % 60;
                
                if (segundos < 10) segundos = "0" + segundos;
                
                $scope.passos[$scope.passoatual].tempoform = minutos + "m" + segundos;
                $scope.passos[$scope.passoatual].perc = (perc > 100 ? 100 : perc);
                
                temporizador = $timeout($scope.onTimeout, 1000);
            };
    
            $scope.iniciarTemporizador = function() {
                temporizador = $timeout($scope.onTimeout, 1000);
            };
    
            $scope.finalizarTemporizador = function() {
                $timeout.cancel(temporizador);
            };
    
            $ionicModal.fromTemplateUrl('templates/passodetalhe.html', {
                    scope: $scope
                }).then(function(modal) {
                    $scope.modal = modal;
                });
    
            $scope.abrirPasso = function(passo) {
                $scope.dadopassosel = $scope.passos[passo];                
                $scope.modal.show();  
            };
    
            $scope.fecharPasso = function() {
                $scope.modal.hide();
            };
        })
.controller("MeuCtrl", function($scope, $http) {
            $scope.estados      = [];
            $scope.cidades      = [];
            $scope.dias         = [ "DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB" ];
    
            $http.get("data/ufcid.json")
                 .then(function successCallback(response) {
                            $scope.estados = response.data.estados;
                            $scope.cidades = response.data.cidades;
                        });
        });
