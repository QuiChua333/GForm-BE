import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;
@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: process.env.CLOUDINARY_FOLDER_NAME,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  uploadFromUrl(url: string): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader.upload(
        url,
        {
          folder: process.env.CLOUDINARY_FOLDER_NAME,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
    });
  }

  destroyFile(avatar: string): Promise<CloudinaryResponse> {
    const index = avatar.indexOf(process.env.CLOUDINARY_FOLDER_NAME);
    const indexOfDot = avatar.indexOf('.', index);
    const publicId = avatar.slice(index, indexOfDot);
    if (publicId === 'DEMO1/ekqfqrlfh0pu8ddfml9j') return;
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
