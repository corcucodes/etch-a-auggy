

//initial grid drawing
var container = document.querySelector('.container');
var width = 16;
var length = 16;


var elements = length*width;
for (i = 0; i < elements; i++ ) {
    var gridbox = document.createElement('div');
    gridbox.classList.add('box'); // "box" is the style name
    container.appendChild(gridbox);
};

var boxes = document.querySelectorAll('.box')

boxes.forEach( item => { item.addEventListener('mouseenter', () => whiteToBlack(item)) });


function whiteToBlack(item) {
     item.setAttribute('style', 'background-color: black;')
}; //change square color to black


// boxes.forEach( item => { item.addEventListener('mouseenter', () => whiteToBlack(item))});








