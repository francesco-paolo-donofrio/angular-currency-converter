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
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent implements OnInit {
  title = 'angular-currency-converter';
  currencies: string[] = [];
  fromCurrency: string = 'EUR';
  newCurrency: string = 'USD';
  fromAmount: number = 1;
  toAmount: number | null = null;
  errorMessage: string = '';

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.currencyService.getCurrencies().subscribe({
      next: (data: any) => {
        this.currencies = Object.keys(data);
        this.convertCurrency();
      },
      error: (error) => {
        console.error('Error loading currencies:', error);
        this.errorMessage = 'Failed to load currencies. Please refresh the page.';
      }
    });
  }

  convertCurrency() {
    if (!this.fromAmount || !this.fromCurrency || !this.newCurrency) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.currencyService.convert(this.fromAmount, this.fromCurrency, this.newCurrency)
      .pipe(
        catchError(error => {
          console.error('Error occurred:', error);
          this.errorMessage = 'Conversion failed. Please try again later.';
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          if (response && response.convertedAmount) {
            this.toAmount = response.convertedAmount;
            this.errorMessage = '';
          } else {
            this.errorMessage = 'Conversion rate not available for the selected currency.';
            this.toAmount = null;
          }
        },
        error: (error) => {
          console.error('Conversion error:', error);
          this.errorMessage = 'An error occurred during conversion.';
          this.toAmount = null;
        }
      });
  }

  onFromCurrencyChange(newCurrency: string) {
    this.fromCurrency = newCurrency;
    this.convertCurrency();
  }

  onToCurrencyChange(newCurrency: string) {
    this.newCurrency = newCurrency;
    this.convertCurrency();
  }

  onFromAmountChange(newAmount: number) {
    this.fromAmount = newAmount;
    if (!isNaN(newAmount)) {
      this.convertCurrency();
    }
  }
}