import { ManagedUpload } from 'aws-sdk/clients/s3';
import sequelize from '../configs/database.config';
import CafeDTO from './cafe.dto';
import Cafe from './cafe.model';
import { download, upload } from '../utils/file.util';
import { CafeAttributes } from './cafe.types';

class CafeService {
  static async createCafe(cafeDto: CafeDTO): Promise<CafeAttributes> {
    const trns = await sequelize.transaction();

    try {
      let uploadData: ManagedUpload.SendData | null;

      if (cafeDto.logo) {
        uploadData = await upload(cafeDto.logo);
      } else {
        uploadData = null;
      }

      const cafeInput = {
        name: cafeDto.name,
        description: cafeDto.description,
        logo: uploadData ? uploadData.Key : null,
        location: cafeDto.location,
      };

      const cafe = await Cafe.create(cafeInput, { transaction: trns });

      await trns.commit();

      return cafe.dataValues;
    } catch (error: any) {
      await trns.rollback();

      if (error.message) throw error;

      throw new Error('Create cafe failed');
    }
  }

  static async getCafeLogo(key: string): Promise<any> {
    try {
      return await download(key);
    } catch (error) {
      throw new Error('download cafe logo failed');
    }
  }
}

export default CafeService;
