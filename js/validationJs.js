const formSubmit = document.querySelector(".content-main form input[type='submit']");
let user;

formSubmit.addEventListener('click', (e)=>{
    e.preventDefault();
    const dataForm = document.querySelectorAll(".content-main input[type='text'], .content-main select");
    let name = String(dataForm[0].value);
    let selectedIndex = dataForm[1].selectedIndex; 
    if(name.match(/\d/) || name.replace(/\s/g, "").length < 3){
        alert('Digite um nome válido');
        dataForm[0].focus();
    } else if(selectedIndex == '0') {
        alert('Selecione um estado válido');
        dataForm[1].focus();
    } else {
        let city = dataForm[1].value;
        document.querySelector('.content-main').classList.add('opacity_zero');
        setTimeout(()=>{
            document.querySelector('.content-main').classList.remove('opacity_zero');
            document.querySelector('.content-main').innerHTML = '<img src = "./img/cuteLoading.gif">'
            }, 1000);
        user = new User(name, city);
    }
});

function capitalizeFirstWord(str){
    str = str.split(' ');
    parted = []
    str.forEach(str =>{
         parted.push(str.charAt(0).toUpperCase() + str.slice(1));
    })
    return parted.join(' ');  
}

