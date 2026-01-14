import { Pool } from "mysql2/promise";

export class HasilRepository {
  constructor(private pool: Pool) {}

  async insertHeader(data: any) {
    const [result] = await this.pool.query(
      `INSERT INTO h_registrasi (
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
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
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
      ]
    );

    return (result as any).insertId;
  }

  async updateHeader(no_lab: string, data: any) {
    const [result] = await this.pool.query(
      `UPDATE h_registrasi SET
        diagnosa_awal = ?, keterangan_klinis = ?, keterangan_hasil = ?, expertise = ?,
        waktu_expertise = ?, waktu_terbit = ?, total_bayar = ?, pasien_no_rm = ?,
        pasien_nama = ?, pasien_jenis_kelamin = ?, pasien_tanggal_lahir = ?, pasien_alamat = ?,
        pasien_no_telphone = ?, dokter_pengirim_nama = ?, dokter_pengirim_kode = ?,
        unit_asal_nama = ?, unit_asal_kode = ?, penjamin_nama = ?, penjamin_kode = ?
      WHERE no_lab = ?`,
      [
        data.diagnosa_awal,
        data.keterangan_klinis,
        data.keterangan_hasil,
        data.expertise,
        data.waktu_expertise,
        data.waktu_terbit,
        data.total_bayar,
        data.pasien_no_rm,
        data.pasien_nama,
        data.pasien_jenis_kelamin,
        data.pasien_tanggal_lahir,
        data.pasien_alamat,
        data.pasien_no_telphone,
        data.dokter_pengirim_nama,
        data.dokter_pengirim_kode,
        data.unit_asal_nama,
        data.unit_asal_kode,
        data.penjamin_nama,
        data.penjamin_kode,
        no_lab,
      ]
    );

    return result;
  }
}
