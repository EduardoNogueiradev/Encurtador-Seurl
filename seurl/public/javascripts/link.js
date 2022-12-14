const button = document.getElementById('delay');
const endereco = document.getElementById('link');
const redireciona = document.getElementById('url').innerHTML;
const section = document.getElementById('cont-link');
const indicator = document.getElementById('cont');
const elementLoad = document.getElementById('load');
const captcha = document.getElementById('recaptcha');

function loadingComplete() {
    captcha.classList.toggle('on');
    elementLoad.classList.toggle('off');
}

function recaptchaVerify() {
    button.classList.toggle('on');
    indicator.classList.toggle('on');
    section.classList.toggle('on');
}

button.addEventListener('click', () =>{
    button.disabled = true;
    const valor = [ 5, 4, 3, 2, 1 ,0]    

    for( i = 0; i <= 5 ; i ++){
        setTimeout(function(i) {
            
            button.innerHTML = valor[i];

            if(button.innerHTML == 0){
                const buttonLink = document.getElementById('button-link');
                buttonLink.classList.toggle('on');
                button.classList.toggle('off-important');
                button.classList.remove('on');

                endereco.href = redireciona;
            }
            
        }, i * 1000, i);       
    }

})
