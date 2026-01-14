import { Request, Response } from "express";
import { HasilService } from "../services/HasilService";
import { AuditService } from "../services/AuditService";

export class HasilController {
  constructor(
    private hasilService: HasilService,
    private auditService: AuditService
  ) {}

  insert = async (req: Request, res: Response) => {
    const apiKey = (req as any).apiKey || "";
    const ip = req.ip;

    try {
      const id = await this.hasilService.insertHasil(req.body);

      await this.auditService.record(
        apiKey,
        "/adam-lis/hasil",
        ip || "",
        req.body,
        1,
        true,
        "Insert hasil berhasil"
      );

      res.json({
        success: true,
        message: "Hasil berhasil disimpan",
        id,
      });
    } catch (err: any) {
      console.error(err);

      await this.auditService.record(
        apiKey,
        "/adam-lis/hasil",
        ip || "",
        req.body,
        0,
        false,
        err.message
      );

      res.status(500).json({ success: false, message: err.message });
    }
  };

  update = async (req: Request, res: Response) => {
    const apiKey = (req as any).apiKey || "";
    const ip = req.ip;
    const { no_lab } = req.params;

    try {
      await this.hasilService.updateHasil(no_lab, req.body);

      await this.auditService.record(
        apiKey,
        "/adam-lis/hasil/" + no_lab,
        ip || "",
        req.body,
        1,
        true,
        "Update hasil berhasil"
      );

      res.json({
        success: true,
        message: "Hasil berhasil diperbarui",
      });
    } catch (err: any) {
      console.error(err);

      await this.auditService.record(
        apiKey,
        "/adam-lis/hasil/" + no_lab,
        ip || "",
        req.body,
        0,
        false,
        err.message
      );

      res.status(500).json({ success: false, message: err.message });
    }
  };
}
