import { HasilRepository } from "../repositories/HasilRepository";
import { PemeriksaanRepository } from "../repositories/PemeriksaanRepository";

export class HasilService {
  constructor(
    private hasilRepo: HasilRepository,
    private periksaRepo: PemeriksaanRepository
  ) {}

  async insertHasil(data: any) {
    const { header, detail } = data;

    const id = await this.hasilRepo.insertHeader(header);

    if (detail && Array.isArray(detail)) {
      await this.periksaRepo.insertDetails(detail, header.no_lab);
    }

    return id;
  }

  async updateHasil(no_lab: string, data: any) {
    const { header, detail } = data;

    await this.hasilRepo.updateHeader(no_lab, header);

    if (detail && Array.isArray(detail)) {
      await this.periksaRepo.deleteByNoLab(no_lab);
      await this.periksaRepo.insertDetails(detail, no_lab);
    }

    return true;
  }
}
