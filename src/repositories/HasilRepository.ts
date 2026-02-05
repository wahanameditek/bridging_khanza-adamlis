import { Pool, RowDataPacket, ResultSetHeader } from "mysql2/promise";

export class HasilRepository {
  constructor(private pool: Pool) {}

  async insertHeader(data: any) {
    // NOTE: butuh UNIQUE(no_lab)
    const sql = `
      INSERT INTO h_registrasi (
        no_lab, no_reg_rs, diagnosa_awal, keterangan_klinis, keterangan_hasil,
        expertise, waktu_expertise, waktu_terbit, waktu_registrasi, total_bayar,
        pasien_no_rm, pasien_nama, pasien_jenis_kelamin, pasien_tanggal_lahir,
        pasien_alamat, pasien_no_telphone, pasien_umur_hari, pasien_umur_bulan,
        pasien_umur_tahun, dokter_pengirim_nama, dokter_pengirim_kode,
        dokter_pengirim_alamat, dokter_pengirim_no_telphone,
        dokter_pengirim_spesialis_nama, dokter_pengirim_spesialis_kode,
        unit_asal_nama, unit_asal_kode, unit_asal_kelas, unit_asal_keterangan,
        unit_asal_jenis_nama, unit_asal_jenis_kode,
        penjamin_nama, penjamin_kode, penjamin_jenis_nama, penjamin_jenis_kode,
        pasien_nik
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
      ON DUPLICATE KEY UPDATE
        no_reg_rs = VALUES(no_reg_rs),
        diagnosa_awal = VALUES(diagnosa_awal),
        keterangan_klinis = VALUES(keterangan_klinis),
        keterangan_hasil = VALUES(keterangan_hasil),
        expertise = VALUES(expertise),
        waktu_expertise = VALUES(waktu_expertise),
        waktu_terbit = VALUES(waktu_terbit),
        waktu_registrasi = VALUES(waktu_registrasi),
        total_bayar = VALUES(total_bayar),

        pasien_no_rm = VALUES(pasien_no_rm),
        pasien_nama = VALUES(pasien_nama),
        pasien_jenis_kelamin = VALUES(pasien_jenis_kelamin),
        pasien_tanggal_lahir = VALUES(pasien_tanggal_lahir),
        pasien_alamat = VALUES(pasien_alamat),
        pasien_no_telphone = VALUES(pasien_no_telphone),
        pasien_umur_hari = VALUES(pasien_umur_hari),
        pasien_umur_bulan = VALUES(pasien_umur_bulan),
        pasien_umur_tahun = VALUES(pasien_umur_tahun),

        dokter_pengirim_nama = VALUES(dokter_pengirim_nama),
        dokter_pengirim_kode = VALUES(dokter_pengirim_kode),
        dokter_pengirim_alamat = VALUES(dokter_pengirim_alamat),
        dokter_pengirim_no_telphone = VALUES(dokter_pengirim_no_telphone),
        dokter_pengirim_spesialis_nama = VALUES(dokter_pengirim_spesialis_nama),
        dokter_pengirim_spesialis_kode = VALUES(dokter_pengirim_spesialis_kode),

        unit_asal_nama = VALUES(unit_asal_nama),
        unit_asal_kode = VALUES(unit_asal_kode),
        unit_asal_kelas = VALUES(unit_asal_kelas),
        unit_asal_keterangan = VALUES(unit_asal_keterangan),
        unit_asal_jenis_nama = VALUES(unit_asal_jenis_nama),
        unit_asal_jenis_kode = VALUES(unit_asal_jenis_kode),

        penjamin_nama = VALUES(penjamin_nama),
        penjamin_kode = VALUES(penjamin_kode),
        penjamin_jenis_nama = VALUES(penjamin_jenis_nama),
        penjamin_jenis_kode = VALUES(penjamin_jenis_kode),

        pasien_nik = VALUES(pasien_nik)
    `;

    const params = [
      data.no_lab,
      data.no_reg_rs,
      data.diagnosa_awal,
      data.keterangan_klinis,
      data.keterangan_hasil,
      data.expertise,
      data.waktu_expertise,
      data.waktu_terbit,
      data.waktu_registrasi,
      data.total_bayar,
      data.pasien_no_rm,
      data.pasien_nama,
      data.pasien_jenis_kelamin,
      data.pasien_tanggal_lahir,
      data.pasien_alamat,
      data.pasien_no_telphone,
      data.pasien_umur_hari,
      data.pasien_umur_bulan,
      data.pasien_umur_tahun,
      data.dokter_pengirim_nama,
      data.dokter_pengirim_kode,
      data.dokter_pengirim_alamat,
      data.dokter_pengirim_no_telphone,
      data.dokter_pengirim_spesialis_nama,
      data.dokter_pengirim_spesialis_kode,
      data.unit_asal_nama,
      data.unit_asal_kode,
      data.unit_asal_kelas,
      data.unit_asal_keterangan,
      data.unit_asal_jenis_nama,
      data.unit_asal_jenis_kode,
      data.penjamin_nama,
      data.penjamin_kode,
      data.penjamin_jenis_nama,
      data.penjamin_jenis_kode,
      data.pasien_nik,
    ];

    const [result] = await this.pool.query<ResultSetHeader>(sql, params);

    // insertId bisa 0 kalau UPDATE terjadi, jadi ambil id existing
    const [rows] = await this.pool.query<RowDataPacket[]>(
      `SELECT id FROM h_registrasi WHERE no_lab = ? LIMIT 1`,
      [data.no_lab]
    );

    return Number(rows?.[0]?.id ?? result.insertId ?? 0);
  }

  async updateHeader(no_lab: string, data: any) {
    // supaya konsisten & idempotent, cukup panggil UPSERT juga
    return this.insertHeader({ ...data, no_lab });
  }
}
