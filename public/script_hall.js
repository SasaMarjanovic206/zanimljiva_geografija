let listaNajboljih = document.querySelector("#najbolji");

class hallOfFame{
    constructor(){
        this.pojmovi = db.collection('pojmovi');
    }

    topLista(){
        let niz = [];
        this.pojmovi
            .orderBy("korisnik", "desc")
            .get()
            .then( snapshot => {
                snapshot.forEach( doc => {
                    niz.push(doc.data().korisnik);
                });

            let skor = {};
            niz.forEach( function(x) {
                skor[x] = (skor[x] || 0) + 1;
            });
            let unosi = Object.entries(skor);
            unosi = unosi.sort(function(a, b){
                return b[1] - a[1];
            });
            for(let i = 0; i < 2; i++)
            {
                listaNajboljih.innerHTML += `<li class="list-group-item col-md-7">${unosi[i]}</li>`;
            }
            })
            .catch(error => {console.log(error)});
    }
}

let hall = new hallOfFame();
hall.topLista();