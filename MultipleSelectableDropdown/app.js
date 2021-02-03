const li = document.querySelectorAll('#menu ul li');
const btnToggler = document.getElementById('btnToggler');
const menu = document.getElementById('menu');

btnToggler.addEventListener('click', e=>{

    menu.classList.toggle('active');
})


window.addEventListener('click', e=> {
    // if (!e.target.matches('#btnToggler') && !e.target.matches('#menu'))
    //     menu.classList.remove('active'); 

    console.log(e.target.className, e.target.matches('span'),
        e.target.matches('li'));
    if (e.target.matches('active') || e.target.matches('span')
        || e.target.matches('li'))
        return;
    else if (!e.target.matches('#btnToggler'))
        menu.classList.remove('active'); 
})



let liText = [];

li.forEach(element => {
    element.addEventListener('click', e => {
        let text = e.target.innerText;
        let i = liText.indexOf(text);
        if(i === -1){
            liText.push(text);
            element.classList.add('active');
        }
        else{
            liText.splice(i, 1);
            element.classList.remove('active');
        }
    })
});