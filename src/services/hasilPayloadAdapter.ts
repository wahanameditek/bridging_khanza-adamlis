type AnyObj = Record<string, any>;

export function adaptHasilPayload(data: AnyObj): { header: AnyObj; detail: AnyObj[] } {
  // ✅ kalau sudah format lama, biarkan lewat
  if (data?.header && Array.isArray(data?.detail)) {
    return { header: data.header, detail: data.detail };
  }

  // ✅ format LIS (flat)
  const no_lab = String(data?.no_laboratorium ?? "").trim();
  if (!no_lab) throw new Error("no_laboratorium wajib diisi");

  const pasien = data?.pasien ?? {};
  const pemeriksaan = Array.isArray(data?.pemeriksaan) ? data.pemeriksaan : [];
  if (pemeriksaan.length === 0) throw new Error("pemeriksaan wajib berisi minimal 1 item");

  // header -> untuk tabel registrasi (atau header hasil)
  const header: AnyObj = {
    no_lab,
    no_registrasi: data?.no_registrasi ?? null,
    no_reg_rs: data?.no_registrasi ?? null, // jika SIMRS kamu menamai no_reg_rs
    waktu_registrasi: data?.waktu_registrasi ?? null,

    diagnosa_awal: data?.diagnosa_awal ?? null,
    keterangan_klinis: data?.keterangan_klinis ?? null,
    keterangan_hasil: data?.keterangan_hasil ?? null,

    kode_rs: data?.kode_rs ?? null,
    kode_lab: data?.kode_lab ?? null,

    // pasien
    pasien_no_rm: pasien?.no_rm ?? null,
    pasien_nama: pasien?.nama_pasien ?? null,
    pasien_jenis_kelamin: pasien?.jenis_kelamin ?? null,
    pasien_tanggal_lahir: pasien?.tanggal_lahir ?? null,
    pasien_nik: pasien?.nik ?? null,
    ras: pasien?.ras ?? null,
    berat_badan: pasien?.berat_badan ?? null,
    jenis_registrasi: pasien?.jenis_registrasi ?? null,
  };

  // detail -> untuk tabel hasil pemeriksaan
  const detail: AnyObj[] = pemeriksaan.map((p: AnyObj) => {
    const hasil = p?.hasil ?? {};

    // penting: di contoh user ada `"satuan": %` itu invalid JSON.
    // di server, kita anggap client sudah mengirim string: "%"
    return {
      // foreign key akan disuntikkan oleh service: header.no_lab
      // tapi boleh juga diisi untuk jaga-jaga
      no_lab,

      kategori_pemeriksaan_nama: p?.kategori_pemeriksaan?.nama_kategori ?? null,
      kategori_pemeriksaan_kode: p?.kategori_pemeriksaan?.kode_kategori ?? null, // optional kalau ada

      sub_kategori_pemeriksaan_nama: p?.sub_kategori_pemeriksaan?.nama_sub_kategori ?? null,
      sub_kategori_pemeriksaan_kode: p?.sub_kategori_pemeriksaan?.kode_sub_kategori ?? null, // optional

      status_bridging: p?.status_bridging === true ? 1 : 0,
      nomor_urut: p?.nomor_urut ?? null,

      // mapping LIS->SIMRS
      kode_tindakan_simrs: p?.kode_tindakan_simrs ?? null,
      item_pemeriksaan_nama: p?.nama_pemeriksaan_lis ?? null,
      item_pemeriksaan_kode: p?.kode_pemeriksaan_lis ?? null,

      status_duplo: p?.status_duplo === true ? 1 : 0,
      total_duplo: p?.total_duplo ?? 0,

      hasil_pemeriksaan: hasil?.nilai_hasil ?? null,
      nilai_rujukan: hasil?.nilai_rujukan ?? null,
      satuan: hasil?.satuan ?? null,
      flag_kode: hasil?.flag_kode ?? null,
    };
  });

  return { header, detail };
}
