export class Customer {
    id = 0;
    firstName = '';
    lastName = '';
    email = '';
    phoneNumber = '';

    constructor(id: number, firstName: string, lastName: string, email: string, phoneNumber: string) {
        this.id = id || 0;
        this.firstName = firstName || '';
        this.lastName = lastName || '';
        this.email = email || '';
        this.phoneNumber = phoneNumber || '';
    }
}
