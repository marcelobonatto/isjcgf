angular.module("grupofamiliar")
       .controller("AgendaCtrl", function($scope, $timeout) {
            var temporizador = null;
    
            $scope.passos = [
                { titulo: "Orar-ler e Oração", duracao: 5, iniciado: false, segundos: 0, tempoform: "0m00", okico: "ion-checkmark", oktitle: "Finalizar" },
                { titulo: "Louvor", duracao: 25, iniciado: false, segundos: 0, tempoform: "0m00", okico: "ion-checkmark", oktitle: "Finalizar" },
                { titulo: "Nutrivídeo", duracao: 20, iniciado: false, segundos: 0, tempoform: "0m00", okico: "ion-checkmark", oktitle: "Finalizar" },
                { titulo: "Palavra de Nutrição", duracao: 20, iniciado: false, segundos: 0, tempoform: "0m00", okico: "ion-checkmark", oktitle: "Finalizar" },
                { titulo: "Compartilhar da Palavra", duracao: 10, iniciado: false, segundos: 0, tempoform: "0m00", okico: "ion-checkmark", oktitle: "Finalizar" },
                { titulo: "Oração Final", duracao: 5, iniciado: false, segundos: 0, tempoform: "0m00", okico: "ion-checkmark", oktitle: "Finalizar" }
            ];
    
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
                
                var segnum = $scope.passos[$scope.passoatual].segundos;
                var minutos = Math.floor(segnum / 60);
                var segundos = segnum % 60;
                
                if (segundos < 10) segundos = "0" + segundos;
                
                $scope.passos[$scope.passoatual].tempoform = minutos + "m" + segundos;
                
                temporizador = $timeout($scope.onTimeout, 1000);
            };
    
            $scope.iniciarTemporizador = function() {
                temporizador = $timeout($scope.onTimeout, 1000);
            };
    
            $scope.finalizarTemporizador = function() {
                $timeout.cancel(temporizador);
            };
        });