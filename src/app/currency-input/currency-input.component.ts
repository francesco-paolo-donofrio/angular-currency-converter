import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.css']
})
export class CurrencyInputComponent implements OnInit {
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
      .subscribe((data: any) => {
        this.currencies = Object.keys(data);
      });
  }

  onCurrencyChange(event: any) {
    this.currencyChange.emit(event.target.value);
  }

  onAmountChange(event: any) {
    this.amountChange.emit(event.target.value);
  }
}