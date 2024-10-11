let kaikkipelaajat = [];
let pisteet = 0;
let aktiivinenpelaaja = 0;

function maara() {
    const pelaajienmaara = document.getElementById('pelaajienmaara').value;
    const pelaajiennimet = document.getElementById('pelaajiennimet');
    pelaajiennimet.innerHTML = '';

    for (let i = 0; i < pelaajienmaara; i++) {
        const nimikentta = document.createElement('input');
        nimikentta.setAttribute('placeholder', `Pelaajan ${i + 1} nimi`);
        nimikentta.setAttribute('id', `pelaajannimi${i}`);
        nimikentta.classList.add('pelaajan-nimi-kentta');
        pelaajiennimet.appendChild(nimikentta);
        pelaajiennimet.appendChild(document.createElement('br'));
    }

    document.getElementById('kaynnistapeli').style.display = 'block';
}

function kaynnistaPeli() {
    const pelaajienmaara = document.getElementById('pelaajienmaara').value;
    kaikkipelaajat = [];

    for (let i = 0; i < pelaajienmaara; i++) {
        const pelaajannimi = document.getElementById(`pelaajannimi${i}`).value || `Pelaaja ${i + 1}`;
        kaikkipelaajat.push({ name: pelaajannimi, score: 0 });
    }

    document.querySelector('.pelaajat').style.display = 'none';
    document.getElementById('nappulat').style.display = 'block';

    paivitaPeli();
}

function heitaNoppa() {
    const noppa1 = Math.floor(Math.random() * 6) + 1;
    const noppa2 = Math.floor(Math.random() * 6) + 1;


    document.getElementById('noppakuvat').innerHTML = `<img src="img/noppa${noppa1}.png" alt="noppa"> <img src="img/noppa${noppa2}.png" alt="noppa"> `;
 
    if (noppa1 !== 1 && noppa2 !== 1) {
        pisteet += (noppa1 + noppa2);
    } else {
        pisteet = 0;
        toinenPelaaja();
    }

    paivitaPeli();
}

function pidaPisteet() {
    kaikkipelaajat[aktiivinenpelaaja].score += pisteet;
    pisteet = 0;

    if (kaikkipelaajat[aktiivinenpelaaja].score >= 100) {
        document.getElementById('tulosviesti').textContent = `${kaikkipelaajat[aktiivinenpelaaja].name} voitti pelin!`;
        document.getElementById('nappulat').style.display = 'none';
        document.getElementById('noppakuvat').style.display = 'none';
        document.getElementById('aktiivinenpelaaja').style.display = 'none';
    } else {
        toinenPelaaja();
    }

    paivitaPeli();
}

function toinenPelaaja() {
    aktiivinenpelaaja = (aktiivinenpelaaja + 1) % kaikkipelaajat.length;
}

function paivitaPeli() {
    document.getElementById('aktiivinenpelaaja').textContent = `${kaikkipelaajat[aktiivinenpelaaja].name}:n vuoro`;

    let pelaajienpisteettulostus = document.getElementById('tulos');
    pelaajienpisteettulostus.innerHTML = '';
    kaikkipelaajat.forEach((pelaaja, index) => {
        let pelaajanpisteet = document.createElement('p');
        pelaajanpisteet.textContent = `${pelaaja.name}: ${pelaaja.score} pistettä`;
        if (index === aktiivinenpelaaja) {
            pelaajanpisteet.classList.add('aktiivinenpelaaja');
        }
        pelaajienpisteettulostus.appendChild(pelaajanpisteet);
    });
}

function lopetaPeli() {
    kaikkipelaajat = [];
    pisteet = 0;
    aktiivinenpelaaja = 0;
    document.querySelector('.pelaajat').style.display = 'block';
    document.getElementById('sisalto').style.display = 'none';
    document.getElementById('pelaajiennimet').innerHTML = '';
    document.getElementById('kaynnistapeli').style.display = 'none';
    document.getElementById('nappulat').style.display = 'none';
    document.getElementById('tulosviesti').textContent = '';
}