class Dealer{
    constructor(){
    }
    prepareQuestions(listQuestion, arrayGameQuestion){
        let arrayHelperGame = [];
        let secondArrayHelperList = [];
            listQuestion.forEach( Element =>{
                secondArrayHelperList.push(Element.id);
                console.log(Element.id);
            })
        for(let i = 0; i < 5; i++){
            console.log('i', i);
            let helper = getRndInteger(0,4);
            console.log('Helper', helper);
            if(arrayHelperGame.indexOf(secondArrayHelperList[helper]) == '-1'){
                let temporary = new Question(i,listQuestion[helper].body, listQuestion[helper].level, listQuestion[helper].possibleAnwsers, listQuestion[helper].correctAnwser);
                console.log('question', temporary);
                arrayHelperGame.push(listQuestion[helper].id);
                arrayGameQuestion.push(temporary);
            } else {
                i--;
                continue;
            }
            console.log(arrayHelperGame);
        } 
    }
}