import { Customer } from './../models/customer';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersService } from '../services/customers.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogData } from '../models/dialog-data.model';

@Component({
  selector: 'app-dialog-edit-customer',
  templateUrl: './dialog-edit-customer.component.html',
  styleUrls: ['./dialog-edit-customer.component.css']
})
export class DialogEditCustomerComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private customerService: CustomersService) { }

  ngOnInit(): void {
    if (this.data)
      this.customerForm = new FormGroup({
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        phoneNumber: new FormControl('', [Validators.required])
      });
  }

  editCustomer(customer: Customer) {
    this.customerService.editCustomer(customer).subscribe(response => {
      console.log(response);
    });
  }

  onFormSubmit() {

  }

}
