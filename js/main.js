class Quadrado {

    constructor(x, y, largura, altura, velocidadeX, velocidadeY) {

        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.velocidadeX = velocidadeX;
        this.velocidadeY = velocidadeY;
    }
    
    create (context) {

        this.x += this.velocidadeX;
        this.y += this.velocidadeY;
        context.fillStyle = "white";
        context.fillRect(this.x, this.y, this.largura, this.altura);
    }
}

class Barra {

    constructor (x, y, largura, altura, velocidade) {

        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.velocidade = velocidade;
    }

    create (context) {

        this.y += this.velocidade;
        context.fillStyle = "white";
        context.fillRect(this.x, this.y, this.largura, this.altura);
    }
}

class Texto {

    constructor(x, y, tamanho, cor, text) {

        this.x = x;
        this.y = y;
        this.tamanho = tamanho;
        this.cor = cor;
        this.text = text;
    }

    create (context) {
        context.font = this.tamanho + "px sans-serif";
        context.fillStyle = this.cor;
        context.fillText(this.text, this.x, this.y);
    }
}

let canvasHeight = window.innerHeight;
let canvasWidth = window.innerWidth;
let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");

let ganhou = false;

let player1 = new Barra((canvasWidth * 0.1), (canvasHeight * 0.4), (canvasWidth * 0.015), (canvasHeight * 0.17), 0);
let player2 = new Barra((canvasWidth * 0.9), (canvasHeight * 0.4), (canvasWidth * 0.015), (canvasHeight * 0.17), 0);

let quadrado = new Quadrado((canvasWidth * 0.5), (canvasHeight * 0.5), (canvasWidth * 0.015), (canvasHeight * 0.03), (canvasWidth * 0.005), (canvasHeight * 0.012));

let pontosPlayer1 = new Texto((canvasWidth * 0.3), (canvasHeight * 0.1), (canvasHeight * 0.07), "white", 0);
let pontosPlayer2 = new Texto((canvasWidth * 0.6), (canvasHeight * 0.1), (canvasHeight * 0.07), "white", 0);
let textoAjuda1 = new Texto((canvasWidth * 0.05), (canvasHeight * 0.1), (canvasHeight * 0.04), "white", "Pressione Q");
let textoAjuda2 = new Texto((canvasWidth * 0.85), (canvasHeight * 0.1), (canvasHeight * 0.04), "white", "Pressione 1");
let textoVitoria = new Texto((canvasWidth * 0.25), (canvasHeight * 0.45), (canvasHeight * 0.04), "white", "");

canvas.height = canvasHeight;
canvas.width = canvasWidth;

window.addEventListener('resize', function () {

    canvasHeight = window.innerHeight;
    canvasWidth = window.innerWidth;

    canvas.height = canvasHeight;
    canvas.width = canvasWidth;

    player1.x = (canvasWidth * 0.1);
    player1.y = (canvasHeight * 0.4);
    player1.largura = (canvasWidth * 0.015);
    player1.altura = (canvasHeight * 0.17);

    player2.x = (canvasWidth * 0.9);
    player2.y = (canvasHeight * 0.4);
    player2.largura = (canvasWidth * 0.015);
    player2.altura = (canvasHeight * 0.17);

    quadrado.x = (canvasWidth * 0.5);
    quadrado.y = (canvasWidth * 0.5);
    quadrado.largura = (canvasWidth * 0.015);
    quadrado.altura = (canvasHeight * 0.03);
    quadrado.velocidadeX = (canvasWidth * 0.005);
    quadrado.velocidadeY = (canvasHeight * 0.012);

    pontosPlayer1.x = (canvasWidth * 0.3);
    pontosPlayer1.y = (canvasHeight * 0.1);
    pontosPlayer1.tamanho = (canvasHeight * 0.07);

    pontosPlayer2.x = (canvasWidth * 0.6);
    pontosPlayer2.y = (canvasHeight * 0.1);
    pontosPlayer2.tamanho = (canvasHeight * 0.07);

    textoAjuda1.x = (canvasWidth * 0.05);
    textoAjuda1.y = (canvasHeight * 0.1);
    textoAjuda1.tamanho = (canvasHeight * 0.04);

    textoAjuda2.x = (canvasWidth * 0.85);
    textoAjuda2.y = (canvasHeight * 0.1);
    textoAjuda2.tamanho = (canvasHeight * 0.04);

    textoVitoria.x = (canvasWidth * 0.25);
    textoVitoria.y = (canvasHeight * 0.45);
    textoVitoria.tamanho = (canvasHeight * 0.04);

    context.fillStyle = "black";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
});

window.addEventListener("keydown", function (event) {

    if (event.key == "ArrowUp") {

        player2.velocidade = -(canvasHeight * 0.02);
    } else if (event.key == "ArrowDown") {
        
        player2.velocidade =  (canvasHeight * 0.02);
    }

    if (event.key == "w" || event.key == "W") {
        
        player1.velocidade = -(canvasHeight * 0.02);
    } else if (event.key == "s" || event.key == "S") {
        
        player1.velocidade =  (canvasHeight * 0.02);
    }

    if ((event.key == "q" || event.key == "Q")) {
        quadrado.velocidadeX += 3;
    }

    if (event.key == "1") {
        quadrado.velocidadeX -= 3;
    }

    if (event.key == "Enter" && ganhou) {
        window.location.reload();
    }
});

window.addEventListener("keyup", function (event) {

    if (event.key == "ArrowUp" || event.key == "ArrowDown") {

        player2.velocidade = 0;
    }

    if (event.key == "w" || event.key == "W" || event.key == "s" || event.key == "S") {

        player1.velocidade = 0;
    }

    if (event.key == "q" || event.key == "Q") {
        
        quadrado.velocidadeX = (canvasWidth * 0.005);
    } else if (event.key == "1") {
        quadrado.velocidadeX = -(canvasWidth * 0.005);
    } 
})

function colision () {

    //colisão quadrado contra paredes superior e inferior
    if (player1.y < 0) {

        player1.y = 0;
    } else if ((player1.y + player1.altura) > canvasHeight) {
        
        player1.y = canvasHeight - player1.altura;
    }

    if (player2.y < 0) {

        player2.y = 0;
    } else if ((player2.y + player2.altura) > canvasHeight) {

        player2.y = canvasHeight - player2.altura;
    }

    //colisão quadrado contra players
    if (
    (quadrado.y >= player1.y) 
        && 
    (quadrado.y <= (player1.y + player1.altura)) 
        && 
    (quadrado.x >= player1.x) 
        && 
    (quadrado.x <= (player1.x + player1.largura)) 
    
    ||

    ((quadrado.y + quadrado.altura) >= player2.y) 
        && 
    ((quadrado.y + quadrado.altura) <= (player2.y + player2.altura)) 
        && 
    ((quadrado.x + quadrado.largura) >= player2.x) 
        && 
    ((quadrado.x + quadrado.largura) <= (player2.x + player2.largura))) 
    
    {   

        quadrado.velocidadeX = -quadrado.velocidadeX;
    }

    //colisão quadrado contra paredes anterior e posterior
    if ((quadrado.x + quadrado.largura) >= canvasWidth) {
        
        pontosPlayer1.text++;
        quadrado.x = (canvasWidth * 0.5);
        quadrado.y = (canvasHeight * 0.5);
    }

    if (quadrado.x <= 0) {
        
        pontosPlayer2.text++;
        quadrado.x = (canvasWidth * 0.5);
        quadrado.y = (canvasHeight * 0.5);
    }

    if ((quadrado.y + quadrado.altura) > canvasHeight || (quadrado.y + quadrado.altura) < 0) {
        
        quadrado.velocidadeY = -quadrado.velocidadeY;
    }
}

function checarVitoria () {
    if (pontosPlayer1.text >= 50) {

        textoVitoria.text = "Player 1 ganhou, pressione 'enter' para reiniciar";
        ganhou = true;
    } else if (pontosPlayer2.text >= 50) {

        textoVitoria.text = "Player 2 ganhou, pressione 'Enter' para reiniciar"; 
        ganhou = true;
    }

    return textoVitoria.text;
}

function render () {

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = "black";
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    requestAnimationFrame(colision);
    requestAnimationFrame(checarVitoria);

    if (!ganhou) {
    quadrado.create(context);
    player1.create(context);
    player2.create(context);
    pontosPlayer1.create(context);
    pontosPlayer2.create(context);
    textoAjuda1.create(context);
    textoAjuda2.create(context);

    requestAnimationFrame(render);
    }
    
    textoVitoria.create(context);
}

render();
