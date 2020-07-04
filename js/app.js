const formSubmit = document.querySelector(".content-main form input[type='submit']");
let game;

document.addEventListener('click', (e)=>{
    let positionX = e.x;
    let positionY = e.y;
    let div = document.createElement('span');
    document.body.position = 'relative';
    div.style.position = 'fixed';
    div.style.left = `${positionX}px`;
    div.style.top = `${positionY}px`;
    div.innerHTML = '<img width = "35px" src = "./img/coin.gif">'
    document.body.appendChild(div);
    setTimeout(()=>{
        document.body.removeChild(div);
    }, 500)
});

formSubmit.addEventListener('click', (e)=>{   
    e.preventDefault(); 
    game = new Game();
});

