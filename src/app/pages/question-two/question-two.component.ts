import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-question-two',
  templateUrl: './question-two.component.html',
  styleUrls: ['./question-two.component.scss']
})
export class QuestionTwoComponent implements OnInit {

  private _categories: string[] = [];
  categories: string[] = [];

  filter = new FormControl('');

  constructor(
    private http: HttpClient
  ) {
    this.getCategories();

    this.filter.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.filterCategories();
      });
  }

  ngOnInit(): void {
  }

  filterCategories() {
    this.categories = this._categories;

    if (this.filter.value) {
      this.categories = this.categories.filter(s => s.includes(this.filter.value));
    }
  }

  getCategories() {
    this.http.get<string[]>(`https://api.publicapis.org/categories`)
      .subscribe(res => {
        this._categories = res;
        this.categories = this._categories;
      });
  }

}
