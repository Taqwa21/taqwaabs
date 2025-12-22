let dataKontak = [
  {
    id: 1,
    nama: "Naruto Uzumaki",
    nomor: 628111111111,
    email: "naruto@konoha.id",
    kota: "Konoha",
  },
  {
    id: 2,
    nama: "Sasuke Uchiha",
    nomor: 628222222222,
    email: "sasuke@uchiha.id",
    kota: "Konoha",
  },
  {
    id: 3,
    nama: "Mikasa Ackerman",
    nomor: 628333333333,
    email: "mikasa@paradis.id",
    kota: "Shiganshina",
  },
];

const daftarKontak = document.getElementById("daftar-kontak");
const formKontak = document.getElementById("formKontak");

formKontak.addEventListener("submit", tambahKontak);
window.hapusKontak = hapusKontak;

function tampilkanKontak() {
  const data = ambilDariLocalStorage();
  data === null ? simpanKeLocalStorage(dataKontak) : (dataKontak = data);

  daftarKontak.innerHTML = dataKontak
    .map(
      (kontak) => `
      <li class="border my-2 rounded-md p-2">
        <h1>${kontak.nama}</h1>
        <p>${kontak.nomor}</p>
        <p>${kontak.email}</p>
        <p>${kontak.kota}</p>
        <button
          onclick="hapusKontak(${kontak.id})"
          class="border text-white bg-red-400 rounded-lg px-2 py-1 mt-2"
        >
          Hapus
        </button>
      </li>
    `
    )
    .join("");
}

function buatIdBaru() {
  return dataKontak[dataKontak.length - 1].id + 1;
}

function tambahKontak(e) {
  e.preventDefault();

  const formData = new FormData(formKontak);

  const kontakBaru = {
    id: buatIdBaru(),
    nama: formData.get("nama"),
    nomor: formData.get("nomor"),
    email: formData.get("email"),
    kota: formData.get("kota"),
  };

  dataKontak.push(kontakBaru);
  simpanKeLocalStorage(dataKontak);
  tampilkanKontak();
  formKontak.reset();
}

function hapusKontak(id) {
  dataKontak = dataKontak.filter((kontak) => kontak.id !== id);
  simpanKeLocalStorage(dataKontak);
  tampilkanKontak();
}

function simpanKeLocalStorage(data) {
  localStorage.setItem("kontak", JSON.stringify(data));
}

function ambilDariLocalStorage() {
  const data = localStorage.getItem("kontak");
  return data ? JSON.parse(data) : null;
}

tampilkanKontak();
