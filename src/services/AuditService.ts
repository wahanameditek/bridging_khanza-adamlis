import { AuditRepository } from "../repositories/AuditRepository";

export class AuditService {
  constructor(private auditRepo: AuditRepository) {}

  async record(
    apiKey: string,
    endpoint: string,
    ip: string,
    parameters: any,
    resultCount: number,
    success: boolean,
    message?: string
  ) {
    await this.auditRepo.log({
      apiKey,
      endpoint,
      ip,
      parameters: JSON.stringify(parameters),
      resultCount,
      success,
      message,
    });
  }
}
