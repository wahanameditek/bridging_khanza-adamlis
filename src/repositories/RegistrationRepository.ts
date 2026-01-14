import { Pool } from 'mysql2/promise';
import { IRegistrationRepository } from '../domain/interfaces';
import { RegistrasiRow } from '../domain/models';

export class RegistrationRepository implements IRegistrationRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

async findByNoRegistrasiLike(noRegLike: string, limit: number): Promise<RegistrasiRow[]> {
  const safeLimit = Math.min(Math.max(limit, 1), 100); // allow up to 100 for bulk

  let sql = `
    SELECT * FROM registrasi
    ORDER BY waktu_registrasi DESC
    LIMIT ?
  `;
  let params: any[] = [safeLimit];

  if (noRegLike && noRegLike.trim() !== "") {
    sql = `
      SELECT * FROM registrasi
      WHERE no_registrasi LIKE ?
      ORDER BY waktu_registrasi DESC
      LIMIT ?
    `;
    params = [`%${noRegLike}%`, safeLimit];
  }

  const [rows] = await this.pool.query(sql, params);
  return rows as RegistrasiRow[];
}

}
