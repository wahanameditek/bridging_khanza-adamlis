import {
  IRegistrationRepository,
  ITindakanRepository,
  IRegistrationService
} from '../domain/interfaces';

import { PayloadItem } from '../domain/models';

export class RegistrationService implements IRegistrationService {
  private registrationRepo: IRegistrationRepository;
  private tindakanRepo: ITindakanRepository;

  constructor(
    registrationRepo: IRegistrationRepository,
    tindakanRepo: ITindakanRepository
  ) {
    this.registrationRepo = registrationRepo;
    this.tindakanRepo = tindakanRepo;
  }

  async getRegistrationPayload(noRegLike: string, limit: number): Promise<PayloadItem[]> {
    // 1. ambil data registrasi
    const regs = await this.registrationRepo.findByNoRegistrasiLike(noRegLike, limit);

    if (regs.length === 0) return [];

    // 2. kumpulkan semua no_registrasi
    const regNos = regs.map(r => r.no_registrasi);

    // 3. ambil tindakan untuk semua no_registrasi tsb sekali jalan
    const tindakanRows = await this.tindakanRepo.findByRegistrasiList(regNos);

    // 4. group tindakan per registrasi_no_registrasi
    const tindakanMap: Record<string, { kode_tindakan: string | null; nama_tindakan: string | null; }[]> = {};

    for (const t of tindakanRows) {
      if (!tindakanMap[t.registrasi_no_registrasi]) {
        tindakanMap[t.registrasi_no_registrasi] = [];
      }
      tindakanMap[t.registrasi_no_registrasi].push({
        kode_tindakan: t.kode_tindakan,
        nama_tindakan: t.nama_tindakan
      });
    }

    // 5. mapping ke payload final sesuai spec response
    const payload: PayloadItem[] = regs.map(r => ({
      no_reg: r.no_registrasi,
      waktu_registrasi:
        typeof r.waktu_registrasi === 'string'
          ? r.waktu_registrasi
          : r.waktu_registrasi.toISOString().slice(0, 19).replace('T', ' '), // yyyy-mm-dd HH:MM:SS

      diagnosa_awal: r.diagnosa_awal ?? null,
      keterangan_klinis: "-", // belum ada kolom, hardcode sementara
      kodeRS: r.kode_rs ?? null,

      pasien: {
        no_rm: r.pasien_no_rm ?? null,
        nama: r.pasien_nama ?? null,
        jenis_kelamin: r.pasien_jenis_kelamin ?? null,
        alamat: r.pasien_alamat ?? null,
        tanggal_lahir: r.pasien_tanggal_lahir ?? null,
        no_telephone: r.pasien_no_telphone ?? null,
        nik: r.pasien_nik ?? null,
        ras: r.ras ?? null,
        berat_badan: r.berat_badan ?? null,
        jenis_registrasi: r.jenis_registrasi ?? null,
        m_provinsi_id: r.m_provinsi_id ?? null,
        m_kabupaten_id: r.m_kabupaten_id ?? null,
        m_kecamatan_id: r.m_kecamatan_id ?? null
      },

      dokter_pengirim: {
        nama: r.dokter_pengirim_nama ?? null,
        kode: r.dokter_pengirim_kode ?? null
      },

      unit_asal: {
        nama: r.unit_asal_nama ?? null,
        kode: r.unit_asal_kode ?? null
      },

      tindakan: tindakanMap[r.no_registrasi] || [],

      penjamin: {
        nama: r.penjamin_nama ?? null,
        kode: r.penjamin_kode ?? null
      },

      icdt: {
        nama: r.nama_icdt ?? null,
        kode: r.kode_icdt ?? null
      }
    }));

    return payload;
  }
}
