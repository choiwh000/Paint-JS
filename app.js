const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const lineWid = document.querySelector('#jsRange');
const fill = document.querySelector('#jsMode');
const save = document.querySelector('#jsSave');



const CANVAS_SIZE = 700;
const INITIAL_COLOR = '#2c2c2c';

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;


function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}


function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleClickColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

}


function handleLineWidth(event) {
    ctx.lineWidth = lineWid.value;
}

function handleFillMode() {
    if(filling === true) {
        filling = false;
        fill.innerText = 'Fill'

    } else {
        filling = true;
        fill.innerText = 'Painting'
        
    }
}

function handleCanvasClick() {
    if(filling === true) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleContextMenu(event) {
   event.preventDefault();
   
}

function handleSaveClick () {
    const image = canvas.toDataURL('image/jpeg'); //png => default
    const link = document.createElement('a');
    link.href = image;
    link.download = 'Your Work![🎨]';
    link.click();
}

if(canvas) {
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleContextMenu);
    
}

Array.from(colors).forEach(color => color.addEventListener('click', handleClickColor));

lineWid.addEventListener('input', handleLineWidth);

fill.addEventListener('click', handleFillMode);
save.addEventListener('click', handleSaveClick);


