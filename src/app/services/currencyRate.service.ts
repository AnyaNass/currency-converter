import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})

export class CurrencyRateService {
	constructor(private http: HttpClient) {

	}

	getEuroRate(): Observable<any> {
		return this.http.get('https://api.exchangerate.host/latest?base=EUR')
	}

	getDollarRate(): Observable<any> {
		return this.http.get('https://api.exchangerate.host/latest?base=USD')
	}

	getConvertedValue(query: { from: string, to: string, amount: string }): Observable<any> {
		return this.http.get(`https://api.exchangerate.host/convert?from=${query.from}&to=${query.to}&amount=${query.amount}`)
	}

	getAllCurrencies(): Observable<any> {
		return this.http.get('https://api.exchangerate.host/symbols')
	}
}