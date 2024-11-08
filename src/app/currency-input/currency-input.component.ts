import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-currency-input',
  standalone: true,
  imports: [CommonModule, HttpClientModule,],
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
