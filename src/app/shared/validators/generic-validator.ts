import { AbstractControl, ValidationErrors } from '@angular/forms';

export class GenericValidator {
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
      // return { minlength: {
      //         requiredLength: 10,
      //         actualLength: control.value.length
      //     }
      // };
    }
    return null;
  }

  // simulate Asynchronous operation
  static shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject): void => {
      setTimeout(() => {
        if (control.value === 'oopsmails') {
          resolve({ shouldBeUnique: true });
        } else {
          return resolve(null);
        }
      }, 2000);
    });
  }
}
