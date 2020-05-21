let formKorIme = document.querySelector("#formUsername");
let korIme = document.querySelector("#username");
let dugmeKorIme = document.querySelector("#btnUsername");
let link2 = document.querySelector("#a2");
let link3 = document.querySelector("#a3");

formKorIme.addEventListener('submit', e => {
    e.preventDefault();
    if(korIme.value == "")
    {
        alert("Morate uneti korisničko ime!");
    }
    else
    {
        let username = korIme.value;
        localStorage.setItem('korisnik', username);
        link2.setAttribute("href", "predlog_pojmova.html");
        link3.setAttribute("href", "hall_of_fame.html");
    }
});