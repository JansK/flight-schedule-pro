import {
  Customer
} from './../models/customer';
import {
  Component,
  Inject,
  Input,
  OnInit
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {
  CustomersService
} from '../services/customers.service';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  DialogData
} from '../models/dialog-data.model';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-edit-customer',
  templateUrl: './dialog-edit-customer.component.html',
  styleUrls: ['./dialog-edit-customer.component.css']
})
export class DialogEditCustomerComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private customerService: CustomersService, private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogEditCustomerComponent>) { }

  ngOnInit(): void {
    if (this.data.customer) {
      this.customerForm = new FormGroup({
        firstName: new FormControl(this.data.customer.firstName, [Validators.required, Validators.maxLength(255)]),
        lastName: new FormControl(this.data.customer.lastName, [Validators.required, Validators.maxLength(255)]),
        email: new FormControl(this.data.customer.email, [Validators.required, Validators.email]),
        // Note: assuming only U.S. numbers, so length of 10
        phoneNumber: new FormControl(this.data.customer.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
      });
    } else {
      this.customerForm = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        lastName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        // Note: assuming only U.S. numbers, so length of 10
        phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
      });
    }

  }

  editCustomer(customer: Customer) {
    this.customerService.editCustomer(customer).subscribe(response => {
      console.log(response);
      this.openSnackBar(`Edited customer ${customer.firstName} ${customer.lastName}`);
      this.dialogRef.close('SUCCESS');
    }, (error) => {
      this.openSnackBar('Error editing customer: ' + error);
    });
  }

  addCustomer(customer: Customer) {
    this.customerService.addCustomer(customer).subscribe(response => {
      console.log(response);
      this.openSnackBar(`Added customer ${customer.firstName} ${customer.lastName}`);
      this.dialogRef.close('SUCCESS');
    }, (error) => {
      this.openSnackBar('Error adding customer: ' + error);
    });
  }

  onFormSubmit() {
    if (this.customerForm.valid) {
      if (this.data.mode === 'add') {
        this.addCustomer(this.buildNewCustomer());
      } else {
        this.editCustomer(this.buildEditedCustomer());
      }
    }
  }

  buildNewCustomer() {
    return new Customer(
      null,
      this.customerForm.get('firstName')!.value,
      this.customerForm.get('lastName')!.value,
      this.customerForm.get('email')!.value,
      this.customerForm.get('phoneNumber')!.value
    );
  }

  buildEditedCustomer() {
    return new Customer(
      this.data.customer.id,
      this.customerForm.get('firstName')!.value,
      this.customerForm.get('lastName')!.value,
      this.customerForm.get('email')!.value,
      this.customerForm.get('phoneNumber')!.value
    );
  }

  getEmailErrorMessage() {
    if (this.customerForm.get('email')!.hasError('required')) {
      return 'You must enter a value';
    }

    return this.customerForm.get('email')!.hasError('email') ? 'Not a valid email' : '';
  }

  getPhoneNumberErrorMessage() {
    if (this.customerForm.get('phoneNumber')!.hasError('required')) {
      return 'You must enter a value';
    }

    return this.customerForm.get('phoneNumber')!.hasError('minLength') ? 'Please enter 10 digits' : '';
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close');
  }

}
