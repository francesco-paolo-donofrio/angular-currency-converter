import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CurrencyService } from './currency.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currencies: string[] = [];

  fromCurrency = 'EUR';
  toCurrency = 'USD';
  fromAmount = 1;
  toAmount?: number;

  errorMessage = '';

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getCurrencies().subscribe({
      next: currencies => {
        this.currencies = currencies;
        this.convert();
      },
      error: () => {
        this.errorMessage = 'Failed to load currencies.';
      }
    });
  }

  swapCurrencies(): void {
    [this.fromCurrency, this.toCurrency] =
      [this.toCurrency, this.fromCurrency];
    this.convert();
  }

  convert(): void {
    if (!this.isValid()) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.currencyService
      .convert(this.fromAmount, this.fromCurrency, this.toCurrency)
      .subscribe({
        next: result => {
          this.toAmount = result.convertedAmount;
          this.errorMessage = '';
        },
        error: () => {
          this.toAmount = undefined;
          this.errorMessage = 'Conversion failed. Try again later.';
        }
      });
  }

  private isValid(): boolean {
    return !!this.fromAmount && !!this.fromCurrency && !!this.toCurrency;
  }
}