let formKorIme = document.querySelector("#formUsername");
let korIme = document.querySelector("#username");
let dugmeKorIme = document.querySelector("#btnUsername");
let link2 = document.querySelector("#a2");

formKorIme.addEventListener('submit', e => {
    e.preventDefault();
    if(korIme.value == "")
    {
        alert("Morate uneti korisničko ime!");
    }
    else
    {
        let username = korIme.value;
        console.log(username);
        localStorage.setItem('korisnik', username);
        link2.setAttribute("href", "predlog_pojmova.html");
    }
});