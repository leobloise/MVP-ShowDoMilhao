class Game{
    constructor(){
        this.mainScreen = document.querySelector('.content-main');
        this.dataForm = document.querySelectorAll(".content-main input[type='text'], .content-main select");
        this.user;
        this.questions = [];
        this.dealer;
        this.control = 0;
        this.level = 0;
        this.themeMusic = new Audio('./music/theme.mp3');
        this.themeMusicState;
        this.upSound = new Audio('./music/up.mp3');
        this.levelUpSound = new Audio('./music/levelup.mp3');
        this.endSound = new Audio('./music/end-music.mp3');
        this.initialize();
    }
    initialize(){
        this.startGame();
    }
    startGame(){
        let errors = validation(this.dataForm);
        switch(errors){
            case -1:
              alert('Digite um nome válido');
              this.dataForm[0].focus();
              this.dataForm = null;
            break;
            case -2:
                alert('Selecione um estado válido');
                this.dataForm[1].focus();
                this.dataForm = null;
            break;
            case 1:
                this.loadingScreen();
                this.endSound.volume = 0.3;
                this.themeMusic.volume = 0.1;
                this.themeMusicState = true;
                this.upSound.volume = 0.3;
                this.levelUpSound.volume = 0.3;
                setInterval(()=>{this.themeMusic.play();}, this.themeMusic.duration);
                this.createSoundElement();
                this.user = new User(capitalizeFirstWord(this.dataForm[0].value), this.dataForm[1].value);
                this.dealer = new Dealer();
                this.dealer.prepareQuestions(listQuestionsEasy, this.questions);
                this.transition(()=>{this.createQuestion(this.questions[this.control], 0 , this.user.money)});
                this.createButtonHelp(4000);
                break;
        }
    }
    createSoundElement(){
        let img = document.createElement('img');
                img.setAttribute("src", "./img/audioSoundMuted.png");
                img.setAttribute('id', 'mutedSpeaker');
                img.addEventListener('click', e =>{
                    if(this.themeMusicState == true){
                    img.src = './img/audioSound.png';
                    this.themeMusic.volume = 0;
                    this.themeMusicState = false;
                    } else {
                        img.src = './img/audioSoundMuted.png';
                        this.themeMusicState = true;
                        this.themeMusic.volume = 0.3;
                    }
                });
                document.body.appendChild(img);
    }
    loadingScreen(){
        this.mainScreen.classList.add('opacity_zero');
        setTimeout(()=>{
        this.mainScreen.classList.remove('opacity_zero');
        this.mainScreen.innerHTML = '<img src = "./img/cuteLoading.gif">'
        }, 1000);
    }

    removeLoadingScreen(){
        this.mainScreen.classList.add('opacity_zero');
        setTimeout(()=>{ 
            this.mainScreen.classList.remove('opacity_zero');
            this.mainScreen.innerHTML = '';
        }, 2000);
    }   
    get getUser(){
        return this.user;
    }
    createButtonHelp(time = 0){
        setTimeout(()=>{
            let button = this.createButton('', 'Opinião do Público', 'helpButton', ()=>{this.helpQuestion()});
            document.body.appendChild(button);
        }, time);
    }
    removeButtonHelp(){
        document.body.removeChild(document.querySelector('.helpButton'));
    }
    counterMoney(value, color = ''){
        let span = document.createElement('span');
        span.setAttribute('class', `qtdLevelQuestion${color}`);
        let ex = Number(value);
        span.innerHTML = ex.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        return span;
    }

    createButton(value = '', innerContent, classe = null, doSomething = () => {}){
        let button = document.createElement('button');
        button.setAttribute('value', value);
        button.setAttribute('class', classe);
        button.addEventListener('click', doSomething);
        button.innerHTML = innerContent;
        return button;
    }

    createQuestion(question, loss, keep){
        let divQuestion = document.createElement('div');
        divQuestion.setAttribute('class', 'question');
        let divBody = document.createElement('div');
        divBody.setAttribute('class', 'question-body');
        divBody.innerHTML = `<h1>${question.body}</h1>`; 
        let divPossibleAnwsers = document.createElement('div');
        divPossibleAnwsers.setAttribute('class', 'question-opt');
        question.possibleAnwsers.forEach(option =>{
            if(question.correctAnwser == option){
                let button = this.createButton(option, option,null,() => {this.takeAnwser(option)});
                divPossibleAnwsers.appendChild(button);
            } else if(question.correctAnwser){
                let button = this.createButton(option, option,null,()=>{this.takeAnwser(-1)});
                divPossibleAnwsers.appendChild(button);
            }
        })
        divQuestion.appendChild(divBody);
        divQuestion.appendChild(divPossibleAnwsers);
        let divOptions = document.createElement('div');
        divOptions.setAttribute('class', 'question-show' );
        divOptions.appendChild(this.counterMoney(question.level));
        divOptions.appendChild(this.counterMoney(loss, 'red'));
        divOptions.appendChild(this.counterMoney(keep, 'green'));
        divOptions.appendChild(this.createButton(0, 'Parar agora', null, ()=>{this.stopNow();}));
        divQuestion.appendChild(divOptions);
        this.mainScreen.innerHTML = '';
        this.mainScreen.append(divQuestion);
    }
    transition(doSomething){
        this.loadingScreen();
        setTimeout(()=>{
            this.removeLoadingScreen();
            setTimeout(()=>{
                 doSomething();
            }, 2000);
        }, 2000)
    }
    stopNow(){
        this.removeButtonHelp();
        this.transition(()=>{this.displayFinalScreen('Melhor um pássaro na mão do que dois voando, né?',1)});
    }
    takeAnwser(value){
        switch(value){
            case -1:
                this.themeMusic.volume = 0;
                this.endSound.play();
                this.removeButtonHelp();
                this.transition(()=>{this.displayFinalScreen('Você perdeu!', 2, this.user.money)});
            break;
            case this.questions[this.control].correctAnwser:
                switch(this.level){
                    case 0:
                        this.user.money = Number(this.user.money) + Number(this.questions[this.control].level);
                        this.user.correctA = this.user.correctA + 1;
                        this.control++;
                        if(this.control <=4){
                            this.upSound.play();
                            this.removeButtonHelp();
                            this.transition(()=>{this.createButtonHelp();this.createQuestion(this.questions[this.control], eval(this.user.correctA*500), this.user.money);});
                        } else if (this.control > 4){
                            this.questions = [];
                            this.control = 0;
                            this.levelUpSound.play();
                            this.level++;
                            this.dealer.prepareQuestions(listQuestionsMedium, this.questions);
                            this.removeButtonHelp();
                            this.transition(()=>{this.createButtonHelp();this.createQuestion(this.questions[this.control], eval(this.user.correctA*500), this.user.money);});
                        }
                        break;
                    case 1:
                        this.user.money = Number(this.user.money) + Number(this.questions[this.control].level);
                        this.user.correctA = this.user.correctA + 1;
                        this.control++;
                        if(this.control <= 4){
                            this.upSound.play();
                            this.removeButtonHelp();
                            this.transition(()=>{this.createButtonHelp();this.createQuestion(this.questions[this.control], eval(this.user.correctA*500), this.user.money);});
                        } else if (this.control > 4){
                            this.questions = [];
                            this.control = 0;
                            this.levelUpSound.play();
                            this.level++;
                            this.dealer.prepareQuestions(listQuestionsHard, this.questions);
                            this.removeButtonHelp();
                            this.transition(()=>{this.createButtonHelp();this.createQuestion(this.questions[this.control], eval(this.user.correctA*500), this.user.money);});
                        }
                        break;
                    case 2:
                        this.user.money = Number(this.user.money) + Number(this.questions[this.control].level);
                        this.user.correctA = this.user.correctA + 1;
                        this.control++;
                        if(this.control <= 4){
                            this.upSound.play();
                            this.removeButtonHelp();
                            this.transition(()=>{this.createButtonHelp(); this.createQuestion(this.questions[this.control], eval(this.user.correctA*500), this.user.money);});
                        } else if (this.control > 4){
                            this.questions = [];
                            this.control = 0;
                            this.level++;
                            this.dealer.prepareLastQuestion(this.questions);
                            this.removeButtonHelp();
                            this.transition(()=>{this.createQuestion(this.questions[this.control], 0, this.user.money)});
                        }
                        break;
                    case 3:
                        this.user.money = 1000000;
                        this.transition(()=>{this.displayFinalScreen(`${this.user.city} possui mais um MILIONÁRIO!`, 0)});
                        break;
                }
               break;
        }
    }
    
    displayFinalScreen(text, situation = 2, before = ''){
        this.mainScreen.innerHTML = '';
        let div = document.createElement('div');
        let headerDiv = document.createElement('div');
        div.setAttribute('class', 'finalscreen');
        headerDiv.setAttribute('class', 'finalscreen-header');
        let contentDiv = document.createElement('div');
        contentDiv.setAttribute('class', 'finalscreem-content');
        let h1 = document.createElement('h1');
        h1.innerText = text;
        switch(situation){
            case 0:
                h1.classList.add('keep')
                headerDiv.appendChild(h1);
                let wonSpan = this.counterMoney(this.user.money, 'wonMoney');
                let wonP = document.createElement('p');
                wonP.innerText = `Meus parabéns!!! ${this.user.name.split(' ')[0]} e ${this.user.city}. A partir de hoje você é um milionário! Use o seu dinheiro com sabedoria!`;
                contentDiv.appendChild(wonSpan);
                contentDiv.appendChild(wonP);
                div.appendChild(headerDiv);
                div.appendChild(contentDiv);
                this.mainScreen.appendChild(div);
                break;
            case 1:
                h1.classList.add('keep');
                headerDiv.appendChild(h1);
                let keepSpan = this.counterMoney(this.user.money, 'afterMoney');
                let keepP = document.createElement('p');
                keepP.innerText = ' Essa é a quantidade de $$ que você acumulou! Boa sorte e sucesso!';
                contentDiv.appendChild(keepSpan);
                contentDiv.appendChild(keepP)
                div.appendChild(headerDiv);
                div.appendChild(contentDiv);
                this.mainScreen.appendChild(div);
                break;
            case 2:
                headerDiv.appendChild(h1);
                this.user.money = Number(this.user.correctA)*500;
                let loseSpan = this.counterMoney(this.user.money, 'afterMoney') //depois de perde.
                let p = document.createElement('p');
                p.innerText = 'Essa é a quantidade de $$ que você ganhou! Quem sabe numa próxima, né?';
                contentDiv.appendChild(loseSpan);
                contentDiv.appendChild(p)
                div.appendChild(headerDiv);
                div.appendChild(contentDiv);
                this.mainScreen.appendChild(div);
                break;
        }
    }
    helpQuestion(){
       let cards = this.dealer.helpQuestion(this.questions[this.control], this.control);
       switch(cards){
           case '-2':
               alert('Você não pode mais pedir ajuda!');
               break;
           case '-3':
                alert('Você não pode mais pedir ajuda nesse round!');
                break;
            default:
                cards[0] = 'Jurados: ' + cards[0];
                cards[1] = 'Plateia: ' + cards[1];
                cards[2] = 'Universitários: ' + cards[2];
                let stringCard = cards.join(' ; ');
                alert(stringCard);
                break;
       }
    }
}