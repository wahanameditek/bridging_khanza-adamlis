import { dbPool } from "../config/db";

import { RegistrationRepository } from "../repositories/RegistrationRepository";
import { TindakanRepository } from "../repositories/TindakanRepository";
import { AuditRepository } from "../repositories/AuditRepository";
import { HasilRepository } from "../repositories/HasilRepository";
import { PemeriksaanRepository } from "../repositories/PemeriksaanRepository";

import { RegistrationService } from "../services/RegistrationService";
import { AuditService } from "../services/AuditService";
import { HasilService } from "../services/HasilService";

import { RegistrationController } from "../controllers/RegistrationController";
import { HasilController } from "../controllers/HasilController";
import { HasilIngestLogRepository } from "../repositories/HasilIngestLogRepository";


// Repositories
const registrationRepository = new RegistrationRepository(dbPool);
const tindakanRepository = new TindakanRepository(dbPool);
const auditRepository = new AuditRepository(dbPool);
const hasilRepository = new HasilRepository(dbPool);
const pemeriksaanRepository = new PemeriksaanRepository(dbPool);
const hasilIngestLogRepository = new HasilIngestLogRepository(dbPool);


// Services
const registrationService = new RegistrationService(
  registrationRepository,
  tindakanRepository
);
const auditService = new AuditService(auditRepository);
const hasilService = new HasilService(
  hasilRepository,
  pemeriksaanRepository,
  hasilIngestLogRepository
);

// Controllers
const registrationController = new RegistrationController(
  registrationService,
  auditService
);
const hasilController = new HasilController(hasilService, auditService);

export const container = {
  registrationRepository,
  tindakanRepository,
  auditRepository,
  hasilRepository,
  pemeriksaanRepository,
  registrationService,
  hasilService,
  auditService,
  registrationController,
  hasilController,
  hasilIngestLogRepository
};
