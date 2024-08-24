var altura = 50; 
var largura = 350; 
var xmenu = 175; 
var ymenu1 = 200; 
var ymenu2 = 265;
var ymenu3 = 325;
var larguraBotaoVoltar = 95;
var alturaBotaoVoltar = 30; 
var xBotaoVoltar = 570;
var yBotaoVoltar = 450;

var som1;

// Variáveis para a tela de informações
var informacoes = {
  xBotaoVoltar: 582,
  yBotaoVoltar: 480,
  larguraBotaoVoltar: 98,
  alturaBotaoVoltar: 28
};

// Variáveis para a tela de créditos
var creditos = {
  xBotaoVoltar: 582,
  yBotaoVoltar: 480,
  larguraBotaoVoltar: 98,
  alturaBotaoVoltar: 28
};

// Variáveis para a tela do jogo
var jogo = {
  xBotaoVoltar: 582,
  yBotaoVoltar: 480,
  larguraBotaoVoltar: 98,
  alturaBotaoVoltar: 28
};

// Variáveis para a tela final
var final = {
  xBotaoVoltar: 582,
  yBotaoVoltar: 480,
  larguraBotaoVoltar: 98,
  alturaBotaoVoltar: 28
}; 

// VARIAVEIS PARA O TIME 
var tempoInicial;
var tempoTotal = 0;
var timerAtivo = false;

// Declaração de variáveis globais para imagens
var img;
var img1;
var img2;
var img3;
var imgfundo;
var cartavirada;
var imgcartafundo;
var imgcarta1;

// Declaração de variáveis para a posição inicial das cartas
var posInicialX = 20;
var posInicialY = 20;

// Declaração de vetores para armazenar cartas e valores
var imgcartas = [];
var matrizimgcartas = [];
var matrizcartasviradas = [];
var matrizMatch = []; 
var matrizValores = [];
var valoresCartas = [];
var matrizTamanho = 4;

var linColAnterior = [];
var indicesOriginais = [];
var indicesEnbaralhados = [];

// Contador de cliques e controle da tela
var contClicks = 0;
var tela = 0;

// tela 0: MENU
// tela 1: PLAY
// tela 2: INFORMAÇÕES
// tela 3: CRÉDITOS
// tela 4: FINAL

// Função para carregar as imagens antes do início do jogo
function preload() {
  // Carregar imagem de fundo
  img = loadImage("img3.jpg");
  // Carregar imagem do astronauta
  img1 = loadImage("astro2.png");
  // Carregar imagem das informações
  img2 = loadImage("img2.jpg");
  // Carregar imagem de créditos
  img3 = loadImage("img2.jpg");
  // Carregar carta do fundo
  imgcartafundo = loadImage("fundo.png");
  // carregar carta 1
  imgcarta1 = loadImage("1.png");

  // Carrega as imagens das cartas e seus valores correspondentes
  for (var i = 1; i <= 12; i++) {
    let tempImg = loadImage(i + ".png");
    imgcartas.push(tempImg);
    valoresCartas.push(i);
    tempImg = loadImage(i + ".1.png");
    imgcartas.push(tempImg);
    valoresCartas.push(i);
  }

  // Carregar o som
  som1 = loadSound("space-sound-hi-109577.mp3");
  som1.setLoop(true); // Configura o som para tocar em loop
}

// Função para inicializar o jogo e configurar o tabuleiro

function setup() {
  createCanvas(700, 510); 
  
// Inicia o timer  
  tempoInicial = millis(); 
  timerAtivo = true;
  
// Inicializa os índices e embaralha
  
  for (i = 0; i < 24; i++) {
  indicesOriginais[i] = i;
}
  indicesEnbaralhados = embaralhar(indicesOriginais)
  
// Destribuir as cartas em linhas e colunas na matriz 
  
    cont = 0;
  for (let l = 0; l < matrizTamanho; l++) {
    let tempImgLinha = [];
    let tempvcartavirada = [];
    let tempVValor = [];
    let tempVMatch = [];
  for (let c = 0; c < 6; c++) { 
      tempImgLinha[c] = imgcartas[indicesEnbaralhados[cont]];
      tempVValor[c] = valoresCartas[indicesEnbaralhados[cont]];
      tempvcartavirada[c] = false;
      tempVMatch[c] = false;
      cont++;
    }
    matrizcartasviradas[l] = tempvcartavirada;
    matrizimgcartas[l] = tempImgLinha;
    matrizValores[l] = tempVValor;
    matrizMatch[l] = tempVMatch;
  }
    
  cartavirada = true;
   imgcartalargura = (width - 40) / 6;
   imgcartaaltura = (height - 40) / 4;
}

//PROCEDIMENTOS 

// EXIBIR TELA DE MENU
 
function telademenu(){
  
  // Exibir imagem de fundo
  background(img);
  
  // Verifica se o som está tocando, se não estiver, inicia
  if (!som1.isPlaying()) {
    som1.loop(); // Inicia o som em loop
  }

  
  // Exibir imagem do astronauta redimensionada
  image(img1, 410, 160, img1.width / 4, img1.height / 4);
  
  // Definir estilo de texto
  textStyle(NORMAL); {
    
    // Menu com as opções
    textAlign(CENTER);
    textSize(30);
    
    // Desenhar retângulo ao redor da opção "PLAY"
    if (mouseX > xmenu && mouseX < xmenu + largura && mouseY > ymenu1 && mouseY < ymenu1 + altura) {
      stroke(0);
      fill('#9C27B051');
      rect(xmenu, ymenu1, largura, altura, 30); 
    if (mouseIsPressed) {
      tela = 1;
      resetarJogo(); // Adicione esta linha para reiniciar o jogo
    }
  }
    fill('#FFFFFF');
    noStroke();
    text("PLAY", 350, 240);
    
    // Desenhar retângulo e colocar o botão de "INFORMAÇÕES"
    if (mouseX > xmenu && mouseX < xmenu + largura && mouseY > ymenu2 && mouseY < ymenu2 + altura) {
      stroke(0);
      fill('#9C27B059');
      rect(xmenu, ymenu2, largura, altura, 30); 
      if(mouseIsPressed){
        tela = 2;
      }
    }
    fill('#FFFFFF');
    noStroke();
    text("INFORMAÇÕES", 360, 300);
    
    // Desenhar retângulo ao redor da opção "CREDITOS"
    if (mouseX > xmenu && mouseX < xmenu + largura && mouseY > ymenu3 && mouseY < ymenu3 + altura) {
      stroke(0);
      fill('#9C27B059');
      rect(xmenu, ymenu3, largura, altura, 30); 
      if(mouseIsPressed){
        tela = 3;
      }
    }
    fill('#FFFFFF');
    noStroke();
    text("CRÉDITOS", 350, 360);
    
    // Nome do jogo
    textAlign(CENTER);
    textSize(50);
    textFont('cursive');
    fill('#771999');
    stroke('#F1FF00');
    text("JOGO DA MEMÓRIA", 350, 140);
  } 
}


function desenharBotaoVoltar(x, y, largura, altura, telaDestino) {
  
// Desenha o texto sobre o botão
  fill('#FFFFFF'); // Cor do texto amarela para teste
  stroke(0);
  textSize(20);
  text("Voltar", 640,500); 
  
// Verifica se o mouse está sobre o botão e se ele foi clicado
  if (mouseX > x && mouseX < x + largura && mouseY > y && mouseY < y + altura) {
    stroke(0);
    fill('#FF000055'); // Cor de fundo vermelha clara quando o mouse está sobre o botão
    rect(x, y, largura, altura, 0);
    if (mouseIsPressed) {
      if (tela === 1) { // Se estiver na tela de jogo, reinicie o jogo
        resetarJogo();
      }
      tela = telaDestino;
    }
  }
}

function teladeinformações(){
  background(img2);
  textSize(26);
  fill('#FFFFFF');
  noStroke();
  text(" INFORMAÇÕES ", 350, 70);
  stroke(0);
  fill('#5D2866');
  rect(50, 90, 600, 80);
  fill('#FFFFFF');
  noStroke();
  textSize(18);
   text("Objetivo do jogo: incentiva os jogadores a adquirir conhecimento sobre as curiosidades da galáxica, enquanto se divertem tentando encontrar todos os pares de cartas no menor tempo possível.", 50, 100, 570);
   textSize(20);
  text("Como Jogar:", 20, 180, 200);
  text("* Com auxílio do mouse clique em duas cartas para virá-las.", 20, 220, 600);
  text("* Se as cartas forem iguais, o par será removido do tabuleiro e uma curiosidade espacial sera revelada.",5 , 260, 570);
  text("* Se não forem iguais, as cartas serão viradas de volta.", 20, 320, 570);
  text ("* Memorize a posição das cartas viradas.", 40, 360, 400);
  text("* Continue até encontrar todos os pares no menor tempo possível.", 20, 400, 580);
  
desenharBotaoVoltar(informacoes.xBotaoVoltar, informacoes.yBotaoVoltar, informacoes.larguraBotaoVoltar, informacoes.alturaBotaoVoltar, 0);
}

function teladecreditos(){
  background(img3);
  textSize(36);
  fill('#FFFFFF');
  text(" CREDITOS ", 350, 70);
  //programadora
   textSize(20);
   fill('#FF00D7');
   stroke(0);
  text(" Programadora: Leticia Silva", 50, 100, 600);
   textSize(17);
   fill('#FFFFFF');
   noStroke();
  text(" Graduanda do curso de Engenharia da Compultação pala Universidade Federal do Rio Grande do norte - UFRN.", 40, 130, 600);
  
  //Docente Orivaldo
   textSize(20);
   fill('#FF00D7');
   stroke(0);
  text("Docente: Orivaldo Santana", 50, 180, 600);
   stroke(0);
      fill('#5D2866');
      rect(50, 200, 615, 95);
   textSize(14);
   fill('#FFFFFF');
   noStroke();
  text(" Doutor e mestre pelo Centro de Informática da UFPE, graduado em Ciência da Computação pela Universidade Federal da Bahia. Professor Adjunto da ECT/UFRN e do Programa de Pós-graduação em Ciência, Tecnologia e Inovação (PPgCTI). Especialista em Sistemas de Computação, com foco em Aprendizagem de Máquina, Ciência de Dados Educacionais, Robótica Educacional e Indústria 4.0.", 50, 210, 615);
  
   //Docente Marconi
   textSize(20);
   fill('#FF00D7');
   stroke(0);
  text("Docente: Marconi Rodrigues", 50, 310, 600);
   stroke(0);
      fill('#5D2866');
      rect(50, 330, 615, 120);
   textSize(14);
   fill('#FFFFFF');
   noStroke();
  text(" Graduado em Engenharia de Computação, mestre e doutor em Engenharia Elétrica pela UFRN, com pós-doutorado em inovação tecnológica no LNRB-UFRN. Professor efetivo da ECT-UFRN desde 2011, com experiência em Controle Inteligente de Sistemas e identificação de modelos. Atua como colaborador no laboratório de cronobiologia da UFRN e desenvolve pesquisas tecnológicas junto ao DCA-UFRN e LNRB-UFRN. Colabora com o Laboratório de Informática Industrial e nPITI-UFRN no projeto SAIoT.", 50, 340, 615);
  
  
// Botão de voltar PARA O MENU
  desenharBotaoVoltar(creditos.xBotaoVoltar, creditos.yBotaoVoltar, creditos.larguraBotaoVoltar, creditos.alturaBotaoVoltar, 0);
}

// EXIBIR TELA DE JOGO
function teladojogo() {
  background('#6005D5');
  
  // Iniciar o timer
  if (timerAtivo) {
      let tempoAtual = millis();
      tempoTotal = Math.floor((tempoAtual - tempoInicial) / 1000);
      textSize(20);
      fill(0);
      text("Tempo: " + tempoTotal + "s", 10, 20);
    }
  
  // Calcular o tempo decorrido
  let tempoDecorrido = millis() - tempoInicial;
  tempoTotal = Math.floor(tempoDecorrido / 1000);
  
  // Mostrar as cartas
  mostracartas();
  
  // Exibir o tempo
  exibirTempo(); 
  
  // Botão de voltar PARA O MENU
 desenharBotaoVoltar(jogo.xBotaoVoltar, jogo.yBotaoVoltar, jogo.larguraBotaoVoltar, jogo.alturaBotaoVoltar, 0 );
  
  // Checar fim de jogo
  if (checarFimDeJogo()) {
    tela = 4;
  }
}


// FUNÇÃO DE EXIBIR TEMPO 
function exibirTempo() {
  fill('#FEFFFE');
  noStroke();
  textSize(16);
  textAlign(RIGHT);
  let minutos = Math.floor(tempoTotal / 60);
  let segundos = tempoTotal % 60;
  text(`Tempo: ${minutos}m ${segundos}s`, 120, 500);
}

// EXIBIR TELA DO FINAL DO JOGO
function telafinal() {
  background(img2); // Fundo da tela final
  
  // Mensagem de vitória
  fill('#E332E691');
  rect(80, 175, 550, 30);
  textSize(20);
  textAlign(CENTER);
  textFont('default');
  fill('#FFFFFF');
  noStroke();
  text("VOCÊ ENCONTROU TODOS OS PARES DE CARTAS!", 350, 200);

  // Exibir tempo total
  fill('#5068F0A0');
  rect(260, 270, 190, 30);
  textSize(20);
  textAlign(CENTER);
  textFont('default');
  fill('#00FF32');
  text(`Tempo Total: ${Math.floor(tempoTotal / 60)}m ${tempoTotal % 60}s`, 350, 290);

  // Mensagem de instrução
  textSize(20);
  textAlign(CENTER);
  textFont('default');
  fill('#FFFFFF');
  text("Clique no botão Voltar ou pressione ESC para retornar ao menu.", 350, 250);

  // Botão de voltar PARA O MENU
  desenharBotaoVoltar(final.xBotaoVoltar, final.yBotaoVoltar, final.larguraBotaoVoltar, final.alturaBotaoVoltar, 0);
}

// MOSTRAR AS CARTAS 
function mostracartas(){
   let posY = posInicialY;
  for (let l = 0; l < matrizTamanho; l++) {
    let posX = posInicialX;
    for (let c = 0; c < 6; c++) {
      if (matrizcartasviradas[l][c]) {
        image(matrizimgcartas[l][c], posX, posY, imgcartalargura - 7, imgcartaaltura - 7);
      } else {
        image(imgcartafundo, posX, posY, imgcartalargura - 7, imgcartaaltura - 7);
      }
      posX += imgcartalargura;
    }
    posY += imgcartaaltura;
  }
}

//converter a posição do mouse em índices de linha e coluna da matriz
function converterPosMousePosMatriz(mouseX, mouseY) {
  let linha = Math.floor((mouseY - posInicialY) / imgcartaaltura);
  let coluna = Math.floor((mouseX - posInicialX) / imgcartalargura);

  // Verificar se os índices estão dentro dos limites da matriz
  if (linha >= 0 && linha < matrizTamanho && coluna >= 0 && coluna < 6) {
    return [linha, coluna];
  } else {
    return null;
  }
}

// FUNÇÃO QUE ALTERA O ESTADO DA CARTA AO CLICAR 
function mouseClicked() {
  if (tela === 1) {
    let linCol = converterPosMousePosMatriz(mouseX, mouseY);
    if (linCol && linCol.length === 2) {
      let linha = linCol[0];
      let coluna = linCol[1];
      
      if (linha >= 0 && linha < matrizTamanho && coluna >= 0 && coluna < 6) {
        if (!matrizcartasviradas[linha][coluna]) {
          matrizcartasviradas[linha][coluna] = true;
          contClicks++;
          
          if (contClicks === 2) {
            let [linhaAnterior, colunaAnterior] = linColAnterior || [];
            if (linhaAnterior !== undefined && matrizValores[linha][coluna] === matrizValores[linhaAnterior][colunaAnterior]) {
              matrizMatch[linha][coluna] = true;
              matrizMatch[linhaAnterior][colunaAnterior] = true;
            } else {
              setTimeout(() => {
                matrizcartasviradas[linha][coluna] = false;
                matrizcartasviradas[linhaAnterior][colunaAnterior] = false;
              }, 1000);
            }
            contClicks = 0; 
            linColAnterior = []; 
          } else if (contClicks === 1) {
            linColAnterior = [linha, coluna];
          }
        }
      }
    }
  }
}

// FUNÇÃO EMBARALHAR CARTAS 
function embaralhar(vetorA) {
  vetorB = [];
  qtInicialElementos = vetorA.length;
  for (j = 0; j < qtInicialElementos; j++) {
    i = parseInt(Math.random() * vetorA.length);
    vx = vetorA.splice(i, 1);
    vetorB.push(vx[0]);
  }
  return vetorB;
}

// FUNÇÃO PARA REINICIAR O JOGO

function resetarJogo() {
  // Reinicializa o timer e o tabuleiro do jogo
  tempoInicial = millis(); // Inicia o timer novamente
  tempoTotal = 0;
  timerAtivo = true;
  
  // Reembaralha as cartas
  for (i = 0; i < 24; i++) {
    indicesOriginais[i] = i;
  }
  indicesEnbaralhados = embaralhar(indicesOriginais);
  
  // Distribuir as cartas em linhas e colunas na matriz 
  cont = 0;
  for (let l = 0; l < matrizTamanho; l++) {
    let tempImgLinha = [];
    let tempvcartavirada = [];
    let tempVValor = [];
    let tempVMatch = [];
    for (let c = 0; c < 6; c++) { 
      tempImgLinha[c] = imgcartas[indicesEnbaralhados[cont]];
      tempVValor[c] = valoresCartas[indicesEnbaralhados[cont]];
      tempvcartavirada[c] = false;
      tempVMatch[c] = false;
      cont++;
    }
    matrizcartasviradas[l] = tempvcartavirada;
    matrizimgcartas[l] = tempImgLinha;
    matrizValores[l] = tempVValor;
    matrizMatch[l] = tempVMatch;
  }

  // Reinicia as variáveis do jogo
  contClicks = 0;
  linColAnterior = [];
}

// FUNÇÃO QUE CHECA SE TODAS AS CARTAS FORÃO COMBINADAS 
function checarFimDeJogo() {
  for (let l = 0; l < matrizTamanho; l++) {
    for (let c = 0; c < 6; c++) {
      if (!matrizMatch[l][c]) {
        return false;
      }
    }
  }
  return true;
}

 
function draw() {
  if (tela == 0) {
    telademenu();
  } else if (tela == 1) {
    teladojogo();
  } else if (tela == 2) {
    teladeinformações();
  } else if (tela == 3) {
    teladecreditos();
  } else if (tela == 4) {
    telafinal();
  }
}
// Comando para voltar para tela de menu usando a tecla ESC
function keyPressed() {
  if (tela === 1 || tela === 2 || tela === 3 || tela === 4) {
    if (keyCode === ESCAPE) {
      tela = 0;
    }
  }
}