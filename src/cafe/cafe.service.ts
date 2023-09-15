import { ManagedUpload } from 'aws-sdk/clients/s3';
import { Op } from 'sequelize';
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

  static async getCafes(location: string): Promise<Cafe[]> {
    try {
      let cafes: Cafe[];

      if (location) {
        cafes = await Cafe.findAll({ where: { location: { [Op.substring]: location } }, order: ['employeeCount', 'DESC'] });
      } else {
        cafes = await Cafe.findAll({ order: [['employeeCount', 'DESC']] });
      }

      if (!cafes) throw new Error('Cafe not found');

      return cafes;
    } catch (error: any) {
      if (error.message) throw error;

      throw new Error('Get cafe failed');
    }
  }

  static async updateCafe(cafeId: number, cafeDto: CafeDTO): Promise<CafeAttributes> {
    const trns = await sequelize.transaction();

    try {
      const cafe = await Cafe.findByPk(cafeId);

      if (!cafe) {
        throw new Error('Cafe not found');
      }

      let uploadData: ManagedUpload.SendData | string | null;
      let logo: string | null;

      if (cafeDto.logo) {
        uploadData = await upload(cafeDto.logo);
        logo = uploadData.Key;
      } else {
        uploadData = cafe.dataValues.logo;
        logo = uploadData;
      }

      const cafeInput = {
        name: cafeDto.name,
        description: cafeDto.description,
        logo,
        location: cafeDto.location,
      };

      await Cafe.update(cafeInput, { where: { id: cafeId }, transaction: trns });

      const updatedCafe = await Cafe.findOne({ where: { id: cafeId }, transaction: trns });

      if (!updatedCafe) throw new Error('Updated cafe not found');

      await trns.commit();

      return updatedCafe.dataValues;
    } catch (error: any) {
      await trns.rollback();

      if (error.message) throw error;

      throw new Error('Update cafe failed');
    }
  }

  static async removeCafe(cafeId: number): Promise<any> {
    const trns = await sequelize.transaction();

    try {
      const cafe = await Cafe.findOne({ where: { id: cafeId }, transaction: trns });

      if (!cafe) throw new Error('Cafe not found');

      await Cafe.destroy({ where: { id: cafeId }, transaction: trns });

      await trns.commit();

      return { cafe: cafe.dataValues.name, status: 'deleted', dateTime: new Date() };
    } catch (error: any) {
      await trns.rollback();

      if (error.message) throw error;

      throw new Error('Remove cafe failed');
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
