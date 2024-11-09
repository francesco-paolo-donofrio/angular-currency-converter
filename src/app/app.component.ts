import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CurrencyService } from './currency.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-currency-converter';
  currencies: string[] = [];
  fromCurrency: string = 'EUR';
  toCurrency: string = 'USD';
  fromAmount: number = 1;
  toAmount: number = 1;
  targetCurrency: string = '';
  errorMessage: string = '';

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.currencyService.getCurrencies().subscribe((data: any) => {
      this.currencies = Object.keys(data);
      // Imposta valori di default
      this.fromCurrency = 'EUR';
      this.toCurrency = 'USD';
      // Effettua la prima conversione
      this.convertCurrency();
    });
  }

  convertedAmount: number | null = null;
  convertCurrency() {
    this.currencyService.convert(this.amount, this.selectedCurrency, this.targetCurrency)
      .pipe(
        catchError(error => {
          console.error('Error occurred:', error);
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.convertedAmount = response.rates[this.targetCurrency];
        } else {
          // Display an error message in the UI
          this.errorMessage = 'Conversion failed. Please try again later.';
        }
      });
  }

  onFromCurrencyChange(newCurrency: string) {
    this.convertCurrency();
  }

  onToCurrencyChange(newCurrency: string) {
    this.convertCurrency();
  }

  onFromAmountChange(newAmount: number) {
    this.toAmount = newAmount; // Aggiorna immediatamente l'importo
    this.convertCurrency();
  }

  onToAmountChange(newAmount: number) {
    // Puoi implementare la conversione inversa se necessario
  }

  selectedCurrency: string = '';
amount: number = 0;

onCurrencySelected(currency: string) {
  this.selectedCurrency = currency;
}

onAmountEntered(amount: number) {
  this.amount = amount;
}
}



