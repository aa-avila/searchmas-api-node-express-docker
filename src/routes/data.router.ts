import { Router } from 'express';
import {
  requestExternalData,
  getData,
  exportCsv,
} from '../controllers/data.controller';
import requestValidator from '../middlewares/requestValidator';
import { RequestExternalDataDto } from '../dtos/requestExternalData.dto';

const router = Router();

router.post(
  '/external-data',
  requestValidator(RequestExternalDataDto, ['body']),
  requestExternalData,
);

router.get('/data', getData);

router.get('/export-csv', exportCsv);

export default router;
