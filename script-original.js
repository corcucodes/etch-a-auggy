//functions
var randomRGBgenerator = function() { return Math.floor(Math.random()*256) }; //generates random number from 1 to 255

function colorswitch(i)  {                                                    //switch eventlisteners based on selectionbox
    
    var clone = container.cloneNode(true);
    document.body.replaceChild(clone, container)
    container = clone

    var boxes = document.querySelectorAll('.box')
    
    switch(i) {
        case 0:                
            boxes.forEach( item => { item.addEventListener('mouseenter', () => whiteToBlack(item))  
         });
            break;
        case 1:    
            boxes.forEach( item => { item.addEventListener('mouseenter', () => randomColor(item));
            });
            break;
        case 2:                  
            boxes.forEach( item => { item.addEventListener('mouseenter', () => gradualDarknessWB(item)
            )});
            break;
        case 3:
            boxes.forEach( item => { item.addEventListener('mouseenter', () => 
                gradualDarkeningFirst(item),
                 {once: true} );                 
            });
            boxes.forEach( item => { item.addEventListener('mouseenter', () => gradualDarkeningColor(item));                 
            });
            break;
    };
    colorBox.addEventListener('change', ()=> {
        var colorOption = colorBox.selectedIndex;
        colorswitch(colorOption)});
    thebutton.addEventListener('click', redrawGrid);     
};

function whiteToBlack(item) {if (colorBox.selectedIndex == 0) {item.setAttribute('style', 'background-color: black;')}}; //change square color to black

function randomColor(item) {if (colorBox.selectedIndex == 1) {                          //change square color to random
    item.setAttribute('style', 'background-color: rgb('+randomRGBgenerator()+
    ', '+randomRGBgenerator()+', '+randomRGBgenerator()+')')}};

function gradualDarknessWB(item) {if (colorBox.selectedIndex == 2) {                    // change square color to black but with increasing opacity, starting from 0.1
    var itemOpacity = parseFloat(getComputedStyle(item).getPropertyValue("opacity"))
    
    if (item.style.opacity == '' || item.style.backgroundColor !== "black" || item.getAttribute('style').includes('opacity')===false ) 
     {
      item.style.opacity = '0.1';
      item.style.backgroundColor = 'black';}
    else { 
        itemOpacity = Math.min(itemOpacity + 0.1, 1.0)
        item.style.opacity = itemOpacity.toString()}        
}};

function gradualDarkeningFirst(item) {if (colorBox.selectedIndex == 3) {                // change background color to random RGB color
    item.setAttribute('style', 'background-color: rgb('+randomRGBgenerator()+
    ', '+randomRGBgenerator()+', '+randomRGBgenerator()+')');
    item.style.opacity = '0.0';
}}

function gradualDarkeningColor(item) {if (colorBox.selectedIndex == 3) {
    item.style.opacity = Math.min(parseFloat(item.style.opacity)+0.1, 1.0).toString();  //increase opacity regardless of color
}}

var redrawGrid = function () {

    var customWidth = prompt("How many columns (max.100)?", 16);
    
    while (isNaN(customWidth*1)) {
        customWidth = prompt("Type a number! How many columns (max.100)?", 16);
    };
    
    var customLength = prompt("How many rows (max.100)?", 16);
    
    while (isNaN(customLength*1)) {
        customLength = prompt("Type a number! How many rows (max.100)?", 16);
    };

    var customElements = customLength*customWidth
    
    var oldBoxes = document.querySelector('.container');
    while (oldBoxes.firstChild) {oldBoxes.removeChild(oldBoxes.lastChild)};
    
    var pxWidth = Math.max(640/customWidth, 6.4);
    var pxLength = Math.max(640/customLength, 6.4);
    var pxSize = Math.min(pxWidth, pxLength);

    var gridStyle = document.querySelector('.container');
    gridStyle.style.setProperty('grid-template-columns', 'repeat(' + customWidth + ', '+ pxSize + 'px');
    gridStyle.style.setProperty('grid-template-rows', 'repeat(' + customLength + ', '+ pxSize + 'px');
    
    
    for (i = 0; i<customElements; i++ ) {
        var gridbox = document.createElement('div');
    gridbox.classList.add('box');
    container.appendChild(gridbox);
    };

    var colorOption = colorBox.selectedIndex;
    colorswitch(colorOption);       
   
}; 

//initial grid drawing
var container = document.querySelector('.container');
var width = 16;
var length = 16;


var elements = length*width;
for (i = 0; i<elements; i++ ) {
    var gridbox = document.createElement('div');
    gridbox.classList.add('box');
    container.appendChild(gridbox);
};
var boxes = document.querySelectorAll('.box')
boxes.forEach( item => { item.addEventListener('mouseenter', () => whiteToBlack(item))});

//Redraw the grid button
const resetbutton = document.createElement('button')
resetbutton.innerHTML = "Redraw the grid!";
resetbutton.setAttribute('style', 'margin-bottom: 25px;')
resetbutton.setAttribute('id', 'resetbutton');
document.body.prepend(resetbutton);

const thebutton = document.querySelector('#resetbutton')
thebutton.addEventListener('click', redrawGrid);

//Coloring type selector
const coloringSelection = document.createElement('select')
coloringSelection.setAttribute('id', 'selectionbox')
coloringSelection.style.marginBottom = '80px'
coloringSelection.style.marginLeft = '20px'

const firstOption = document.createElement('option')
firstOption.setAttribute('value', '1')
firstOption.innerHTML = "All To Black!"
coloringSelection.appendChild(firstOption);

const secondOption = document.createElement('option')
secondOption.setAttribute('value', '2')
secondOption.innerHTML = "Random Colors!"
coloringSelection.appendChild(secondOption);

const thirdOption = document.createElement('option')
thirdOption.setAttribute('value', '3')
thirdOption.innerHTML = "Gradually Darkening!"
coloringSelection.appendChild(thirdOption);

const fourthOption = document.createElement('option')
fourthOption.setAttribute('value', '4')
fourthOption.innerHTML = "Gradually Darkening Random Colors!"
coloringSelection.appendChild(fourthOption);      

document.body.insertBefore(coloringSelection, document.body.childNodes[1]);
 
const colorBox = document.querySelector('#selectionbox');
colorBox.addEventListener('change', ()=> {
    var colorOption = colorBox.selectedIndex;
    colorswitch(colorOption)      
});

