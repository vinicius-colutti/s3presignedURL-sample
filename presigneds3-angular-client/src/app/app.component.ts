import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'presigneds3-client';

  selectedFile: File | null = null;

  serverUrl = 'http://localhost:8084/presignedurl'

  constructor(private http: HttpClient) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  getPresignedUrl() {
    if (this.selectedFile) {
      const getUrlRequestBody = {
        filename: this.selectedFile.name
      };
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.post(this.serverUrl, getUrlRequestBody, { headers })
        .pipe().subscribe(response => {
          const urlInfo: any = response;
          this.uploadFile(urlInfo['presignedurl']);
        });
    }
  }

  uploadFile(preSignedUrl: string) {
    if (this.selectedFile) {
      const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.http.put(preSignedUrl, formData, { headers }).pipe().subscribe(resp => {
        console.log('Success!', resp)
      })
    }
  }

}
