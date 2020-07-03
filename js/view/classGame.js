class Game{
    constructor(){
        this.mainScreen = document.querySelector('.content-main');
        this.dataForm = document.querySelectorAll(".content-main input[type='text'], .content-main select");
        this.user;
        this.questions = [];
        this.dealer;
        this.control = 0;
        this.level = 0;
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
                this.user = new User(capitalizeFirstWord(this.dataForm[0].value), this.dataForm[1].value);
                this.dealer = new Dealer();
                this.dealer.prepareQuestions(listQuestionsEasy, this.questions);
                setTimeout(()=>{
                    this.removeLoadingScreen();
                    setTimeout(()=>{
                        this.createQuestion(this.questions[this.control], 0 , this.user.money);
                    }, 2000);   
                }, 3000)
            break;
        }
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
    counterMoney(value, color = ''){
        let span = document.createElement('span');
        span.setAttribute('class', `qtdLevelQuestion${color}`);
        let ex = Number(value);
        span.innerHTML = ex.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        return span;
    }

    createButton(value, innerContent, classe = null, doSomething = () => {}){
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
                let button = this.createButton(option, option,null,() => {this.takeAnwser(option, divQuestion)});
                divPossibleAnwsers.appendChild(button);
            } else if(question.correctAnwser){
                let button = this.createButton(option, option,null,()=>{this.takeAnwser(-1, divQuestion)});
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

    stopNow(){
        alert('oi');
    }
    takeAnwser(value, element){
        switch(value){
            case -1:
                this.user.money = Number(this.user.correctA)*500;
                this.displayFinalScreen();
            break;
            case this.questions[this.control].correctAnwser:
                switch(this.level){
                    case 0:
                        this.user.money = Number(this.user.money) + Number(this.questions[this.control].level);
                        this.user.correctA = this.user.correctA + 1;
                        this.control++;
                        document.querySelector('.qtdLevelQuestion').innerHTML = '';
                        document.querySelector('.qtdLevelQuestionred').innerHTML = '';
                        document.querySelector('.qtdLevelQuestiongreen').innerHTML = '';
                        if(this.control <=4){
                            console.log(this.questions[this.control]);
                            this.createQuestion(this.questions[this.control], eval(this.user.correctA*500), this.user.money);
                        } else if (this.control > 4){
                            this.questions = [];
                            this.control = 0;
                            this.level++;
                            this.dealer.prepareQuestions(listQuestionsMedium, this.questions);
                            this.createQuestion(this.questions[this.control], eval(this.user.correctA*500), this.user.money);
                            console.log('>4>0',this.questions[this.control]);
                        }
                        break;
                    case 1:
                        this.user.money = Number(this.user.money) + Number(this.questions[this.control].level);
                        this.user.correctA = this.user.correctA + 1;
                        this.control++;
                        document.querySelector('.qtdLevelQuestion').innerHTML = '';
                        document.querySelector('.qtdLevelQuestionred').innerHTML = '';
                        document.querySelector('.qtdLevelQuestiongreen').innerHTML = '';
                        if(this.control <= 4){
                            this.createQuestion(this.questions[this.control], eval(this.user.correctA*500), this.user.money);
                        } else if (this.control > 4){
                            this.questions = [];
                            this.control = 0;
                            this.level++;
                            this.dealer.prepareQuestions(listQuestionsHard, this.questions);
                            this.createQuestion(this.questions[this.control], eval(this.user.correctA*500), this.user.money);
                        }
                        break;
                    case 2:
                        this.user.money = Number(this.user.money) + Number(this.questions[this.control].level);
                        this.user.correctA = this.user.correctA + 1;
                        this.control++;
                        document.querySelector('.qtdLevelQuestion').innerHTML = '';
                        document.querySelector('.qtdLevelQuestionred').innerHTML = '';
                        document.querySelector('.qtdLevelQuestiongreen').innerHTML = '';
                        if(this.control <= 4){
                            this.createQuestion(this.questions[this.control], eval(this.user.correctA*500), this.user.money);
                        } else if (this.control > 4){
                            this.questions = [];
                            this.control = 0;
                            this.level++;
                            this.dealer.prepareLastQuestion(this.questions);
                            this.createQuestion(this.questions[this.control], 0, this.user.money)
                        }
                        break;
                    case 3:
                        alert('entrou!');
                        break;
                }
               break;
        }
    }
}