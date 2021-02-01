import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

export class ResponseModel {
  success: boolean;
  otherInfo: any;
  code: number;
  data: any;
  msgList: string[];
  error: boolean;
  constructor(success: boolean, code: number, data?: any, msgList?: string[], error?: boolean, otherInfo?: any) {
    this.success = success;
    this.code = code;
    this.data = data;
    this.msgList = msgList || [];
    this.error = error == undefined ? false : error;
    this.otherInfo = otherInfo;
  }
}

@Injectable(
  {providedIn: 'root'}
)
export class HttpService {

  constructor(private http: HttpClient) { }

  async get({ url, params = new HttpParams() }: { url: string; params?: HttpParams; }){
   return this.http.get( url, { params: params }).toPromise()
  }
 async post(url: string, params = new HttpParams()){
  return  this.http.post( url, { params: params }).toPromise()
  }

}
