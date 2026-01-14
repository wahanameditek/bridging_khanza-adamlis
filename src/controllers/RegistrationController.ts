import { Request, Response } from "express";
import { IRegistrationService } from "../domain/interfaces";
import { AuditService } from "../services/AuditService";

export class RegistrationController {
  constructor(
    private service: IRegistrationService,
    private auditService: AuditService
  ) {}

  getRegistrations = async (req: Request, res: Response) => {
    const apiKey = (req as any).apiKey || "unknown";
    const ip = req.ip;
    const { limit, no_registrasi } = req.params;
    const limitNum = parseInt(limit, 10);

    try {
      const payload = await this.service.getRegistrationPayload(
        no_registrasi,
        limitNum
      );
      const success = payload.length > 0;

      await this.auditService.record(
        apiKey || "",
        "/adam-lis/bridging",
        ip || "",
        { limit, no_registrasi },
        payload.length,
        success,
        success ? "Data registrasi ditemukan" : "Data tidak ditemukan"
      );

      if (!success) {
        return res.json({ success: false, message: "Data tidak ditemukan" });
      }

      return res.json({
        success: true,
        message: "Data registrasi ditemukan",
        payload,
      });
    } catch (err: any) {
      console.error("Error getRegistrations:", err);

      await this.auditService.record(
        apiKey as string,
        "/adam-lis/bridging",
        ip as string,
        { limit, no_registrasi },
        0,
        false,
        err.message
      );

      return res.status(500).json({
        success: false,
        message: err.message || "Internal server error",
      });
    }
  };
  getAllRegistrations = async (req: Request, res: Response) => {
  const apiKey = (req as any).apiKey || "";
  const ip = req.ip;
  const { limit } = req.params;
  const limitNum = limit ? parseInt(limit, 10) : 10; // default 10

  try {
    const payload = await this.service.getRegistrationPayload("", limitNum);
    const success = payload.length > 0;

    await this.auditService.record(
      apiKey || "",
      "/adam-lis/bridging/all",
      ip || "",
      { limit },
      payload.length,
      success,
      success ? "Data registrasi ditemukan" : "Tidak ada data registrasi"
    );

    if (!success) {
      return res.json({
        success: false,
        message: "Tidak ada data registrasi",
      });
    }

    return res.json({
      success: true,
      message: "Data registrasi ditemukan",
      payload,
    });
  } catch (err: any) {
    console.error("Error getAllRegistrations:", err);

    await this.auditService.record(
      apiKey || "",
      "/adam-lis/bridging/all",
      ip || "",
      { limit },
      0,
      false,
      err.message
    );

    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

}
