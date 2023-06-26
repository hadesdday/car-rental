import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      "Response-Type": "json"
    })
  };
  constructor(private httpClient: HttpClient) { }

  uploadFile(data: FormData) {
    return this.httpClient.post('/api/file/upload', data, this.httpOptions);
  }

  deleteFile(fileName: string) {
    return this.httpClient.delete("/api/file/deleteFileByName/" + fileName, this.httpOptions);
  }
}
