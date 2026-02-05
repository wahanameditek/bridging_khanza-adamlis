import { HasilRepository } from "../repositories/HasilRepository";
import { PemeriksaanRepository } from "../repositories/PemeriksaanRepository";
import { HasilIngestLogRepository } from "../repositories/HasilIngestLogRepository";
import { adaptHasilPayload } from "./hasilPayloadAdapter";

export class HasilService {
  constructor(
    private hasilRepo: HasilRepository,
    private periksaRepo: PemeriksaanRepository,
    private ingestLogRepo: HasilIngestLogRepository // <-- wajib
  ) {}

  async insertHasil(req: any, data: any) {
    const { header, detail } = adaptHasilPayload(data);

    const requestId = req.requestId as string;

    // idempotency
    const isNew = await this.ingestLogRepo.tryInsert(requestId, header.no_lab);

    const id = await this.hasilRepo.insertHeader(header);

    if (isNew && detail && Array.isArray(detail) && detail.length > 0) {
      await this.periksaRepo.upsertDetails(detail, header.no_lab);
    }

    return { id, skipped: !isNew };
  }

  async updateHasil(no_lab: string, data: any) {
    const { header, detail } = adaptHasilPayload(data);

    await this.hasilRepo.updateHeader(no_lab, header);

    if (detail && Array.isArray(detail) && detail.length > 0) {
      await this.periksaRepo.upsertDetails(detail, no_lab); // ✅ replace per kode
    }

    return true;
  }

}
