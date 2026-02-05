import { Pool, ResultSetHeader } from "mysql2/promise";

export class PemeriksaanRepository {
  constructor(private pool: Pool) {}

  async upsertDetails(details: any[], noLab: string) {
    if (!details?.length) return;

    const cols = [
      "h_registrasi_no_lab",
      "kode_rs",
      "kode_lab",
      "waktu_verifikasi",
      "hasil_pemeriksaan",
      "keterangan",
      "nilai_rujukan_tampilan_nilai_rujukan",
      "item_pemeriksaan_kode",
      "item_pemeriksaan_nama",
      "item_pemeriksaan_satuan",
      "item_pemeriksaan_metode",
      "item_pemeriksaan_no_urut",
      "item_pemeriksaan_jenis_input",
      "item_pemeriksaan_is_tampilkan_waktu_periksa",
      "kategori_pemeriksaan_nama",
      "kategori_pemeriksaan_kode",
      "kategori_pemeriksaan_no_urut",
      "sub_kategori_pemeriksaan_nama",
      "sub_kategori_pemeriksaan_kode",
      "sub_kategori_pemeriksaan_no_urut",
      "flag_nama",
      "flag_kode",
      "flag_warna",
      "flag_jenis_pewarnaan",
      "status_lis_simrs",
    ];

    const rows = details.map((d) => [
      noLab,
      d.kode_rs ?? null,
      d.kode_lab ?? null,
      d.waktu_verifikasi ?? "0000-00-00 00:00:00",
      d.hasil_pemeriksaan ?? null,
      d.keterangan ?? null,
      d.nilai_rujukan_tampilan_nilai_rujukan ?? null,
      d.item_pemeriksaan_kode ?? null,
      d.item_pemeriksaan_nama ?? null,
      d.item_pemeriksaan_satuan ?? null,
      d.item_pemeriksaan_metode ?? null,
      d.item_pemeriksaan_no_urut ?? null,
      d.item_pemeriksaan_jenis_input ?? null,
      d.item_pemeriksaan_is_tampilkan_waktu_periksa ?? null,
      d.kategori_pemeriksaan_nama ?? null,
      d.kategori_pemeriksaan_kode ?? null,
      d.kategori_pemeriksaan_no_urut ?? null,
      d.sub_kategori_pemeriksaan_nama ?? null,
      d.sub_kategori_pemeriksaan_kode ?? null,
      d.sub_kategori_pemeriksaan_no_urut ?? null,
      d.flag_nama ?? null,
      d.flag_kode ?? null,
      d.flag_warna ?? null,
      d.flag_jenis_pewarnaan ?? null,
      d.status_lis_simrs ?? 0,
    ]);

    const placeholders = rows.map(() => `(${cols.map(() => "?").join(",")})`).join(",");
    const flat = rows.flat();

    // jangan update key uniknya
    const updateCols = cols.filter(
      (c) => !["h_registrasi_no_lab", "item_pemeriksaan_kode"].includes(c)
    );

    const updateSet = updateCols.map((c) => `${c} = VALUES(${c})`).join(", ");

    const sql = `
      INSERT INTO h_pemeriksaan (${cols.join(",")})
      VALUES ${placeholders}
      ON DUPLICATE KEY UPDATE
        ${updateSet}
    `;

    await this.pool.query<ResultSetHeader>(sql, flat);
  }
}
