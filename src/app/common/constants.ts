import { SnackbarService } from '../services/snackbar.service';
import { Validators, ValidatorFn, AbstractControl } from '@angular/forms';


export class Constants{

public static SANCKBAR_DURATION: 2000;
public static  PASSWORDVALIDATORS = [Validators.required, Validators.minLength(6), Validators.maxLength(25)];
public static  CONFIRMPASSWORDVALIDATORS = [Validators.required, Validators.minLength(6),Validators.maxLength(25), sameValidator('password')];
public static  EMAILVALIDATORS: ValidatorFn[] = [Validators.required, Validators.pattern('^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+[.]{1}[a-zA-Z0-9]+$'), Validators.maxLength(50)];
public static CONTACTVALIDATORS=[Validators.required, Validators.pattern('^[0-9]{10,15}$')]
public static NAMEVALIDATORS= [Validators.required, Validators.minLength(2), Validators.maxLength(25)];
}

export function sameValidator(fieldValue: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let self = control.value
    if(!control.parent) return null
    let field = control.parent.get(fieldValue).value
    return self !== field ? {
      'notSame': {
        value: control.value
      }
    } : null
  }
}
