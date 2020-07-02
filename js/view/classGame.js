class Game{
    constructor(){
        this.mainScreen = document.querySelector('.content-main');
        this.dataForm = document.querySelectorAll(".content-main input[type='text'], .content-main select");
        this.user;
        this.questions = [];
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
                console.log(this.questions);
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

    prepareQuestions(question){
        for(let i = 0; i < 5; i++){
            let helper = Math.round((Math.random()*5));
            if(this.questions.indexOf(question[helper]) == '-1'){
                let temporary = new Question(i,question[helper].body, question[helper].level, question[helper].possibleAnwsers, question[helper].correctAnwser);
                this.questions.push(temporary);
            } else {
                i--;
                continue;
            }
        } 
    }
}