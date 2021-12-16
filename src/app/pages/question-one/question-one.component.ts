import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-question-one',
  templateUrl: './question-one.component.html',
  styleUrls: ['./question-one.component.scss']
})
export class QuestionOneComponent implements OnInit {

  form = this.fb.group({
    value: [null, [Validators.required]],
    type: ['is_prime'],
  });

  constructor(
    private fb: FormBuilder
  ) {
    this.form.get('value')
      ?.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => this.formChanges());
  }

  ngOnInit(): void {
  }

  formChanges() {
    if (this.form.value.value < 0) {
      this.form.get('value')?.setValue(1);
      return;
    }

    if (this.form.value.value % 1 !== 0) {
      this.form.get('value')?.setValue(Math.round(this.form.value.value));
    }
  }

  get result() {
    return this.form.value.type === 'is_prime'
      ? this.isPrime(this.form.value.value)
      : this.isFibonacci(this.form.value.value);
  }

  isPrime(value: number) {
    for (let i = 2; i < value; i++)
      if (value % i === 0) return false;
    return value > 1;
  }

  isFibonacci(value: number) {
    return this.isPerfectSquare(5 * value * value + 4) ||
      this.isPerfectSquare(5 * value * value - 4);
  }

  isPerfectSquare(value: number) {
    let s = parseInt(Math.sqrt(value).toString());
    return (s * s == value);
  }
}
