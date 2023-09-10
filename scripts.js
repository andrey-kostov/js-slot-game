const icons = [
    '<span class="material-symbols-outlined">lunch_dining</span>',
    '<span class="material-symbols-outlined">spa</span>',
    '<span class="material-symbols-outlined">sports_bar</span>',
    '<span class="material-symbols-outlined">golf_course</span>',
    '<span class="material-symbols-outlined">airplane_ticket</span>',
    '<span class="material-symbols-outlined">bakery_dining</span>',
    '<span class="material-symbols-outlined">beach_access</span>',
    '<span class="material-symbols-outlined">settings</span>',
    '<span class="material-symbols-outlined">star</span>',
    '<span class="material-symbols-outlined">bolt</span>',
    '<span class="material-symbols-outlined">terminal</span>',
    '<span class="material-symbols-outlined">token</span>',
    '<span class="material-symbols-outlined">cycle</span>',
    '<span class="material-symbols-outlined">festival</span>'
];

let playerName = '';
let playerColumns = 6;
let playerRows = 3;

function newGameStart (){
    playerName = document.getElementById('playerNameInput').value;
    // playerColumns = document.getElementById('playerColumnsInput').value;
    // playerRows = document.getElementById('playerRowsInput').value;

    document.getElementById('helloWrapper').innerHTML = 'Hello, '+playerName+'! You will play with '+playerColumns+' columns and '+playerRows+' rows.<br> Have fun and good luck!';
    document.getElementById('newGameWelcome').style.display = 'none';
    document.getElementById('newGameWrapper').style.display = 'block';

    newPlayerClose.click();
}

function roll(){
    let iconOrder = 0;
    let credits = document.getElementById('credits').innerHTML;
    let betSize = document.getElementById('betSize').innerHTML;
    const elementsToPick = [];
    const elementsToDisplay =[];
    let creditsClear = Number(credits) - Number(betSize)

    //load and prepare the slot elements

    icons.forEach((icon) => {

        let iconName = icon.substring(
            icon.indexOf('">') + 2, 
            icon.lastIndexOf('</')
        );

        let iconMultiplier = iconOrder + 1;
        let slotElement = new SlotElement(iconName, 'icon'+iconOrder, icon, iconMultiplier);  
        let elementToPick = '<div class="slotElement '+slotElement['id']+' '+iconName+'" data-multiplier='+slotElement['multiplier']+' data-name='+slotElement['name']+'>'+slotElement['icon']+'</div>';
        
        elementsToPick.push(elementToPick);
        
        iconOrder++;
    });

    //prototype the randomazing function

    Array.prototype.random = function () {
        return this[Math.floor((Math.random()*this.length))];
    }

    //pick elements to display based on the number of columns

    
    for (let iterationOne = 0; iterationOne < playerRows; iterationOne++ ){
        
        let slotRow = []; 

        for (let iterationTwo = 0; iterationTwo < playerColumns; iterationTwo++) {
            let elementToDisplay = elementsToPick.random();
            slotRow.push(elementToDisplay);
        };

        let slotRowDisplay = '<div class="slotRow">'+slotRow.join('')+'</div>';
        elementsToDisplay.push(slotRowDisplay);
    }

    //display the picked elements

    document.getElementById('slotsWrapper').innerHTML = elementsToDisplay.join('');

    //get array with used elements

    let usedElementsCollection = document.getElementsByClassName("slotElement");

    const usedElements = Array.from(usedElementsCollection); //ECMAScript 2015 Solution
    const uniqueUsedElements = [];
    const rollResults = [];
    
    usedElements.forEach((usedElement)=>{
        //get element name and add it to array (check if it is already in that array)
        let usedElementName = usedElement.dataset.name;
        if (uniqueUsedElements.includes(usedElementName) == false){
            uniqueUsedElements.push(usedElementName);
        }
    });
    
    //check how many times each element is displayed
    
    const timesUsed = [];
    let timesUsedMax = '';

    uniqueUsedElements.forEach((element)=>{

        let timesElementUsed = 0;
        let elementUsedMulti = '';
        let elementResult = '';

        usedElements.forEach((usedElement)=>{
            if(usedElement.dataset.name == element){
                timesElementUsed++;
            }
            elementUsedMulti = usedElement.dataset.multiplier;
        });

        elementResult = new usedElementTimes(element, timesElementUsed,elementUsedMulti);
        rollResults.push(elementResult);
        timesUsed.push(timesElementUsed);
        
    });

    //find highest repeating number and find the coresponding element
    
    timesUsedMax = Math.max.apply(Math,timesUsed);

    if(timesUsedMax > 4){
        const winninngElements = [];

        rollResults.forEach((reslut)=>{
            if(reslut['times'] == timesUsedMax){
                winninngElements.push(reslut);
            }
        });

        //give winning class to each winning element

        winninngElements.forEach((win) => {
            console.log(win);
            const winners = document.querySelectorAll('[data-name="'+win['name']+'"]');
            winners.forEach((w) =>{
                w.classList.add("winners");
            });

            let currentCredits = document.getElementById('credits').innerHTML;
            winSize = betSize * win['multiplier'];
            document.getElementById('credits').innerHTML = Number(currentCredits) + Number(winSize);
        });
    } else{
        if(creditsClear < 1){
            alert('Game Over!');
            document.getElementById('credits').innerHTML = 0;
        }else{
            document.getElementById('credits').innerHTML = creditsClear;
        }
    }


}

function decreaseBet(){
    let betSize = document.getElementById('betSize').innerHTML;
    if(betSize < 1){
        Number(betSize) = 0;
    } else {
        betSize = Number(betSize) - 10;
    }
    document.getElementById('betSize').innerHTML = betSize;
}

function increaseBet(){
    let credits = document.getElementById('credits').innerHTML;
    let betSize = document.getElementById('betSize').innerHTML;
    if(betSize < Number(credits)){
        betSize = Number(betSize) + 10;
    }
    document.getElementById('betSize').innerHTML = betSize;
}


let newPlayerSave = document.getElementById('newPlayerSave');
let newPlayerClose = document.getElementById('newPlayerClose');
let newRoll = document.getElementById('rollBtn');

newPlayerSave.onclick = newGameStart;
newRoll.onclick = roll;