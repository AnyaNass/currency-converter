import { Component } from "@angular/core";
import { CurrencyRateService } from "src/app/services/currencyRate.service";

@Component({
	selector: 'app-currency-converter',
	templateUrl: './currencyConverter.component.html',
	styleUrls: ['./currencyConverter.component.scss']
})

export class CurrencyConverterComponent {
	allCurrencies: string[] = [];
	firstInput: string = "";
	secondInput: string = "";
	selectedCurrencyFirst: string = "";
	selectedCurrencySecond: string = "";
	showAlert: boolean = false;

	constructor(private currencyRateService: CurrencyRateService) {
	}

	onSelected(value: string, name: string) {
		if (name === "currency-first") {
			this.selectedCurrencyFirst = value;
		} else {
			this.selectedCurrencySecond = value;
		}

		if (this.firstInput || this.secondInput) {
			const query = name === "currency-first" ? { from: this.selectedCurrencyFirst, to: this.selectedCurrencySecond, amount: this.firstInput } : { from: this.selectedCurrencySecond, to: this.selectedCurrencyFirst, amount: this.secondInput };

			this.currencyRateService.getConvertedValue(query)
				.subscribe(response => {
					if (name === "currency-first") {
						this.secondInput = response.result;
					} else {
						this.firstInput = response.result;
					}
				})
		}
	}

	onInputChange(value: string, name: string) {
		if (!+value) {
			this.showAlert = true;
		}

		if (+value === 0 || value === "") {
			this.firstInput = "";
			this.secondInput = "";
			this.showAlert = false;
		}

		if (+value > 0) {
			this.showAlert = false;
			const query = name === "amount-first" ? { from: this.selectedCurrencyFirst, to: this.selectedCurrencySecond, amount: value } : { from: this.selectedCurrencySecond, to: this.selectedCurrencyFirst, amount: value };

			this.currencyRateService.getConvertedValue(query)
				.subscribe(response => {
					if (name === "amount-first") {
						this.secondInput = response.result;
					} else {
						this.firstInput = response.result;
					}
				})
		}
	}

	ngOnInit(): void {
		this.currencyRateService.getAllCurrencies().subscribe(response => {
			const currencies = Object.keys(response.symbols)
			this.allCurrencies = currencies;
			this.selectedCurrencyFirst = this.allCurrencies[0];
			this.selectedCurrencySecond = this.allCurrencies[0];
		})
	}
}