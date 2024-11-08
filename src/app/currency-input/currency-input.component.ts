import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-currency-input',
  standalone: true,
  imports: [],
  templateUrl: './currency-input.component.html',
  styleUrl: './currency-input.component.css'
})
export class CurrencyInputComponent {
  @Input() currencies: string[] = [];
  @Input() selectedCurrency: string = '';
  @Input() amount: number = 0;

  @Output() currencyChange = new EventEmitter<string>();
  @Output() amountChange = new EventEmitter<number>();

  onCurrencyChange(event: any) {
    this.currencyChange.emit(event.target.value);
  }

  onAmountChange(event: any) {
    this.amountChange.emit(event.target.value);
  }
}
