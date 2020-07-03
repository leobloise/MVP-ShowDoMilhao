function validation(dataForm){
    let name = String(dataForm[0].value);
    let selectedIndex = dataForm[1].selectedIndex; 
    if(name.match(/\d/) || name.replace(/\s/g, "").length < 3){
        return -1;
    } else if(selectedIndex == '0') {
        
        return -2;
    } else {
        return 1;
    }
}

function capitalizeFirstWord(str){
    str = str.split(' ');
    parted = []
    str.forEach(str =>{
         parted.push(str.charAt(0).toUpperCase() + str.slice(1));
    })
    return parted.join(' ');  
}

