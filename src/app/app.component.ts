import {
  Customer
} from './models/customer';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { CustomersService } from './services/customers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogEditCustomerComponent } from './dialog-edit-customer/dialog-edit-customer.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private customerService: CustomersService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  title = 'Flight Schedule Pro';
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'actions'];
  tableData: Customer[] = [];
  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit() {
    this.getCustomers();
  }

  ngAfterViewInit() {
    // this.tableData.sort = this.sort;
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(response => {
      console.log(response);
      this.tableData = response;
    });
  }

  openAddDialog() {
    let dialogRef = this.dialog.open(DialogEditCustomerComponent, {
      data: {
        mode: 'add',
        customer: null
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response && response === 'SUCCESS') {
        this.getCustomers();
      }
    });
  }

  openEditDialog(customer: Customer) {
    let dialogRef = this.dialog.open(DialogEditCustomerComponent, {
      data: {
        mode: 'edit',
        customer: customer
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response && response === 'SUCCESS') {
        this.getCustomers();
      }
    });
  }

  deleteCustomer(customer: Customer) {
    this.customerService.deleteCustomer(customer.id).subscribe(response => {
      console.log(response);
      if (!response) {
        this.openSnackBar(`Deleted customer ${customer.firstName} ${customer.lastName}`);
        this.getCustomers();
      }
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close');
  }

}
