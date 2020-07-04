class Dealer{
    constructor(){
        this.helpControl = 0;
        this.helpRound;
    }
    prepareQuestions(listQuestion, arrayGameQuestion){
        let arrayHelperGame = [];
        let secondArrayHelperList = [];
            listQuestion.forEach( Element =>{
                secondArrayHelperList.push(Element.id);
                
            })
        for(let i = 0; i < 5; i++){
            let helper = getRndInteger(0,listQuestion.length-1);
            if(arrayHelperGame.indexOf(secondArrayHelperList[helper]) == '-1'){
                let temporary = new Question(i,listQuestion[helper].body, listQuestion[helper].level, listQuestion[helper].possibleAnwsers, listQuestion[helper].correctAnwser);
                arrayHelperGame.push(listQuestion[helper].id);
                arrayGameQuestion.push(temporary);
            } else {
                i--;
                continue;
            }
            console.log('questões', arrayHelperGame);
        } 
    }
    prepareLastQuestion(arrayGameQuestion){
        let helper = getRndInteger(0,lastQuestion1M.length - 1 );
        arrayGameQuestion.push(new Question(0,lastQuestion1M[helper].body, lastQuestion1M[helper].level, lastQuestion1M[helper].possibleAnwsers, lastQuestion1M[helper].correctAnwser));
    }
    
    helpQuestion(currentQuestion, index){
        if(this.helpControl == 2){
            document.body.removeChild(document.querySelector('.helpButton'));   
        }
        if((this.helpControl < 3) && (index !== this.helpRound)){
            this.helpRound = index;            
            this.helpControl++;
            let possibleAnwsers = [];
            for(let i=0;i<3;i++){ 
                let helper = getRndInteger(0,3);
                if(possibleAnwsers.indexOf(currentQuestion.possibleAnwsers[helper])=='-1'){
                    possibleAnwsers.push(currentQuestion.possibleAnwsers[helper]);
                } else if(possibleAnwsers.indexOf(currentQuestion.possibleAnwsers[helper]) != '-1') {
                    i--;
                    continue;
                } 
            }
            return possibleAnwsers;
        } else {
            if(this.helpControl == 3){
                return '-2';
            }
            else if(this.helpRound == index){
                return '-3';
            }
        }
    }
}