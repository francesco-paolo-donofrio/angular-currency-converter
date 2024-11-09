import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CurrencyService } from './currency.service';




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
    if (this.amount && this.selectedCurrency && this.targetCurrency) {
      this.currencyService.convert(this.amount, this.selectedCurrency, this.targetCurrency)
        .subscribe((response) => {
          this.convertedAmount = response.rates[this.targetCurrency];
        });
    }
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



