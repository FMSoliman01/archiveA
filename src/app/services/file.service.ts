import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private fileUrl = 'http://localhost:8001/file'; // المسار الخاص بالـ backend

  constructor(private http: HttpClient) {}

  // دالة لإرسال البيانات إلى الـ backend (POST)
  addFile(fileData: any): Observable<any> {
    const formData = new FormData();
    formData.append('letterNumber', fileData.number);
    formData.append('title', fileData.title);
    formData.append('description', fileData.description);
    formData.append('tags', fileData.tags.join(','));
    formData.append('attachmentCount', fileData.attachmentCount);
    formData.append('Directorate', fileData.Directorate);
    formData.append('responseDuration', fileData.responseDuration);
    formData.append('deliveryDate', fileData.deliveryDate);
    formData.append('fileDate', fileData.fileDate);


   // ✅ Append multiple files
  if (fileData.files && fileData.files.length > 0) {
    fileData.files.forEach((file: File) => {
      formData.append('files', file); // Use 'files' (plural) for multiple files
    });
  }

    return this.http.post(this.fileUrl, formData);
  }
  getFile(): Observable<any[]> {
    return this.http.get<any[]>(this.fileUrl);
  }

}
