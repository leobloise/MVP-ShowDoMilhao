class Dealer{
    constructor(){
    }
    prepareQuestions(listQuestion, arrayGameQuestion){
        let arrayHelperGame = [];
        let secondArrayHelperList = [];
            listQuestion.forEach( Element =>{
                secondArrayHelperList.push(Element.id);
                
            })
        for(let i = 0; i < 5; i++){
            let helper = getRndInteger(0,4);
            if(arrayHelperGame.indexOf(secondArrayHelperList[helper]) == '-1'){
                let temporary = new Question(i,listQuestion[helper].body, listQuestion[helper].level, listQuestion[helper].possibleAnwsers, listQuestion[helper].correctAnwser);
                arrayHelperGame.push(listQuestion[helper].id);
                arrayGameQuestion.push(temporary);
            } else {
                i--;
                continue;
            }
        } 
    }
    prepareLastQuestion(arrayGameQuestion){
        let helper = getRndInteger(0,lastQuestion1M.length - 1 );
        arrayGameQuestion.push(new Question(0,lastQuestion1M[helper].body, lastQuestion1M[helper].level, lastQuestion1M[helper].possibleAnwsers, lastQuestion1M[helper].correctAnwser));
    }
}