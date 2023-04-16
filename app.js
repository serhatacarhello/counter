const harcamaInput = document.querySelector("#harcama");
const fiyatInput = document.querySelector("#fiyat");
const formBtn = document.querySelector(".ekle-btn");
const statusCheck = document.querySelector("#status-input");
const liste = document.querySelector(".liste");
const toplamBilgi = document.querySelector("#toplam-bilgi");
const selectFilter = document.querySelector("#filter-select");

// console.log(harcamaInput);
// console.log(fiyatInput);
// console.log(formBtn);
// console.log(liste);
// console.dir(statusCheck);
// console.dir(selectFilter);

//izleme işlemleri
formBtn.addEventListener("click", addExpense); // izleme islemi click dinle ve addExpense fonksiyonunu çalıştır.
liste.addEventListener("click", handleClick);
selectFilter.addEventListener("change", handleFilter);

//toplam state'i (durum)
let toplam = 0;

function updateToplam(fiyat) {
  // console.log(typeof fiyat)
  toplam += parseInt(fiyat);
  //console.log(toplam);
  toplamBilgi.innerText = toplam;
}

function addExpense(e) {
  e.preventDefault();

  if (!fiyatInput.value || !harcamaInput.value) {
    alert("Formları Doldurun");
    return;
  }

  // console.log('butona tiklandi');
  console.log(harcamaInput.value, fiyatInput.value);
  // div oluşturma yeni liste elemanı için
  const harcamaDiv = document.createElement("div"); // div oluşturduk ve değişkene atadık

  // class ekleme
  harcamaDiv.classList.add("harcama"); // add() metoduyla classList metoduyla class ekledik
  if (statusCheck.checked) {
    // eğer checkbox değeri checked ise class ekleme
    harcamaDiv.classList.add("payed");
  }

  // oluşturulan div içine eleman koyma
  harcamaDiv.innerHTML = `
                 <h2>${harcamaInput.value}</h2>
                <h2 id='value'>${fiyatInput.value}</h2>
                <div class="buttons">
                    <img id='payment' src="images/pay.png" alt="pay">
                    <img id='remove' src="images/delete.png" alt="delete">
                </div>
`;
  //oluşan harcama div içeriğini listeye ekleyelim
  liste.appendChild(harcamaDiv); //harcamaDiv i listeye ekledik . function içinde olğuğu için sanal olarak oluşmaya devam edecek
  // console.log(liste);

  // toplamı güncelle
  updateToplam(fiyatInput.value);

  //form temizleme
  harcamaInput.value = "";
  fiyatInput.value = "";
}

//listeye tıklanma olayını yönetme
function handleClick(e) {
  // console.log(e.target);
  const eleman = e.target;

  if (eleman.id === "remove") {
    // kapsayıcı elemanı alma
    const wrapperElement = eleman.parentElement.parentElement;
    //silinen elemanın fiyatını alma
    const deletedPriceElement = wrapperElement.querySelector("#value"); // eleman içinde sorgu yapma
    //    console.log(Number(deletedPrice.innerText)); eleman içi yazıya ulaşma
    const deletedPrice = Number(deletedPriceElement.innerText);
    // deletedPrice = Number(wrapperElement.querrySelector('#value').innerText); tek satırda tanımlama

    // silinen elemanın fiyatını toplamdan cıkarma
    updateToplam(-deletedPrice); // function içine değişken koyma

    // alert('silme işlemi başlatıldı');
    wrapperElement.remove();
  }
}

// filtreleme işlemi
function handleFilter(e) {
  console.dir(e.target.value);
  // console.dir(liste.childNodes);
  const items = liste.childNodes;
  items.forEach((item) => {
    switch (e.target.value) {
      case 'all':
        item.style.display = "flex";
        break;

      case 'payed':
        if (!item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;

      case 'not-payed':
        if (item.classList.contains("payed")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}
