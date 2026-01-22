import { Component, OnInit } from '@angular/core';
import { BaseCtl } from '../base.component';
import { ActivatedRoute } from '@angular/router';
import { ServiceLocatorService } from '../service-locator.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent extends BaseCtl {
  errorMessage: string;
  errorMessageDesignation: string;

  constructor(public locator: ServiceLocatorService, public route: ActivatedRoute) {
      super(locator.endpoints.POSITION, locator, route);
    }
  
     onUpload(userform: FormData) {
      this.submit();
      console.log(this.form.data.id + '---- after submit');
  
    }
  
    validateForm(form) {
      let flag = true;
      let validator = this.serviceLocator.dataValidator;
      flag = flag && validator.isNotNullObject(form.designation);
      flag = flag && validator.isNotNullObject(form.openingDate);
      flag = flag && validator.isNotNullObject(form.requiredExperience);
      flag = flag && validator.isNotNullObject(form.condition);
  
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
        this.errorMessageDesignation = 'Only alphabets are allowed.';
        return;
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
