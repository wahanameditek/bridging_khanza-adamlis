import { Pool } from "mysql2/promise";

export class PemeriksaanRepository {
  constructor(private pool: Pool) {}

  async insertDetails(details: any[], no_lab: string) {
    const queries = details.map((d) =>
      this.pool.query(
        `INSERT INTO h_item_pemeriksaan (
          h_registrasi_no_lab,
          hasil_pemeriksaan,
          keterangan,
          nilai_rujukan_tampilan_nilai_rujukan,
          item_pemeriksaan_kode,
          item_pemeriksaan_nama,
          item_pemeriksaan_satuan,
          item_pemeriksaan_metode,
          item_pemeriksaan_no_urut,
          kategori_pemeriksaan_nama,
          kategori_pemeriksaan_kode,
          sub_kategori_pemeriksaan_nama,
          sub_kategori_pemeriksaan_kode,
          flag_nama,
          flag_kode,
          flag_warna,
          flag_jenis_pewarnaan,
          status_lis_simrs
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          no_lab,
          d.hasil_pemeriksaan,
          d.keterangan,
          d.nilai_rujukan_tampilan_nilai_rujukan,
          d.item_pemeriksaan_kode,
          d.item_pemeriksaan_nama,
          d.item_pemeriksaan_satuan,
          d.item_pemeriksaan_metode,
          d.item_pemeriksaan_no_urut,
          d.kategori_pemeriksaan_nama,
          d.kategori_pemeriksaan_kode,
          d.sub_kategori_pemeriksaan_nama,
          d.sub_kategori_pemeriksaan_kode,
          d.flag_nama,
          d.flag_kode,
          d.flag_warna,
          d.flag_jenis_pewarnaan,
          d.status_lis_simrs || 0,
        ]
      )
    );

    await Promise.all(queries);
  }

  async deleteByNoLab(no_lab: string) {
    await this.pool.query(
      `DELETE FROM h_item_pemeriksaan WHERE h_registrasi_no_lab = ?`,
      [no_lab]
    );
  }
}
