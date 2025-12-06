// Data kontak versi baru
const bukuKontak = [
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

// Tampilkan semua kontak
function tampilkanKontak() {
  for (const k of bukuKontak) {
    console.log(`
      ID      : ${k.uid}
      Nama    : ${k.nama}
      Nomor   : ${k.nomor}
      Kota    : ${k.kota}
      Email   : ${k.surel}
    `);
  }
}

// Ambil ID terakhir lalu +1
function ambilIDBaru() {
  if (bukuKontak.length === 0) return 1;

  const terakhir = bukuKontak[bukuKontak.length - 1];
  return terakhir.uid + 1;
}

// Tambah kontak baru
function simpanKontak(nama, nomor, email, kota) {
  bukuKontak.push({
    uid: ambilIDBaru(),
    nama: nama,
    nomor: nomor,
    surel: email,
    kota: kota,
  });
}

// Cari kontak berdasarkan nama
function cariKontak(keyword) {
  const hasil = bukuKontak.filter((x) =>
    x.nama.toLowerCase().includes(keyword.toLowerCase())
  );

  if (hasil.length === 0) {
    console.log("Tidak ada data ditemukan.");
    return;
  }

  for (const h of hasil) {
    console.log(`
      ID      : ${h.uid}
      Nama    : ${h.nama}
      Nomor   : ${h.nomor}
      Kota    : ${h.kota}
      Email   : ${h.surel}
    `);
  }
}

// Hapus kontak berdasarkan nama
function hapusKontak(nama) {
  const awal = bukuKontak.length;

  for (let i = bukuKontak.length - 1; i >= 0; i--) {
    if (bukuKontak[i].nama.toLowerCase() === nama.toLowerCase()) {
      bukuKontak.splice(i, 1);
    }
  }

  if (bukuKontak.length < awal) {
    console.log("Kontak berhasil dihapus.");
  } else {
    console.log("Kontak tidak ditemukan.");
  }
}

// Update kontak berdasarkan nama pertama yang cocok
function ubahKontak(namaLama, namaBaru, nomorBaru, emailBaru, kotaBaru) {
  const target = bukuKontak.find(
    (x) => x.nama.toLowerCase() === namaLama.toLowerCase()
  );

  if (!target) {
    console.log("Kontak yang ingin diubah tidak ditemukan.");
    return;
  }

  target.nama = namaBaru || target.nama;
  target.nomor = nomorBaru || target.nomor;
  target.surel = emailBaru || target.surel;
  target.kota = kotaBaru || target.kota;

  console.log("Kontak berhasil diperbarui.");
}

// Contoh penggunaan
simpanKontak("Makima", 628333333333, "makima@example.com", "Sapporo");
simpanKontak("Power", 628444444444, "power@example.com", "Osaka");

// cariKontak("Makima");
// tampilkanKontak();
// hapusKontak("Rei Ayanami");
// ubahKontak("Power", "Power-chan", null, "pw@example.com", "Tokyo");
// tampilkanKontak();

cariKontak("Shino");
