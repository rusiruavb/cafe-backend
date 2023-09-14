import S3 from 'aws-sdk/clients/s3';
import configs from './global.config';

const s3 = new S3({
  region: configs.aws.region,
  credentials: {
    accessKeyId: configs.aws.accessKey,
    secretAccessKey: configs.aws.secretKey,
  },
});

export default s3;
