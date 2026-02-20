import { Injectable } from '@nestjs/common';
import { FileUploadResponse } from './FileUploadResponse';

@Injectable()
export class CsvUploadService {
  async processFile(
    file: Express.Multer.File,
    databaseName: string,
    tableName: string,
  ): Promise<FileUploadResponse> {
    console.log('File received:', file.originalname);
    console.log('Target database: ', databaseName);
    console.log('Target table: ', tableName);
    return {
      filename: file.originalname,
      size: file.size,
      database: databaseName,
      table: tableName,
      rowsInserted: 0,
    };
  }
}
