import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CurrencyService } from './currency.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CurrencyInputComponent } from './currency-input/currency-input.component';
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
    this.currencyService.getCurrencies().subscribe((data: any) => {
      this.currencies = Object.keys(data);
      this.convertCurrency();
    });
  }

  convertCurrency() {
    this.currencyService.convert(this.fromAmount, this.fromCurrency, this.newCurrency)
      .pipe(
        catchError(error => {
          console.error('Error occurred:', error);
          this.errorMessage = 'Conversion failed. Please try again later.';
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response && response.rates && response.rates[this.newCurrency]) {
          // Usa la risposta per ottenere il tasso di conversione desiderato
          this.toAmount = response.rates[this.newCurrency] * this.fromAmount;
          this.errorMessage = ''; // Reset dell'errore in caso di successo
        } else {
          // Se non ci sono dati di conversione disponibili
          this.errorMessage = 'Conversion rate not available for the selected currency.';
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
    this.convertCurrency();
  }
}