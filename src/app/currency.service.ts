import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
      params: { from, to }
    }).pipe(
      catchError(this.handleError)
    ).pipe(
      // Calcola l'importo finale moltiplicando il tasso di cambio ottenuto per `amount`
      map((data: any) => ({
        convertedAmount: data.rates[to] * amount,
        rate: data.rates[to],
        from,
        to,
        amount
      })),
      catchError(this.handleError)
    );
  }
}
