const formSubmit = document.querySelector(".content-main form input[type='submit']");
let game;

formSubmit.addEventListener('click', (e)=>{   
    e.preventDefault(); 
    game = new Game();
});

