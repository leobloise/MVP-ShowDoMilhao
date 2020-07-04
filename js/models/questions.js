listQuestionsEasy = [{body: 'Qual fruto é conhecido no Norte e Nordeste como "jerimum"?', 
                possibleAnwsers: ['Caju', 'Abóbora', 'Chuchu', 'Côco'], correctAnwser: 'Abóbora', level: '1000'},
                {body: 'Qual o coletivo de cães?', 
                possibleAnwsers: ['Matilha', 'Rebanho', 'Alcateia', 'Manada'], correctAnwser: 'Matilha', level: '1000'},
                {body: 'Qual triângulo tem todos os lados diferentes?', 
                possibleAnwsers: ['Equilátero', 'Isóceles', 'Escaleno', 'Trapézio'], correctAnwser: 'Escaleno', level: '1000'},
                {body: 'Quem compôs o hino da independência?',
                possibleAnwsers: ['Dom Pedro I', 'Manuel Bandeira', 'Castro Alvez', 'Carlos Gomes'], correctAnwser: 'Dom Pedro I', level: '1000'},
                {body: 'Qual foi o último presidente do período da ditadura militar no Brasil?', 
                possibleAnwsers: ['Costa e Silva', 'João Figueiredo', 'Ernesto Geisel', 'Emílio Médici'], correctAnwser: 'João Figueiredo', level: '1000'}];

listQuestionsMedium = [{body: 'Seguindo a sequência do baralho, qual carta vem depois do dez?', 
                possibleAnwsers: ['Rei', 'Valete', 'Nove', 'Ás'], correctAnwser: 'Valete', level: '10000'},
                {body: 'O adjetivo venoso está relacionado a:', 
                possibleAnwsers: ['Vela', 'Vento', 'Vênia', 'Veia'], correctAnwser: 'Veia', level: '10000'},
                {body: 'Qual o nome da purificação por meio da água?', 
                possibleAnwsers: ['Abolição', 'Abnegação', 'Ablução', 'Abrupção'], correctAnwser: 'Ablução', level: '10000'},
                {body: 'Qual montanha se localiza na fronteira entre o Tibet e o Nepal?',
                possibleAnwsers: ['Mont Everest', 'Monte Carlo', 'Monte Fuji', 'Monte Branco'], correctAnwser: 'Mont Everest', level: '10000'},
                {body: 'Qual parte do corpo se encontra a epiglote?', 
                possibleAnwsers: ['Estômago', 'Pâncreas', 'Rim', 'Boca'], correctAnwser: 'Boca', level: '10000'}];

listQuestionsHard = [{body: 'A compensação por perda é chamada de...', 
                possibleAnwsers: ['Déficit', 'Indenização', 'Indexação', 'Indébito'], correctAnwser: 'Indenização', level: '100000'},
                {body: 'Qual bicho transmite a doença de chagas?', 
                possibleAnwsers: ['Abelha', 'Barata', 'Pulga', 'Barbeiro'], correctAnwser: 'Barbeiro', level: '100000'},
                {body: 'Qual o antônimo de "malograr"?', 
                possibleAnwsers: ['Perder', 'Fracassar', 'Conseguir', 'Desprezar'], correctAnwser: 'Conseguir', level: '100000'},
                {body: 'Em que país nasceu Carmem Miranda?',
                possibleAnwsers: ['Brasil', 'Espanha', 'Portugal', 'Argentina'], correctAnwser: 'Portugal', level: '100000'},
                {body: 'Em que dia nasceu e em que dia foi registrado o Presidente Lula?', 
                possibleAnwsers: ['6 e 27 de outubro', '8 e 27 de outubro', '9 e 26 de outubro', '7 e 23 de outubro'], correctAnwser: '6 e 27 de outubro', level: '100000'}];               

lastQuestion1M = [{body: 'Quantos anos o criador desse jogo possui?', 
possibleAnwsers: ['18', '34', '76', '20'], correctAnwser: '20', level: '1000000'}];

listQuestionsEasy.forEach((element,index) => {
    element.id = index
   
});

listQuestionsMedium.forEach((element,index) => {
    element.id = index + listQuestionsEasy.length;
   
});

listQuestionsHard.forEach((element,index) => {
    element.id = index + (listQuestionsMedium.length+listQuestionsEasy.length);
   
});


