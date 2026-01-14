import { Router } from 'express';
import { RegistrationController } from '../controllers/RegistrationController';
import { container } from '../container/container';

const router = Router();

// Ambil controller dari container (DI)
const registrationController: RegistrationController = container.registrationController;

// Spec: GET /adam-lis/bridging/:limit/:no_registrasi
router.get(
  '/bridging/:limit/:no_registrasi',
  registrationController.getRegistrations
);
// endpoint baru (get all)
router.get("/bridging/all/:limit?", registrationController.getAllRegistrations);


export { router as registrationRoutes };
