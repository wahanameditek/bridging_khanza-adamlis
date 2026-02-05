import { Request, Response } from "express";
import { HasilService } from "../services/HasilService";
import { AuditService } from "../services/AuditService";
import { getRequestId } from "../services/RequestId"; // helper di atas

export class HasilController {
  constructor(
    private hasilService: HasilService,
    private auditService: AuditService
  ) {}

  insert = async (req: Request, res: Response) => {
    const apiKey = (req as any).apiKey || "";
    const ip = req.ip;

    try {
      // set requestId supaya service bisa idempotent
      (req as any).requestId = getRequestId(req, req.body);

      const { id, skipped } = await this.hasilService.insertHasil(req, req.body);

      await this.auditService.record(
        apiKey,
        "/adam-lis/hasil",
        ip || "",
        { requestId: (req as any).requestId, body: req.body },
        1,
        true,
        skipped ? "Insert hasil duplicate (skipped details)" : "Insert hasil berhasil"
      );

      return res.json({
        success: true,
        message: "Data berhasil Disimpan",
        payload: skipped ? "Duplicate request (ignored)" : "Message from simrs",
      });
    } catch (err: any) {
      await this.auditService.record(
        apiKey,
        "/adam-lis/hasil",
        ip || "",
        req.body,
        0,
        false,
        err.message
      );

      return res.status(500).json({
        success: false,
        message: `Data gagal disimpan karena ${err.message}`,
      });
    }
  };

  update = async (req: Request, res: Response) => {
    const apiKey = (req as any).apiKey || "";
    const ip = req.ip;

    try {
      const noLab =
        req.body?.no_laboratorium ||
        req.body?.no_lab ||
        req.body?.header?.no_lab ||
        req.body?.header?.no_laboratorium;

      if (!noLab) {
        return res.status(400).json({
          success: false,
          message: "no_laboratorium wajib diisi",
        });
      }

      await this.hasilService.updateHasil(noLab, req.body);

      await this.auditService.record(
        apiKey,
        "/adam-lis/hasil/update",
        ip || "",
        req.body,
        1,
        true,
        "Update hasil berhasil"
      );

      return res.json({
        success: true,
        message: "Hasil berhasil diperbarui",
      });
    } catch (err: any) {
      await this.auditService.record(
        apiKey,
        "/adam-lis/hasil/update",
        ip || "",
        req.body,
        0,
        false,
        err.message
      );

      return res.status(500).json({
        success: false,
        message: `Data gagal update karena ${err.message}`,
      });
    }
  };

}
