import { v4 as uuidv4 } from 'uuid';
import configs from '../configs/global.config';
import s3 from '../configs/s3.config';

export const upload = async (file: any) => {
  const fileKey = uuidv4().replace(/-/g, '').toUpperCase();
  const uploadParams = {
    Bucket: configs.aws.bucketname,
    Body: file.buffer,
    Key: fileKey,
    ContentType: file.mimetype,
  };

  const uploadData = await s3.upload(uploadParams).promise();

  return uploadData;
};

export const download = async (key: string) => {
  const downloadParams = {
    Bucket: configs.aws.bucketname,
    Key: key,
  };

  const fileStream = s3.getObject(downloadParams).createReadStream();

  return fileStream;
};
