import { Pool, ResultSetHeader } from "mysql2/promise";

export class HasilIngestLogRepository {
  constructor(private pool: Pool) {}

  async tryInsert(requestId: string, noLab: string): Promise<boolean> {
    try {
      const [r] = await this.pool.query<ResultSetHeader>(
        `INSERT INTO hasil_ingest_log (request_id, no_lab) VALUES (?, ?)`,
        [requestId, noLab]
      );
      return (r.affectedRows ?? 0) > 0;
    } catch (e: any) {
      if (e?.code === "ER_DUP_ENTRY") return false;
      throw e;
    }
  }
}
