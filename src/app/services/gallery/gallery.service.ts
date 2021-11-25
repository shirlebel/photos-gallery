import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) { }

  public getImages(): Observable<any> {
    let headers = new HttpHeaders()
    headers = headers.set('x-api-key', 'api-key-9a9ee023-a99d-456c-8e14-9a979ef115a6');
    return this.http.get(`https://api.jonathanczyzyk.com/api/v1/images/small`, { headers });
  }
}
