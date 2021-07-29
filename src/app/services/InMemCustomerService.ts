import { Customer } from './../models/customer';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemCustomerService implements InMemoryDbService {

  constructor() { }

  createDb() {
    return {
      customers: [
        {
          id: 1,
          firstName: 'Marquis',
          lastName: 'Warren',
          email: 'MarquisWarren@gmail.com',
          phoneNumber: '1111111111'
        },
        {
          id: 2,
          firstName: 'John',
          lastName: 'Ruth',
          email: 'JohnRuth@gmail.com',
          phoneNumber: '2222222222'
        },
        {
          id: 3,
          firstName: 'Daisy',
          lastName: 'Domergue',
          email: 'DaisyDomergue@gmail.com',
          phoneNumber: '3333333333'
        },
        {
          id: 4,
          firstName: 'Minnie',
          lastName: 'Mink',
          email: 'MinnieMink@aol.com',
          phoneNumber: '4444444444'
        },
        {
          id: 5,
          firstName: 'Oswaldo',
          lastName: 'Mobray',
          email: 'OswaldoMobray@hotmail.com',
          phoneNumber: '5555555555'
        },
        {
          id: 6,
          firstName: 'Sandy',
          lastName: 'Smithers',
          email: 'SandySmithers@yahoo.com',
          phoneNumber: '6666666666'
        },
      ]
    };
  }


}