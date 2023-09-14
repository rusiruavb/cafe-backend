import { Request, Response } from 'express';
import CafeDTO from './cafe.dto';
import CafeService from './cafe.service';

class CafeController {
  static async createCafe(req: Request, res: Response): Promise<Response> {
    if (!req.body) {
      return res.status(400).json({ message: 'Bad request' });
    }

    const {
      name, description, location,
    } = req.body;

    if (!name && !description && !location) {
      return res.status(400).json({ message: 'Bad request' });
    }

    try {
      let file: any;
      if (req.file) {
        file = req.file;
      }

      const cafeDto = new CafeDTO(name, description, file, location);

      const cafe = await CafeService.createCafe(cafeDto);

      return res.status(201).json({ cafe });
    } catch (error: any) {
      return res.status(500).json({ message: error.message, reason: JSON.stringify(error) });
    }
  }

  static async getCafeLogo(req: Request, res: Response): Promise<Response> {
    if (!req.params.key) {
      return res.status(400).json({ message: 'Bad request' });
    }

    try {
      const imageStream = await CafeService.getCafeLogo(req.params.key);
      imageStream.pipe(res);

      return res;
    } catch (error: any) {
      return res.status(500).json({ message: error.message, reason: JSON.stringify(error) });
    }
  }
}

export default CafeController;
