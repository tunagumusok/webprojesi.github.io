class DovizKuruAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE';
    }

    dovizKuruCek(fromCurrency, toCurrency, callback) {
        const url = `${this.baseUrl}&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${this.apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data['Realtime Currency Exchange Rate']) {
                    const rate = data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
                    callback(rate);
                }
            });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const resimDizisi = [
        { src: 'https://media.istockphoto.com/id/485947800/tr/foto%C4%9Fraf/clock-tower-izmir.jpg?s=612x612&w=0&k=20&c=CqaqzJpDMSkoNrghyCuXYKvtPSiTMPuMVFXGXhFP4oI=', desc: 'İzmir' },
        { src: 'https://content.skyscnr.com/m/6c318dca1fef4692/original/GettyImages-466997420.jpg?crop=1048px:699px&quality=100', desc: 'Muğla' },
        { src: 'https://cdnp.flypgs.com/files/Sehirler-long-tail/Antalya/antalya-sehir-rehberi-sahiller.jpg', desc: 'Antalya' },
        { src: 'https://garentablogfiles.blob.core.windows.net/images/3dfb47e3-5c36-4fdc-971f-532ff67330eb.jpg', desc: 'Aydın' },
        { src: 'https://muze.gen.tr/img/maidens-tower-istanbul.jpg', desc: 'İstanbul' }
    ];

    let indeks = 0;
    const imgElement = document.getElementById('profile-img');
    const descElement = document.getElementById('image-description');
    const container = descElement.parentNode;

    const btnGuncelle = document.createElement('button');
    btnGuncelle.textContent = 'Güncelle';
    container.appendChild(btnGuncelle);
    let degistirildi = false;
    btnGuncelle.addEventListener('click', () => {
        degistirildi = !degistirildi;
        descElement.textContent = degistirildi ? 'Tuna Gümüşok Fotoğrafları' : resimDizisi[indeks].desc;
    });

    const btnEnUsteDon = document.createElement('button');
    btnEnUsteDon.textContent = 'En Üste Dön';
    btnEnUsteDon.style.cssText = "position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); font-size: 18px; padding: 10px 20px;";
    document.body.appendChild(btnEnUsteDon);
    btnEnUsteDon.addEventListener('click', () => window.scrollTo(0, 0));

    imgElement.addEventListener('click', () => {
        indeks = (indeks + 1) % resimDizisi.length;
        imgElement.src = resimDizisi[indeks].src;
        imgElement.alt = resimDizisi[indeks].desc;
        if (!degistirildi) {
            descElement.textContent = resimDizisi[indeks].desc;
        }
    });

    window.addEventListener('resize', () => {
        alert('Pencere boyutu değiştirildi!');
    });

    const dovizApi = new DovizKuruAPI('S9C0MP0NLD5AXWB5');
    dovizApi.dovizKuruCek('USD', 'TRY', (rate) => {
        const currencyContainer = document.getElementById('currency-container');
        currencyContainer.innerHTML = `
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg" alt="Dolar" class="currency-logo">
            <p style="color: red;">Dolar -> TL:</p>
            <span>${rate}</span>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg" alt="TL" class="currency-logo">
        `;
    });
});