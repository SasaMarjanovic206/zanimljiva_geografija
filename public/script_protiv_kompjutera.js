

let pojmovi = db.collection('pojmovi');
let brojac = document.querySelector("#counter");
let start = document.querySelector("#btnStart");
let slovo = document.querySelector("#letter");
let drzava = document.querySelector("#drzava");
let grad = document.querySelector("#grad");
let reka = document.querySelector("#reka");
let planina = document.querySelector("#planina");
let zivotinja = document.querySelector("#zivotinja");
let biljka = document.querySelector("#biljka");
let predmet = document.querySelector("#predmet");

let letters = ['A','B','C','Č','Ć','D','Dž','Đ','E','F','G','H','I','J','K','L','Lj','M','N','Nj','O','P','R','S','Š','T','U','V','Z','Ž'];
let result = (Math.floor(Math.random() * 30));
let letter = letters[result];

start.addEventListener('click', e => {
    e.preventDefault();

    let broj = 90;
    brojac.innerHTML = "";
    let clock = setInterval(() => {
        brojac.innerHTML = `<span class="lead">Vreme za igru: ${broj}</span>`;
        if(broj > 0) {
            broj--;
        }
        else {
            clearInterval(clock);
        }
    }, 1000);

    slovo.innerHTML = `Slovo: ${letter}`;
})

function bla(){
        let niz = [];
        let pojamm = "";
        pojmovi
            .where("kategorija", "==", "Država")
            .where("početnoSlovo", "==", "J")
            .get()
            .then( snapshot => {
                snapshot.forEach( doc => {
                    niz.push(doc.data().pojam);
                });
                let duzina = niz.length;
                let a = Math.floor(Math.random() * duzina);
                pojamm = `${niz[a]}`;
        })
        .catch(error => {console.log(error)});
        return pojamm;
}

drzava.innerHTML = bla();