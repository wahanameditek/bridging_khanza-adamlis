// Data dari tabel registrasi
export interface RegistrasiRow {
  no_registrasi: string;
  waktu_registrasi: Date | string;
  diagnosa_awal: string | null;
  kode_rs: string | null;

  pasien_no_rm: string | null;
  pasien_nama: string | null;
  pasien_jenis_kelamin: string | null;
  pasien_alamat: string | null;
  pasien_tanggal_lahir: string | null;
  pasien_no_telphone: string | null;
  pasien_nik: string | null;
  ras: string | null;
  berat_badan: string | null;
  jenis_registrasi: string | null;
  m_provinsi_id: string | null;
  m_kabupaten_id: string | null;
  m_kecamatan_id: string | null;

  dokter_pengirim_nama: string | null;
  dokter_pengirim_kode: string | null;

  unit_asal_nama: string | null;
  unit_asal_kode: string | null;

  penjamin_nama: string | null;
  penjamin_kode: string | null;

  nama_icdt: string | null;
  kode_icdt: string | null;
}

// Data dari tabel tindakan
export interface TindakanRow {
  registrasi_no_registrasi: string;
  kode_tindakan: string | null;
  nama_tindakan: string | null;
}

// Bentuk final payload per item sesuai spesifikasi API
export interface PayloadItem {
  no_reg: string;
  waktu_registrasi: string;
  diagnosa_awal: string | null;
  keterangan_klinis: string;
  kodeRS: string | null;
  pasien: {
    no_rm: string | null;
    nama: string | null;
    jenis_kelamin: string | null;
    alamat: string | null;
    tanggal_lahir: string | null;
    no_telephone: string | null;
    nik: string | null;
    ras: string | null;
    berat_badan: string | null;
    jenis_registrasi: string | null;
    m_provinsi_id: string | null;
    m_kabupaten_id: string | null;
    m_kecamatan_id: string | null;
  };
  dokter_pengirim: {
    nama: string | null;
    kode: string | null;
  };
  unit_asal: {
    nama: string | null;
    kode: string | null;
  };
  tindakan: Array<{
    kode_tindakan: string | null;
    nama_tindakan: string | null;
  }>;
  penjamin: {
    nama: string | null;
    kode: string | null;
  };
  icdt: {
    nama: string | null;
    kode: string | null;
  };
}
