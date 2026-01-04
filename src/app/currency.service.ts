import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  private readonly apiUrl = 'https://api.frankfurter.app';

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<string[]> {
    return this.http
      .get<Record<string, string>>(`${this.apiUrl}/currencies`)
      .pipe(map(data => Object.keys(data)));
  }

  convert(
    amount: number,
    from: string,
    to: string
  ): Observable<ConversionResult> {
    return this.http
      .get<FrankfurterResponse>(`${this.apiUrl}/latest`, {
        params: { from, to }
      })
      .pipe(
        map(response => ({
          amount,
          from,
          to,
          rate: response.rates[to],
          convertedAmount: response.rates[to] * amount
        })),
        catchError(() => {
          throw new Error('Conversion failed');
        })
      );
  }
}

/* ====== Interfaces ====== */
export interface FrankfurterResponse {
  rates: Record<string, number>;
}

export interface ConversionResult {
  amount: number;
  from: string;
  to: string;
  rate: number;
  convertedAmount: number;
}