import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-currency-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currency-input.component.html',
  styleUrl: './currency-input.component.css'
})
export class CurrencyInputComponent {
  @Input() currencies: string[] = [];
  @Input() selectedCurrency: string = '';
  @Input() amount: number = 0;

  @Output() currencyChange = new EventEmitter<string>();
  @Output() amountChange = new EventEmitter<number>();


  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.fetchCurrencies();
  }

  fetchCurrencies(): void {
    this.http.get('https://api.frankfurter.app/currencies')
      .subscribe((data) => {
        this.currencies = Object.keys(data);});
  }

  onCurrencyChange(event: any) {
    this.currencyChange.emit(event.target.value);
  }

  onAmountChange(event: any) {
    this.amountChange.emit(event.target.value);
  }
}

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {
  private apiUrl = 'https://api.frankfurter.app';

  constructor(private http: HttpClient) { }

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