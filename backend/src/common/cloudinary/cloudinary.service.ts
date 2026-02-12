import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
const toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  constructor() {
    // Reemplaza con tus datos de la consola de Cloudinary
    // Lo ideal es que estos datos estén en tu archivo .env
    cloudinary.config({
      cloud_name: 'dye6oqzgy',
      api_key: '626518326286439',
      api_secret: 'xvMIV0nJvLPhtBdNPx8duzgQCtQ',
    });
  }

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { folder: 'nesia_servicios' },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Cloudinary upload result is undefined'));
        resolve(result);
      },
    );
      
      // Enviamos el buffer del archivo al stream de subida
      toStream(file.buffer).pipe(upload);
    });
  }
}