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
      <li class="border my-2 rounded-md p-3">
        <p>👤 ${kontak.nama}</p>
        <p>📞 ${kontak.nomor}</p>
        <p>✉️ ${kontak.email}</p>
        <p>📍 ${kontak.kota}</p>

        <div class="flex gap-2 mt-2">
          <button
            onclick="editKontak(${kontak.id})"
            class="border bg-blue-400 text-white rounded-lg px-2 py-1"
          >
            Edit
          </button>

          <button
            onclick="hapusKontak(${kontak.id})"
            class="border bg-red-400 text-white rounded-lg px-2 py-1"
          >
            Hapus
          </button>
        </div>
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
  const idKontak = document.getElementById("idKontak").value;

  if (idKontak) {
    dataKontak = dataKontak.map((kontak) =>
      kontak.id == idKontak
        ? {
            id: kontak.id,
            nama: formData.get("nama"),
            nomor: formData.get("nomor"),
            email: formData.get("email"),
            kota: formData.get("kota"),
          }
        : kontak
    );
  } else {
    const kontakBaru = {
      id: buatIdBaru(),
      nama: formData.get("nama"),
      nomor: formData.get("nomor"),
      email: formData.get("email"),
      kota: formData.get("kota"),
    };
    dataKontak.push(kontakBaru);
  }

  simpanKeLocalStorage(dataKontak);
  tampilkanKontak();
  formKontak.reset();
  document.getElementById("idKontak").value = "";
}

function hapusKontak(id) {
  dataKontak = dataKontak.filter((kontak) => kontak.id !== id);
  simpanKeLocalStorage(dataKontak);
  tampilkanKontak();
}

function editKontak(id) {
  const kontak = dataKontak.find((k) => k.id === id);

  document.getElementById("nama").value = kontak.nama;
  document.getElementById("nomor").value = kontak.nomor;
  document.getElementById("email").value = kontak.email;
  document.getElementById("kota").value = kontak.kota;

  document.getElementById("idKontak").value = kontak.id;
}

function simpanKeLocalStorage(data) {
  localStorage.setItem("kontak", JSON.stringify(data));
}

function ambilDariLocalStorage() {
  const data = localStorage.getItem("kontak");
  return data ? JSON.parse(data) : null;
}

tampilkanKontak();
