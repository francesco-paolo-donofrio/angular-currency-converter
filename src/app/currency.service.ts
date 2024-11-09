import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://api.frankfurter.app';

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/currencies`);
  }

  convert(amount: number, from: string, to: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/latest`, {
      params: {
        amount: amount.toString(),
        from: from,
        to: to
      }
    });
  }
}
