import { Customer } from './../models/customer';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemCustomerService implements InMemoryDbService {
  private customersUrl = 'api/customers';

  constructor(private http: HttpClient) { }

  createDb() {
    let customers = [
      new Customer(1, 'Marquis', 'Warren', 'MarquisWarren@gmail.com', '5124561234'),
      new Customer(2, 'John', 'Ruth', 'JohnRuth@gmail.com', '5124561234'),
      new Customer(3, 'Daisy', 'Domergue', 'DaisyDomergue@gmail.com', '5124561234'),
      new Customer(4, 'Minnie', 'Mink', 'MinnieMink@aol.com', '5124561234'),
      new Customer(5, 'Oswaldo', 'Mobray', 'OswaldoMobray@hotmail.com', '5124561234'),
      new Customer(6, 'Sandy', 'Smithers', 'SandySmithers@yahoo.com', '5124561234')
    ];
    return { customers };
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl)
  }
}