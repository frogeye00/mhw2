/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function notSelected(quest,choice){
    for(let answer of answers){
        if(answer.dataset.questionId===quest && answer.dataset.choiceId!==choice){
            answer.classList.add('notSelected');
            const image=answer.querySelector('.checkbox');
            image.src="images/unchecked.png";
            answer.style.backgroundColor='#f4f4f4';
        }
    }

}

function onClickAnswer(event){
    const element=event.currentTarget;
    const image=element.querySelector('.checkbox');
    image.src="images/checked.png";
    element.style.backgroundColor='#cfe3ff';
    element.classList.remove('notSelected');
    const quest=element.dataset.questionId;
    const choice=element.dataset.choiceId;
    notSelected(quest,choice);
    questAnswered[quest]= choice;
    console.log(questAnswered);
    if(isTestOver()){
        showResult();
    }
}

function isTestOver(){
    let length=0;
    for(let key in questAnswered){
        length++;
    }
    console.log(length);
    if(length===questNumber){
        return true;
    }
    else 
        return false;
}

function showResult(){
    for(let answer of answers){
        answer.removeEventListener('click',onClickAnswer)
    }
    const resultEl=document.querySelector('.result');
    resultEl.classList.remove('hidden');
    const result=calcResult();
    const title=RESULTS_MAP[result].title;
    const contents=RESULTS_MAP[result].contents;
    const header=resultEl.querySelector('h2');
    header.textContent=title;
    const p=resultEl.querySelector('p');
    p.textContent=contents;
    const button=resultEl.querySelector('button');
    button.textContent='Ricomincia il quiz';
    button.addEventListener('click',onClickRestart);
}

function calcResult(){
    let result=questAnswered['one'];
    let maxresult=1;
    for(let key in questAnswered){
        let answ=0;
        for(let k in questAnswered){
            if(questAnswered[key]===questAnswered[k]){
                answ++;
            }
        }
        if(answ>maxresult){
            maxresult=answ;
            result=questAnswered[key];
        }
    }
    console.log(result+maxresult);
    return result;
}

function onClickRestart(){
    const resultEl=document.querySelector('.result');
    resultEl.classList.add('hidden');
    for(let answer of answers){
        answer.addEventListener('click',onClickAnswer);
        answer.classList.remove('notSelected');
        const image=answer.querySelector('.checkbox');
        image.src="images/unchecked.png";
        answer.style.backgroundColor='#f4f4f4';
    }
    for(let key in questAnswered){
        delete questAnswered[key];
    }
    window.scroll(0,0);
}

const questNumber=3;
const questAnswered={};

const answers=document.querySelectorAll('.choice-grid div');
for(let answer of answers){
    answer.addEventListener('click',onClickAnswer);
}