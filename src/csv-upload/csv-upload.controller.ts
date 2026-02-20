import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CsvUploadService } from './csv-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponseDTO } from 'src/dto/ApiResponseDTO';
import { FileUploadResponse } from './FileUploadResponse';

@Controller('api/csv-upload')
export class CsvUploadController {
  constructor(private readonly csvUploadService: CsvUploadService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsvFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('dbName') databaseName: string,
    @Body('tableName') tableName: string,
  ): Promise<ApiResponseDTO<FileUploadResponse>> {
    console.log(databaseName, 'databaseName ');
    console.log(tableName, 'tableName ');
    console.log(file, 'file ');

    if (!file) {
      return new ApiResponseDTO<FileUploadResponse>(
        false,
        null,
        'No file uploaded',
      );
    }
    if (file.mimetype !== 'text/csv' && !file.originalname.endsWith('.csv')) {
      return new ApiResponseDTO<FileUploadResponse>(
        false,
        null,
        'Only CSV files are allowed',
      );
    }
    if (!databaseName || databaseName.trim() === '') {
      return new ApiResponseDTO<FileUploadResponse>(
        false,
        null,
        'Database name is required',
      );
    }
    if (!tableName || tableName.trim() === '') {
      return new ApiResponseDTO<FileUploadResponse>(
        false,
        null,
        'Table name is required',
      );
    }
    const result = await this.csvUploadService.processFile(
      file,
      databaseName,
      tableName,
    );
    return new ApiResponseDTO<FileUploadResponse>(
      true,
      result,
      'File uploaded successfully',
    );
  }
}
