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
let forma = document.querySelector("#formUser");
let reset = document.querySelector("#btnReset");
let skorRacunara = document.querySelector("#skor_racunara");
let skorKorisnika = document.querySelector("#skor_korisnika");
let listaKorisnika = document.querySelector("#listaKorisnika");
let listaRacunara = document.querySelector("#listaRacunara");

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
    let liKorisnika = document.createElement('li');
    let liRacunara = document.createElement('li');

    if(unosKorisnika != 'false' && unosRacunara != 'false')
    {
            if(unosKorisnika == unosRacunara)
            {
                liKorisnika.innerHTML = `${unosKorisnika} 5 poena`;
                listaKorisnika.appendChild(liKorisnika);
                liRacunara.innerHTML = `${unosRacunara} 5 poena`;
                listaRacunara.appendChild(liRacunara);
            }
            else
            {
                liKorisnika.innerHTML = `${unosKorisnika}10 poena`;
                listaKorisnika.appendChild(liKorisnika);
                liRacunara.innerHTML = `${unosRacunara} 10 poena`;
                listaRacunara.appendChild(liRacunara);            
            }
        elseif(unosKorisnika != 'false' && unosRacunara == 'false')
        {
            liKorisnika.innerHTML = `${unosKorisnika}15 poena`;
            listaKorisnika.appendChild(liKorisnika);
            liRacunara.innerHTML = `${unosRacunara} 0 poena`;
            listaRacunara.appendChild(liRacunara);
        }
        elseif(unosKorisnika == 'false' && unosRacunara != 'false')
        {
            liKorisnika.innerHTML = `${unosKorisnika} 0 poena`;
            listaKorisnika.appendChild(liKorisnika);
            liRacunara.innerHTML = `${unosRacunara} 15 poena`;
            listaRacunara.appendChild(liRacunara);
        }
        elseif(unosKorisnika != 'false' && unosRacunara == 'false')
        {
            liKorisnika.innerHTML = `${unosKorisnika} 15 poena`;
            listaKorisnika.appendChild(liKorisnika);
            liRacunara.innerHTML = `${unosRacunara} 0 poena`;
            listaRacunara.appendChild(liRacunara);
        }
    }
    else
    {
        liKorisnika.innerHTML = `${unosKorisnika} 0 poena`;
        listaKorisnika.appendChild(liKorisnika);
        liRacunara.innerHTML = `${unosRacunara} 0 poena`;
        listaRacunara.appendChild(liRacunara);
    }
}

function prikaziRezultate(){
    listaKorisnika.style.display = "block";
    listaRacunara.style.display = "block";

    uporediRezultate(localStorage.korisnikDrzava, localStorage.kompDrzava);
    uporediRezultate(localStorage.korisnikGrad, localStorage.kompGrad);
    uporediRezultate(localStorage.korisnikReka, localStorage.kompReka);
    uporediRezultate(localStorage.korisnikPlanina, localStorage.kompPlanina);
    uporediRezultate(localStorage.korisnikZivotinja, localStorage.kompZivotinja);
    uporediRezultate(localStorage.korisnikBiljka, localStorage.kompBiljka);
    uporediRezultate(localStorage.korisnikPredmet, localStorage.kompPredmet);
}

function ocistiLS(){
    let username = localStorage.getItem('korisnik');
    localStorage.clear();
    localStorage.setItem('korisnik', username);
}

start.addEventListener('click', e => {
    e.preventDefault();

    let broj = 90;
    brojac.innerHTML = "";
    let clock = setInterval(() => {
        brojac.innerHTML = `<span class="lead">Vreme za igru: ${broj}</span>`;
        if(broj > 0) {
            broj--;
        }
        else
        {
            brojac.innerHTML = '<span class="lead">Vreme za igru je isteklo!</span>';
            clearInterval(clock);
        }
    }, 1000);

    let trenutnoSlovo = prikaziSlovo();
    localStorage.setItem('tSlovo', trenutnoSlovo);
    slovo.innerHTML = `Slovo: ${trenutnoSlovo}`;
})

forma.addEventListener( 'submit', e => {
    e.preventDefault();

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

    prikaziRezultate();
})

// reset.addEventListener('click', e => {
//     e.preventDefault();

//     forma.reset();
//     ocistiLS();
// })