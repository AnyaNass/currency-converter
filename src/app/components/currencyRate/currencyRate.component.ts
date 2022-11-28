import { Component, OnInit } from "@angular/core";
import { CurrencyRateService } from "src/app/services/currencyRate.service";


@Component({
	selector: 'app-currency-rate',
	templateUrl: './currencyRate.component.html',
	styleUrls: ['./currencyRate.component.scss'],
})

export class CurrencyRateComponent {
	currencyRate: { name: string, value: number }[] = [];

	constructor(private currencyRateService: CurrencyRateService) {
	}

	ngOnInit(): void {
		this.currencyRateService.getEuroRate().subscribe(response => {
			const UAH = response.rates.UAH;
			this.currencyRate = [...this.currencyRate, { name: 'EUR', value: UAH }]
		})

		this.currencyRateService.getDollarRate().subscribe(response => {
			const UAH = response.rates.UAH;
			this.currencyRate = [...this.currencyRate, { name: 'USD', value: UAH }]
		})

	}
}

