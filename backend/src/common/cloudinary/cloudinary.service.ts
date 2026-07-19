import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // <--- 1. Importamos ConfigService
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
const toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  // 2. Inyectamos ConfigService en el constructor
  constructor(private configService: ConfigService) { 
    
    // 3. Leemos las variables del .env de forma segura
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
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