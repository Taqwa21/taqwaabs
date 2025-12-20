// ================== DATA ==================
let dataKontak = [
  {
    uid: 10,
    nama: "Rei Ayanami",
    nomor: 628111111111,
    surel: "rei@example.com",
    kota: "Tokyo",
  },
  {
    uid: 11,
    nama: "Shinobu Kocho",
    nomor: 628222222222,
    surel: "shinobu@example.com",
    kota: "Kyoto",
  },
];

// ================== DOM ==================
const bukuKontakEl = document.getElementById("buku-Kontak");

// ================== LOCAL STORAGE ==================
function simpanKeLocalStorage() {
  localStorage.setItem("contacts", JSON.stringify(dataKontak));
}

function ambilDariLocalStorage() {
  const data = localStorage.getItem("contacts");
  return data ? JSON.parse(data) : [];
}

// ================== UTIL ==================
function ambilIDBaru() {
  if (dataKontak.length === 0) return 1;
  return dataKontak[dataKontak.length - 1].uid + 1;
}

// ================== FUNCTION ==================
function tampilkanKontakDOM() {
  const loadContacts = ambilDariLocalStorage();

  bukuKontakEl.innerHTML = "";

  const listKontak = loadContacts.map((contact) => {
    return `
      <li class="border my-2 rounded-md p-2">
        <h3>${contact.nama}</h3>
        <p>${contact.nomor}</p>
        <p>${contact.surel}</p>
        <p>${contact.kota}</p>
      </li>
    `;
  });

  bukuKontakEl.innerHTML = listKontak.join("");
}

function simpanKontak(nama, nomor, email, kota) {
  dataKontak.push({
    uid: ambilIDBaru(),
    nama,
    nomor,
    surel: email,
    kota,
  });

  simpanKeLocalStorage();
}

function cariKontak(keyword) {
  const hasil = dataKontak.filter((kontak) =>
    kontak.nama.toLowerCase().includes(keyword.toLowerCase())
  );

  for (const h of hasil) {
    console.log(`
ID    : ${h.uid}
Nama  : ${h.nama}
Nomor : ${h.nomor}
Email : ${h.surel}
Kota  : ${h.kota}
    `);
  }
}

function hapusKontak(uid) {
  dataKontak = dataKontak.filter((kontak) => kontak.uid !== uid);
  simpanKeLocalStorage();
}

function ubahKontak(uid, dataBaru) {
  dataKontak = dataKontak.map((kontak) => {
    if (kontak.uid === uid) {
      return {
        ...kontak,
        ...dataBaru,
      };
    }
    return kontak;
  });

  simpanKeLocalStorage();
}

// ================== RUN PROGRAM ==================
if (ambilDariLocalStorage().length === 0) {
  simpanKeLocalStorage();
}

tampilkanKontakDOM();

// contoh pemakaian
simpanKontak("Makima", 628333333333, "makima@example.com", "Sapporo");
simpanKontak("Power", 628444444444, "power@example.com", "Osaka");

cariKontak("Shino");
tampilkanKontakDOM();
