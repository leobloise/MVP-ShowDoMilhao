class Game{
    constructor(){
        this.mainScreen = document.querySelector('.content-main');
        this.dataForm = document.querySelectorAll(".content-main input[type='text'], .content-main select");
        this.user;
        this.questions = [];
        this.dealer;
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
                this.prepareQuestions(listQuestionsEasy);
                setTimeout(()=>{
                    this.removeLoadingScreen();
                }, 3000)
                    
                    // this.createQuestion(this.questions[0], 0, 0);
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

    prepareQuestions(question){
        for(let i = 0; i < 5; i++){
            let helper = Math.round((Math.random()*4));
            if(this.questions.indexOf(question[helper]) == '-1'){
                let temporary = new Question(i,question[helper].body, question[helper].level, question[helper].possibleAnwsers, question[helper].correctAnwser);
                this.questions.push(temporary);
            } else {
                i--;
                continue;
            }
        } 
    }

    counterMoney(value, color = ''){
        let span = document.createElement('span');
        span.setAttribute('class', `qtdLevelQuestion${color}`);
        console.log(span);
        let ex = Number(value);
        span.innerHTML = ex.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
        return span;
    }

    createButton(value, innerContent, classe = ''){
        let button = document.createElement('button');
        button.setAttribute('value', value);
        button.setAttribute('class', classe);
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
            let button = this.createButton(option, option)
            divPossibleAnwsers.appendChild(button);
        })
        divQuestion.appendChild(divBody);
        divQuestion.appendChild(divPossibleAnwsers);
        let divOptions = document.createElement('div');
        divOptions.setAttribute('class', 'question-show' )
        divOptions.appendChild(this.counterMoney(question.level))
        divOptions.appendChild(this.counterMoney(loss, 'red'));
        divOptions.appendChild(this.counterMoney(keep, 'green'));
        divOptions.appendChild(this.createButton(400, 'Parar agora'))
        divQuestion.appendChild(divOptions);
        this.mainScreen.innerHTML = '';
        this.mainScreen.append(divQuestion);
    }
}