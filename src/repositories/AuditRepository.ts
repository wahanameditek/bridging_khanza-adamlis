import { Pool } from "mysql2/promise";

export class AuditRepository {
  constructor(private pool: Pool) {}

  async log(data: {
    apiKey: string;
    endpoint: string;
    ip: string;
    parameters: string;
    resultCount: number;
    success: boolean;
    message?: string;
  }) {
    await this.pool.query(
      `INSERT INTO bridge_audit 
       (api_key, endpoint, ip_address, parameters, result_count, success, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.apiKey,
        data.endpoint,
        data.ip,
        data.parameters,
        data.resultCount,
        data.success ? 1 : 0,
        data.message || "",
      ]
    );
  }
}
