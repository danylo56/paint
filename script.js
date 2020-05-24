let canv = document.getElementById("canvas");
let ctx = canv.getContext('2d');

let radius = 10;
let isMouseDown = false;
let color = "black";
let coords = [];

canv.width = window.innerWidth;
canv.height = window.innerHeight - 64;

ctx.lineWidth = radius *2

canv.addEventListener('mousedown', function(e){
    isMouseDown = true;
});

canv.addEventListener('mouseup', function(e){
    isMouseDown = false;
    ctx.beginPath();
    coords.push('mouseup');
});

canv.addEventListener('mousemove', function(e){
    if(isMouseDown){
        coords.push([e.clientX, e.clientY-64, color])

        ctx.lineWidth = radius * 2;
        ctx.lineTo(e.clientX, e.clientY-64);
        ctx.stroke();
        ctx.strokeStyle = 
        ctx.beginPath();    
        ctx.arc(e.clientX, e.clientY - 64, radius, 0, Math.PI*2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY-64);
    }
    
})

function save(){
    localStorage.setItem('coords', JSON.stringify(coords));
}

function clear(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.beginPath()
    ctx.fillStyle = color;
}

function replay(){
    let timer = setInterval(function(){
        if(!coords.length){
            clearInterval(timer);
            ctx.beginPath();
            return;
        }

        let crd = coords.shift();

        e = {
            clientX: crd["0"],
            clientY: crd["1"],
            color: crd["2"]
        }
        ctx.strokeStyle = e.color;
        ctx.fillStyle = e.color;

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        
        ctx.beginPath();    
        ctx.arc(e.clientX, e.clientY, radius, 0, Math.PI*2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }, 10);

    ctx.fillStyle = color;
    ctx.strokeStyle = color;
}

document.addEventListener("keydown", function(e){
    if(e.keyCode == 83){
        save();
    }

    if (e.keyCode == 82){
        coords = JSON.parse(localStorage.getItem('coords'));
        clear();
        replay();
    }

    if(e.keyCode == 67){
        clear();
        coords = []

    }
})

document.getElementById("saveBtn").addEventListener('click', function(){
    save();
});

document.getElementById("clearBtn").addEventListener('click', function(){
    clear();
    coords = [];
});

document.getElementById("replayBtn").addEventListener('click', function(){
    coords = JSON.parse(localStorage.getItem('coords'));
    clear();
    replay();

});


// PREFERENCES
const cursor = document.getElementById("cursorExample");

const boxes = document.querySelectorAll(".colorbox");
boxes.forEach(box => {
    box.style.background = box.getAttribute("for");
});


document.getElementById("palette").addEventListener('change', function(){
    console.log("Form changed");
    boxes.forEach(box => {
        box.classList.remove('choosen');
    });
    console.log(this.color.value)
    color = this.color.value;
    ctx.fillStyle = color;
    cursor.style.background = color;

    ctx.strokeStyle = color;

   document.getElementById(this.color.value + "L").classList.add('choosen');
});

document.getElementById("formSize").addEventListener('change', function(){
    radius = this.size.value;
    cursor.style.width = this.size.value * 2 + "px";
    cursor.style.height = this.size.value * 2 + "px";
})
