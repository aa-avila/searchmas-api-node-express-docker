import { Request, Response, NextFunction } from 'express';
import { DataService } from '../services/data/data.service';
import { RequestExternalDataDto } from '../dtos/requestExternalData.dto';

const dataService = new DataService();

const requestExternalData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { requester, requestReason } = req.body as RequestExternalDataDto;

    const response = await dataService.requestExternalData(
      requester.trim(),
      requestReason.trim(),
    );

    res.status(201).json({ data: response });
  } catch (error) {
    next(error);
  }
};

const getData = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await dataService.getAllWithStats();

    res.status(200).json({ data: response });
  } catch (error) {
    next(error);
  }
};

const exportCsv = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { csv, filename } = await dataService.exportCsv();

    res.header('Content-Type', 'text/csv');
    res.attachment(filename);
    return res.status(200).send(csv);
  } catch (error) {
    next(error);
  }
};

export { requestExternalData, getData, exportCsv };
