angular.module("grupofamiliar")
       .controller("AgendaCtrl", function($scope, $timeout) {
            var temporizador = null;
    
            $scope.passos = [
                { titulo: "Orar-ler e Oração", duracao: 5, iniciado: false, minutos: 0, tempoform: "0m00" },
                { titulo: "Louvor", duracao: 25, iniciado: false, minutos: 0, tempoform: "0m00" },
                { titulo: "Nutrivídeo", duracao: 20, iniciado: false, minutos: 0, tempoform: "0m00" },
                { titulo: "Palavra de Nutrição", duracao: 20, iniciado: false, minutos: 0, tempoform: "0m00" },
                { titulo: "Compartilhar da Palavra", duracao: 10, iniciado: false, minutos: 0, tempoform: "0m00" },
                { titulo: "Oração Final", duracao: 5, iniciado: false, minutos: 0, tempoform: "0m00" }
            ];
    
            $scope.passoatual   = -1;
            $scope.selecionado  = false;
    
            $scope.mudarPasso = function() {
                if ($scope.passoatual > -1)
                {
                    $scope.passos[$scope.passoatual].selected = false;
                    $scope.finalizarTemporizador();
                }
                
                $scope.passoatual++;
                
                if ($scope.passoatual <= 5)
                {
                    $scope.passos[$scope.passoatual].selected = true;
                    $scope.iniciarTemporizador();
                }
            };
    
            $scope.onTimeout = function() {
                $scope.passos[$scope.passoatual].minutos++;
                
                var minnum = $scope.passos[$scope.passoatual].minutos;
                var minutos = Math.floor(minnum / 60);
                var segundos = minnum % 60;
                
                if (segundos < 10) segundos = "0" + segundos;
                
                $scope.passos[$scope.passoatual].tempoform = minutos + "m" + segundos;
                
                temporizador = $timeout($scope.onTimeout, 1000);
            };
    
            $scope.iniciarTemporizador = function() {
                temporizador = $timeout($scope.onTimeout, 1000);
            };
    
            $scope.finalizarTemporizador = function() {
                //$scope.$broadcast("timer-stopped", $scope.counter);
                //$scope.counter = 0;
                $timeout.cancel(temporizador);
            };
        });



/*
Código do temporizador

angular.module('TimerApp', [])
.controller('TimerCtrl', function($scope, $timeout) {
    $scope.counter = 90;
    var mytimeout = null; // the current timeoutID
    // actual timer method, counts down every second, stops on zero
    $scope.onTimeout = function() {
        if($scope.counter ===  0) {
            $scope.$broadcast('timer-stopped', 0);
            $timeout.cancel(mytimeout);
            return;
        }
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    $scope.startTimer = function() {
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    // stops and resets the current timer
    $scope.stopTimer = function() {
        $scope.$broadcast('timer-stopped', $scope.counter);
        $scope.counter = 90;
        $timeout.cancel(mytimeout);
    };
    // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
    $scope.$on('timer-stopped', function(event, remaining) {
        if(remaining === 0) {
            console.log('your time ran out!');
        }
    });
});
*/