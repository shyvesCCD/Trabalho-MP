var jogo = {
    winner: -1,
    historicoVitorias: [-1,-1,-1],
    round: 1,
    jogadaCartaBot:[-1,-1,-1],
    memTruco: 1,
    game: function(card){
        document.getElementById('truco').style = 'opacity: 2;';
        document.getElementById('truco').setAttribute('onclick','jogo.truco(1);');

        if(this.jogadaCartaBot[2] == 0){
            this.centro(card, jogada, 0);
            this.maisForca(players.maoJogador[card], this.jogadaCartaBot[2], card, jogada);
        }
        else{
            var jogada = iaBOT.ativarBOT();
            this.centro(card,jogada,0);
            this.maisForca(players.maoJogador[card], players.maoBOT[jogada], card, jogada);
        }
    },
    centro: function(card, jogada, testeRodada){
        if(testeRodada == 1 || testeRodada == 0){
            players.emjogo[0] = players.maoJogador[card];
            players.emjogo[2] = players.emjogo[1];
            players.emjogo[1] = players.emjogo[0];
            players.comprarMaos();
        }
        if(testeRodada == 2 || testeRodada == 0){ 
            players.emjogo[2] = players.emjogo[1];
            players.emjogo[1] = players.emjogo[0];
            players.emjogo[0] = players.maoBOT[jogada];
            players.comprarMaos();
        }

    },
    forca: function(valor){
        var endgame;
        if(valor > 0 && valor < 5){ 
            endgame = 1;
        }
        else if(valor < 9){ 
            endgame = 2;
        }
        else if(valor < 13){ 
            endgame = 3;
        }
        else if(valor < 17){ 
            endgame = 4;
        }
        else if(valor < 21){ 
            endgame = 5;
        }
        else if(valor < 25){ 
            endgame = 6;
        }
        else if(valor < 29){ 
            endgame = 7;
        }
        else if(valor < 33){ 
            endgame = 8;
        }
        else if(valor < 37){ 
            endgame = 9;
        }
        else{ endgame = 10;}

        return endgame;
    },

    maisForca: function(cartaValue1, cartaValue2, card, ativarBOT){
        var estadoFinal1 = [-1, -1]; 
        var estadoFinal2 = [-1, -1];
        var winner = -1;

        estadoFinal1[0] = this.forca(cartaValue1);
        estadoFinal2[0] = this.forca(cartaValue2);
        manilhaRodada = this.forca(players.vira) + 1;
        if(manilhaRodada == 11){
            manilhaRodada = 1;
        }

        if (manilhaRodada == estadoFinal1[0] || manilhaRodada == estadoFinal2[0]) {
            if (manilhaRodada == estadoFinal1[0] && estadoFinal1[0] != estadoFinal2[0]) {
                winner = 1;}
            else if(manilhaRodada == estadoFinal2[0] && estadoFinal2[0]!=estadoFinal1[0]){ 
                winner = 0;}
            else if(estadoFinal1[0] == estadoFinal2[0]){
                estadoFinal1[1] = this.forcaSecundaria(cartaValue1);
                estadoFinal2[1] = this.forcaSecundaria(cartaValue2);

                if(estadoFinal1[1] > estadoFinal2[1]){
                    winner = 1;
                }
                else{
                    winner = 0;
                }
            }
        }
        else if(estadoFinal1[0] > estadoFinal2[0]){
            winner = 1;
        }
        else if(estadoFinal1[0] < estadoFinal2[0]){
            winner = 0;
        }
        else if(estadoFinal1[0] == estadoFinal2[0]){
            alert("EMPATE!");
            if(this.round == 1){
                for(i = 0; i < 3; i++){
                    document.getElementById('draw' + i).setAttribute('onclick','jogo.draw(' + i + ');');
                }
            }
            else{
                if(this.historicoVitorias[0] == 1){ 
                    winner = 1;
                }
                else{ 
                    winner = 0;
                }
            }
        }
        this.winner = winner;
        var testeRodada = 0;
        if(this.round == 3){
            this.win(winner, this.memTruco);
        }
        else if(this.round == 2 && winner == 1 && this.historicoVitorias[0] == 1){
            this.win(winner, this.memTruco);
        }
        else if(this.round == 2 && winner == 0 && this.historicoVitorias[0] == 0){
            this.win(winner, this.memTruco);
        }
        else{
            this.round += 1;
            players.maoJogador[card] = -1;
            players.maoBOT[ativarBOT] = -1;
            this.historicoVitorias[this.round-2] = winner;
            this.jogadaCartaBot[2] = 1;

            if(winner == 0){
                this.jogadaCartaBot[1] = round - 2;
                this.jogadaCartaBot[2] = 0;
                this.jogadaCartaBot[0] = iaBOT.ativarBOT();
                this.centro(0, this.jogadaCartaBot[0], 2);
                players.maoBOT[this.jogadaCartaBot[0]] = -1;
                players.comprarMaos();
            }
        }
        players.comprarMaos();
    },

    forcaSecundaria: function(valor){
        var resultadoTruco;
        if(valor < 5){
           resultadoTruco = valor;
        }
        else{ 
            resultadoTruco = (valor % 4) * 4 + 1;
        }
        return resultadoTruco;
    },

    draw: function(card){
        var estadoFinal1 = this.forca(players.maoJogador[card]);
        var estadoFinal2 = this.forca(players.maoBOT[iaBOT.ativarBOT()]);
        players.maoJogador[card]= -1;
        if(estadoFinal1 > estadoFinal2){
            this.winner = 1;
            this.win(1, this.memTruco);
        }
        else if(estadoFinal2 > estadoFinal1){
            this.winner = 0;
            this.win(0, memTruco);
        }
        players.comprarMaos();
    },
    win: function(vencedor, pontos){
        if(vencedor == 1){
            players.vitoriaJogador += pontos;
            alert('Você ganhou!')
        }
        else if(!vencedor){
            players.vitoriaBOT += pontos;
            alert('O BOT venceu!');
        }
        for(i = 1; i <= 3; i++){
            document.getElementById('esc' + i).style = '';
            document.getElementById('pc' + i).style = '';
            document.getElementById('draw' + (i-1)).setAttribute('onclick','jogo.game(' + (i-1) + ');');
        }
        this.winner = -1;
        this.historicoVitorias = [-1,-1,-1];
        this.round = 1;
        this.jogadaCartaBot = [-1,-1];
        this.memTruco = 1;
        players.emjogo = [-1,-1,-1];
        iniciarJogo();
    },
    truco: function(jogador){
        if(this.memTruco == 1)
            var valorTruco = (this.memTruco - 1) + 3;
        else
            var valorTruco = this.memTruco + 3;

        if(jogador == 1){
            var escolhaBOT = iaBOT.pedirTruco();
            if(escolhaBOT == 1){
                this.memTruco= valorTruco;
                document.getElementById('truco').setAttribute('onclick','');
                document.getElementById('truco').style = 'opacity: .5;';
            }
            else if(!escolhaBOT){
                this.win(1, this.memTruco);
            }
            else if(escolhaBOT == 2){
                var EscolhaJogador = confirm("Aceita o " + (valorTruco+3) + "?");
                if(EscolhaPlayer == false){
                    this.win(0, this.memTruco);
                }
            }
        }
    },
}

var players ={
    vitoriaJogador: 0,
    vitoriaBOT: 0,
    maoJogador: [-1, -1, -1],
    maoBOT: [-1, -1, -1],
    vira: -1,
    emjogo: [-1,-1,-1],
    comprarCartas: function(){
        for(i = 0; i < 3; i++){
            this.maoJogador[i] = baralho.card[i + 3];
            this.maoBOT[i] = baralho.card[i];
        }
        this.vira = baralho.card[6];
    },
    comprarMaos: function(){
        for(i = 1; i <= 3; i++){
            if(this.maoJogador[i-1] > 0){
                document.getElementById('pc' + i).innerHTML = '<img src="baralho/' + this.maoJogador[i-1] + '.png">';
            }
            else{
                document.getElementById('pc' + i).innerHTML = '';
                document.getElementById('esc' + i).style.display = 'none';
                document.getElementById('pc' + i).style = 'margin-top: 50px;';
            }
        }
        for(i = 1; i <= 3; i++){
            if(this.maoBOT[i-1] > 0){
                document.getElementById('ac' + i).innerHTML = '<img src="baralho/' + 0 + '.png">';
            }
            else{
                document.getElementById('ac' + i).innerHTML = '';
            }
        }
        document.getElementById('vira').innerHTML = '<img src="baralho/' + this.vira + '.png">';
        for(i = 1; i <= 3; i++){
            if(this.emjogo[i-1] > 0){
                document.getElementById('inPlay'+i).innerHTML = '<img src="baralho/' + this.emjogo[i-1] + '.png">';
            }
            else{
                document.getElementById('inPlay'+i).innerHTML = '';
            }
        }
    },

}
function iniciarJogo(){
    baralho.embaralhar();
    players.comprarCartas();
    players.comprarMaos();
}

var iaBOT ={
    baseBOT: function(inicio, endgame){
        var escolhaBOT;
        do{
            do{
                escolhaBOT = Math.floor(Math.random() * 10);
            }
            while(escolhaBOT < inicio  || escolhaBOT > endgame);
        }
        while(players.maoBOT[escolhaBOT] == -1);
        return escolhaBOT;
    },
    pedirTruco: function(){
        var escolhaBOT = this.baseBOT(0, 10);

        if(escolhaBOT == 0)
            escolhaBOT = 2;
        else if(escolhaBOT < 5)
            escolhaBOT = 1;
        else
            escolhaBOT = 0;
        return escolhaBOT;
    },
    ativarBOT: function(){
        var jogada = this.baseBOT(0, 2);
        return jogada;
    },
}
var baralho = {
    card: [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    embaralhar: function(){
        do{
            this.card[0] = Math.floor(Math.random() * 100);
        }
        while(this.card[0] > 40 || this.card[0] < 1);
        var testeRodada = 0;
        for(i = 1; i < 40; i++){
            while(testeRodada == 0){
                do{
                    this.card[i] = Math.floor(Math.random() * 100);
                }
                while(this.card[i] > 40 || this.card[i] < 1);
                testeRodada = 1;
                for(x = 0; x < i; x++){
                    if(this.card[i] == this.card[x]){
                        testeRodada = 0;
                    }
                }
            }
            testeRodada = 0;
        }
    }
}
iniciarJogo();