import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {
  private apiUrl = 'https://api.frankfurter.app';

  private handleError(error: any) {
    console.error('Error occurred:', error);
    return of(error);
  }

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
    }).pipe(
      catchError(this.handleError)
    );;
  }
}
