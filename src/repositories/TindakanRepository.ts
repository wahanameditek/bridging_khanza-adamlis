import { Pool } from 'mysql2/promise';
import { ITindakanRepository } from '../domain/interfaces';
import { TindakanRow } from '../domain/models';

export class TindakanRepository implements ITindakanRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findByRegistrasiList(noRegList: string[]): Promise<TindakanRow[]> {
    if (noRegList.length === 0) return [];

    // mysql2/promise akan otomatis escape array untuk IN (?) kalau kita pass [array]
    const [rows] = await this.pool.query(
      `
      SELECT
        registrasi_no_registrasi,
        kode_tindakan,
        nama_tindakan
      FROM tindakan
      WHERE registrasi_no_registrasi IN (?)
    `,
      [noRegList]
    );

    return rows as TindakanRow[];
  }
}
