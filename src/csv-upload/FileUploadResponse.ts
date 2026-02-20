export interface FileUploadResponse {
  filename: string;
  size: number;
  database: string;
  table: string;
  rowsInserted: number;
}
