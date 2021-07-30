import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ICustomer } from '../models/Icustomer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private customersUrl = 'api/customers/';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl);
  }

  addCustomer(customer: ICustomer): Observable<Customer> {
    return this.http.post<ICustomer>(this.customersUrl, customer);
  }

  editCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.customersUrl + customer.id, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(this.customersUrl + id);
  }
}
