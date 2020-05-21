class Pojam{
    constructor(kor){
        this.korisnik = kor;
        this.pojmovi = db.collection('pojmovi');
    }

    set korisnik(kor){
        this._korisnik = kor;
    }

    get korisnik(){
        return this._korisnik;
    }

    validacijaPojma(term){

        let trimTerm = term.replace(/[^a-zA-Z]/g, "");
        let firstLetter = trimTerm.substring(0, 1);
        let rest = trimTerm.substring(1);
        let input = firstLetter.toUpperCase() + rest.toLowerCase();
        return input;
    }

    prvoSlovo(trimValue){
        let fLetter = trimValue.substring(0, 1);
        return fLetter;
    }

    async dodajPojam(rec, kategorija){

        let novaRec = this.validacijaPojma(rec);
        let dateTmp = new Date();

        let pojam = {
            vreme: firebase.firestore.Timestamp.fromDate(dateTmp),
            kategorija: kategorija,
            pojam: novaRec,
            korisnik: this.korisnik,
            početnoSlovo: this.prvoSlovo(novaRec)
        }

        let dodavanje = await this.pojmovi.add(pojam);
        return dodavanje;
    }

    proveraPojma(kategorija, rec, callback) {
        let a = true;
        let pojam = this.validacijaPojma(rec);
        this.pojmovi
            .where('kategorija', '==', kategorija)
            .where('pojam', '==', pojam)
            .get()
            .then( snapshot => {
                snapshot.docs.forEach( doc => {
                    if(doc.data()) {
                        a = false;
                    }
                });
                callback(a);
            })
            .catch( error => { console.log(error)});
    }

}

let formTerm = document.querySelector("#formTerm");
// let kat = document.querySelector("#kategorija");
let pojam = document.querySelector("#pojam");
let submitPojam = document.querySelector("#btnTerm");

let vrednostPojma = pojam.value;
// let opcija = kat.options[kat.selectedIndex].text;

let inputTerm = new Pojam(localStorage.korisnik);
console.log(inputTerm);

formTerm.addEventListener( 'submit', e => {
    e.preventDefault();

    let kat = document.querySelector("#kategorija");
    let opcija = kat.options[kat.selectedIndex].text;
    let vrednostPojma = pojam.value;
    let item = inputTerm.validacijaPojma(vrednostPojma);
    if(item != "")
    {
        inputTerm.proveraPojma(opcija, item, b => {
            if(b == true)
            {
                inputTerm.dodajPojam(item, opcija);
                formTerm.reset();
            }
            else
            {
                console.log("Pojam vec postoji u bazi!");
                formTerm.reset();
            }
        })
    }
    else
    {
        alert("Morate uneti nesto!");
    }

});