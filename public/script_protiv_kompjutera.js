let pojmovi = db.collection('pojmovi');
let brojac = document.querySelector("#counter");
let brojac2 = document.querySelector("#counter-none");
let start = document.querySelector("#btnStart");
let slovo = document.querySelector("#letter");
let drzava = document.querySelector("#drzava");
let grad = document.querySelector("#grad");
let reka = document.querySelector("#reka");
let planina = document.querySelector("#planina");
let zivotinja = document.querySelector("#zivotinja");
let biljka = document.querySelector("#biljka");
let predmet = document.querySelector("#predmet");
let forma = document.querySelector("#formUser");
let reset = document.querySelector("#btnReset");
let skorRacunara = document.querySelector("#skor_racunara");
let skorKorisnika = document.querySelector("#skor_korisnika");
let listaKorisnika = document.querySelector("#listaKorisnika");
let listaRacunara = document.querySelector("#listaRacunara");
let potvrdi = document.querySelector("#potvrdi");
let winner = document.querySelector("#winner");
let centar = document.querySelector("#centar");

let broj = 60;
let kliknuto = false;
let nizOcenaKorisnika = [];
let nizOcenaRacunara = [];

document.querySelector("#kor").innerHTML = localStorage.korisnik;
document.querySelector("#imeKorisnika").innerHTML = localStorage.korisnik;

function prikaziSlovo(){
    let letters = ['A','B','C','Č','Ć','D','Dž','Đ','E','F','G','H','I','J','K','L','Lj','M','N','Nj','O','P','R','S','Š','T','U','V','Z','Ž'];
    let result = (Math.floor(Math.random() * 30));
    let letter = letters[result];
    return letter;
}

function verovatnoca(){
    if(Math.random() < 0.8)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function odgovorRacunara(slovo, kategorija, callback){
    let nizOdgovora = [];
    let odgovor = "";
    pojmovi
        .where("početnoSlovo", "==", slovo)
        .where("kategorija", "==", kategorija)
        .get()
        .then( snapshot => {
            snapshot.docs.forEach( doc => {
                nizOdgovora.push(doc.data().pojam);
            })
            let arLength = nizOdgovora.length;
            let inx = Math.floor(Math.random() * arLength);
            if(verovatnoca() == true)
            {
                odgovor = nizOdgovora[inx];
            }
            else
            {
                odgovor = false;
            }
            callback(odgovor);
        })
        .catch(error => {console.log(error);});
    }

function odgovorDrzava(string){
    if(string == undefined)
    {
        localStorage.setItem("kompDrzava", false);
    }
    else
    {
        localStorage.setItem("kompDrzava", string);
    }
}

function odgovorGrad(string){
    if(string == undefined)
    {
        localStorage.setItem("kompGrad", false);
    }
    else
    {
        localStorage.setItem("kompGrad", string);
    }
}

function odgovorReka(string){
    if(string == undefined)
    {
        localStorage.setItem("kompReka", false);
    }
    else
    {
        localStorage.setItem("kompReka", string);
    }
}

function odgovorPlanina(string){
    if(string == undefined)
    {
        localStorage.setItem("kompPlanina", false);
    }
    else
    {
        localStorage.setItem("kompPlanina", string);
    }
}

function odgovorZivotinja(string){
    if(string == undefined)
    {
        localStorage.setItem("kompZivotinja", false);
    }
    else
    {
        localStorage.setItem("kompZivotinja", string);
    }
}

function odgovorBiljka(string){
    if(string == undefined)
    {
        localStorage.setItem("kompBiljka", false);
    }
    else
    {
        localStorage.setItem("kompBiljka", string);
    }
}

function odgovorPredmet(string){
    if(string == undefined)
    {
        localStorage.setItem("kompPredmet", false);
    }
    else
    {
        localStorage.setItem("kompPredmet", string);
    }
}

function validacijaPojma(term){
    let trimTerm = term.replace(/\s+/g, '').replace(/[^a-zđščžć]+/gi, '');
    let firstLetter = trimTerm.substring(0, 1).toUpperCase();
    let rest = trimTerm.substring(1).toLowerCase();
    let input = firstLetter + rest;
    return input;
}

function prvoSlovo(trimValue){
    if(trimValue.substring(0, 2) === "Nj" || trimValue.substring(0, 2) === "Lj" || trimValue.substring(0, 2) === "Dž")
    {
        let fLetter = trimValue.substring(0, 2);
        return fLetter;
    }
    else
    {
        let fLetter = trimValue.substring(0, 1);
        return fLetter;
    }
}

function proveraPojma(kategorija, p, callback) {
    let x = true;
    let pojam = validacijaPojma(p);
    pojmovi
        .where('kategorija', '==', kategorija)
        .where('pojam', '==', pojam)
        .get()
        .then( snapshot => {
            snapshot.docs.forEach( doc => {
                if(doc.data()) {
                    x = false;
                }
            });
            callback(x);
        })
        .catch( error => { console.log(error)});
}

function proveraUnosaKorisnika(input, kategorija, ps){
    let unos = validacijaPojma(input);

    if(ps == prvoSlovo(unos))
    {
        proveraPojma(kategorija, input, y => {
            if(y == false)
            {
                localStorage.setItem(`korisnik${kategorija}`, unos);
            }
            else
            {
                localStorage.setItem(`korisnik${kategorija}`, false);
            }
        })
    }
    else
    {
        localStorage.setItem(`korisnik${kategorija}`, false);
    }

}

function uporediRezultate(unosKorisnika, unosRacunara){

        if(unosKorisnika != 'false' && unosRacunara != 'false')
        {
            if(unosKorisnika == unosRacunara)
            {
                let liKorisnika = document.createElement('li');
                liKorisnika.innerHTML = `<span class='sirina'>${unosKorisnika}</span> - 5 poena`;
                listaKorisnika.appendChild(liKorisnika);
                nizOcenaKorisnika.push(5);

                let liRacunara = document.createElement('li');
                liRacunara.innerHTML = `<span class='sirina'>${unosRacunara}</span> - 5 poena`;
                listaRacunara.appendChild(liRacunara);
                nizOcenaRacunara.push(5);
            }
            else
            {
                let liKorisnika = document.createElement('li');
                liKorisnika.innerHTML = `<span class='sirina'>${unosKorisnika}</span> - 10 poena`;
                listaKorisnika.appendChild(liKorisnika);
                nizOcenaKorisnika.push(10);

                let liRacunara = document.createElement('li');
                liRacunara.innerHTML = `<span class='sirina'>${unosRacunara}</span> - 10 poena`;
                listaRacunara.appendChild(liRacunara);
                nizOcenaRacunara.push(10);           
            }
        }
        else if(unosKorisnika != 'false' && unosRacunara == 'false')
        {
            let liKorisnika = document.createElement('li');
            liKorisnika.innerHTML = `<span class='sirina'>${unosKorisnika}</span> - 15 poena`;
            listaKorisnika.appendChild(liKorisnika);
            nizOcenaKorisnika.push(15);

            let liRacunara = document.createElement('li');
            liRacunara.innerHTML = `<span class='sirina'>${unosRacunara}</span> - 0 poena`;
            listaRacunara.appendChild(liRacunara);
            nizOcenaRacunara.push(0); 
        }
        else if(unosKorisnika == 'false' && unosRacunara != 'false')
        {
            let liKorisnika = document.createElement('li');
            liKorisnika.innerHTML = `<span class='sirina'>${unosKorisnika}</span> - 0 poena`;
            listaKorisnika.appendChild(liKorisnika);
            nizOcenaKorisnika.push(0);

            let liRacunara = document.createElement('li');
            liRacunara.innerHTML = `<span class='sirina'>${unosRacunara}</span> - 15 poena`;
            listaRacunara.appendChild(liRacunara);
            nizOcenaRacunara.push(15);
        }
        else if(unosKorisnika == 'false' && unosRacunara == 'false')
        {
            let liKorisnika = document.createElement('li');
            liKorisnika.innerHTML = `<span class='sirina'>${unosKorisnika}</span> - 0 poena`;
            listaKorisnika.appendChild(liKorisnika);
            nizOcenaKorisnika.push(0);

            let liRacunara = document.createElement('li');
            liRacunara.innerHTML = `<span class='sirina'>${unosRacunara}</span> - 0 poena`;
            listaRacunara.appendChild(liRacunara);
            nizOcenaRacunara.push(0);
        }
}

function showScore(){
    let duzinaNizaKorisnika = nizOcenaKorisnika.length;
    let sumaK = 0;
    let duzinaNizaRacunara = nizOcenaRacunara.length;
    let sumaR = 0;

    for(let i = 0; i < duzinaNizaKorisnika; i++)
    {
        sumaK += nizOcenaKorisnika[i];
    }
    let rezK = document.createElement('span');
    rezK.innerHTML = `Ukupan skor igrača: ${sumaK} poena`;
    skorKorisnika.appendChild(rezK);
    skorKorisnika.style.display = "block";

    for(let i = 0; i < duzinaNizaRacunara; i++)
    {
        sumaR += nizOcenaRacunara[i];
    }
    let rezR = document.createElement('span');
    rezR.innerHTML = `Ukupan skor računara: ${sumaR} poena`;
    skorRacunara.appendChild(rezR);
    skorRacunara.style.display = "block";

    if(sumaK > sumaR)
    {
        winner.innerHTML = `WINNER ${korisnik}`;
        winner.style.display = "block";
    }
    else if(sumaK < sumaR)
    {
        winner.innerHTML = 'WINNER RACUNAR';
        winner.style.display = "block";
    }
    else
    {
        winner.innerHTML = 'NERESENO';
        winner.style.display = "block";
    }
}

function prikaziRezultate(){
    listaKorisnika.style.display = "block";
    listaRacunara.style.display = "block";

    uporediRezultate(localStorage.korisnikDržava, localStorage.kompDrzava);
    uporediRezultate(localStorage.korisnikGrad, localStorage.kompGrad);
    uporediRezultate(localStorage.korisnikReka, localStorage.kompReka);
    uporediRezultate(localStorage.korisnikPlanina, localStorage.kompPlanina);
    uporediRezultate(localStorage.korisnikŽivotinja, localStorage.kompZivotinja);
    uporediRezultate(localStorage.korisnikBiljka, localStorage.kompBiljka);
    uporediRezultate(localStorage.korisnikPredmet, localStorage.kompPredmet);

    document.querySelector("#d").innerHTML = " " + localStorage.kompDrzava;
    document.querySelector("#g").innerHTML = " " + localStorage.kompGrad;
    document.querySelector("#r").innerHTML = " " + localStorage.kompReka;
    document.querySelector("#pl").innerHTML = " " + localStorage.kompPlanina;
    document.querySelector("#z").innerHTML = " " + localStorage.kompZivotinja;
    document.querySelector("#b").innerHTML = " " + localStorage.kompBiljka;
    document.querySelector("#pr").innerHTML = " " + localStorage.kompPredmet;

    showScore();
}

function timer(){

    proveraUnosaKorisnika(drzava.value, drzava.name, localStorage.tSlovo);
    proveraUnosaKorisnika(grad.value, grad.name, localStorage.tSlovo);
    proveraUnosaKorisnika(reka.value, reka.name, localStorage.tSlovo);
    proveraUnosaKorisnika(planina.value, planina.name, localStorage.tSlovo);
    proveraUnosaKorisnika(zivotinja.value, zivotinja.name, localStorage.tSlovo);
    proveraUnosaKorisnika(biljka.value, biljka.name, localStorage.tSlovo);
    proveraUnosaKorisnika(predmet.value, predmet.name, localStorage.tSlovo);

    odgovorRacunara(localStorage.tSlovo, "Država", odgovorDrzava);
    odgovorRacunara(localStorage.tSlovo, "Grad", odgovorGrad);
    odgovorRacunara(localStorage.tSlovo, "Reka", odgovorReka);
    odgovorRacunara(localStorage.tSlovo, "Planina", odgovorPlanina);
    odgovorRacunara(localStorage.tSlovo, "Životinja", odgovorZivotinja);
    odgovorRacunara(localStorage.tSlovo, "Biljka", odgovorBiljka);
    odgovorRacunara(localStorage.tSlovo, "Predmet", odgovorPredmet);

    setTimeout(prikaziRezultate, 1000);
}

function ocistiLS(){
    let username = localStorage.getItem('korisnik');
    localStorage.clear();
    localStorage.setItem('korisnik', username);
}

start.addEventListener('click', e => {
    e.preventDefault();

    potvrdi.style.visibility = "visible";
    ocistiLS();
    let clock = setInterval(() => {
        if(broj > 0) {
            brojac.innerHTML = `<span class="lead">Vreme za igru: ${broj}</span>`;
            broj--;
        }
        else
        {
            clearInterval(clock);
            brojac.innerHTML = '<span class="lead">Vreme za igru je isteklo!</span>';
            // console.log(localStorage);
            if(kliknuto == false)
            {
                timer();
            }
            reset.style.display = "block";
        }
    }, 1000);

    let trenutnoSlovo = prikaziSlovo();
    localStorage.setItem('tSlovo', trenutnoSlovo);
    slovo.innerHTML = `Slovo: ${trenutnoSlovo}`;
})

forma.addEventListener( 'submit', e => {
    e.preventDefault();

    kliknuto = true;
    brojac.style.display = "none";
    brojac2.innerHTML = '<span class="lead">Vreme za igru je isteklo!</span>';
    brojac2.style.display = "block";
    // console.log(localStorage);
    timer();
    reset.style.display = "block";
})

reset.addEventListener('click', () => {
    forma.reset();
    ocistiLS();
    location.reload();
})

window.addEventListener('load', () => {
    forma.reset();
})