import {
  Customer
} from './models/customer';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  InMemCustomerService
} from './services/InMemCustomerService';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private customerService: InMemCustomerService) { }

  title = 'Flight Schedule Pro Customer List';
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber'];
  tableData: Customer[] = [];

  ngOnInit() {
    this.customerService.createDb();
  }

  initializeList(): void {

  }
}
