import { Component, OnInit } from '@angular/core';
import { BaseCtl } from '../base.component';
import { ActivatedRoute } from '@angular/router';
import { ServiceLocatorService } from '../service-locator.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent extends BaseCtl {
  errorMessageTitle: string = '';
  errorMessageClientName: string = '';

  constructor(public locator: ServiceLocatorService, public route: ActivatedRoute) {
    super(locator.endpoints.CUSTOMER, locator, route);
  }

   onUpload(userform: FormData) {
    this.submit();
    console.log(this.form.data.id + '---- after submit');

  }

  validateForm(form) {
    let flag = true;
    let validator = this.serviceLocator.dataValidator;
    flag = flag && validator.isNotNullObject(form.clientName);
    flag = flag && validator.isNotNullObject(form.location);
    flag = flag && validator.isNotNullObject(form.contactNumber);
    flag = flag && validator.isNotNullObject(form.importance);

    return flag;
  }

  populateForm(form, data) {
    form.id = data.id;
    form.clientName = data.clientName;
    form.location = data.location;
    form.contactNumber = data.contactNumber;
    form.importance = data.importance;
  }

  validateName(event: KeyboardEvent): void {
    const inputValue = (event.target as HTMLInputElement).value;
    const inputChar = event.key;
    const alphabetPattern = /^[a-zA-Z]*$/;  // Pattern to match only alphabetic characters

    if (!alphabetPattern.test(inputChar) && !['Backspace', 'Delete', 'Tab'].includes(inputChar)) {
      event.preventDefault();
      this.errorMessageClientName = 'Only alphabets are allowed.';
      return;
    }

    if (inputValue.length < 3) {
      this.errorMessageClientName = 'fullName must be at least 3 characters long.';
    } else if (inputValue.length > 15) {
      this.errorMessageClientName= 'fullName must not exceed 15 characters.';
    } else {
      this.errorMessageClientName = '';  // Clear error message if valid
    }
  }

  validateAlphabetInput(event) {
    const charCode = event.which || event.keyCode;
    const charStr = String.fromCharCode(charCode);

    // Regular expression to test if the character is a letter
    if (!/^[a-zA-Z]+$/.test(charStr)) {
      event.preventDefault();
    }
  }

}