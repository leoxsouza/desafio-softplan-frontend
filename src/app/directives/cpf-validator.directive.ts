import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { ValidatorUtil } from '../util/validator.util';

@Directive({
  selector: '[cpfValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef( () => CpfValidatorDirective ), multi: true }
]
})
export class CpfValidatorDirective implements Validator {

  validate( c: AbstractControl ): any {
    let erro = {
        cpf: true
    };

    // self value
    let modelValue = c.value;

    return !(modelValue && ValidatorUtil.isValidCpf( modelValue.toString().trim() )) ? erro : null;
}
}
