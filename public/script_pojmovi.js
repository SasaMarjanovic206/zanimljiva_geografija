class Pojam{
    constructor(kat, kor, ps){
        this.kategorija = kat;
        this.korisnik = kor;
        this.prvoSlovo = ps;
        this.pojmovi = db.collection('pojmovi');
    }

    set kategorija(kat){
        this._kategorija = kat;
    }
    set korisnik(kor){
        this._korisnik = kor;
    }
    set prvoSlovo(ps){
        this._prvoSlovo = ps;
    }

    get kategorija(){
        return this._kategorija;
    }
    get korisnik(){
        return this._korisnik;
    }
    get prvoSlovo(){
        return this._prvoSlovo;
    }

    async dodajPojam(term){

        let dateTmp = new Date();

        let pojam = {
            vreme: firebase.firestore.Timestamp.fromDate(dateTmp),
            kategorija: this.kategorija,
            pojam: term,
            korisnik: this.korisnik,
            početnoSlovo: this.prvoSlovo
        }

        let dodavanje = await this.pojmovi.add(pojam);
        return dodavanje;

    }
}


let formTerm = document.querySelector("#formTerm");
let kat = document.querySelector("#kategorija");
let pojam = document.querySelector("#pojam");
let submitPojam = document.querySelector("#btnTerm");

let vrednostPojma = pojam.value;
let trimVrednostPojma = vrednostPojma.replace(/[^a-zA-Z]/g, "");
let prvoSlovo = trimVrednostPojma.substring(0, 1);
let velikoSlovo = prvoSlovo.toUpperCase();

let opcija = kat.options[kat.selectedIndex].text;

let korisnik = localStorage.korisnik;

let inputTerm = new Pojam(korisnik, opcija, velikoSlovo);
console.log(inputTerm);


formTerm.addEventListener('submit', e => {
    e.preventDefault();
    let term = pojam.value;
    let trimTerm = term.replace(/[^a-zA-Z]/g, "");
    let firstLetter = trimTerm.substring(0, 1);
    let rest = trimTerm.substring(1);
    let input = firstLetter.toUpperCase() + rest.toLowerCase();

    inputTerm.dodajPojam(input)
        .then(() => {formNewMessage.reset()})
        .catch(err => console.log(err))
});