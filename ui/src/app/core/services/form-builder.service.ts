// Angular imports
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  constructor(private fb: FormBuilder) { }

  public createForm<T>(model: T): FormGroup {
    return this.fb.group(model);
  }

  public getFormValue<T>(form: FormGroup): T {
    return form.value as T;
  }

  public setFormValue<T>(form: FormGroup, data: T): void {
    form.patchValue(data);
  }

}
