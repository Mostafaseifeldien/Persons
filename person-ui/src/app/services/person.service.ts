import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';
import { catchError, defer, finalize, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PersonService {
  private readonly http = inject(HttpClient);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  getPersons() {
    this.error.set(null);

    return defer(() => {
      // ✅ يتحط وقت الـ subscribe فعليًا
      this.loading.set(true);
      return this.http.get<Person[]>('/api/Persons'); // خليه زي Swagger
    }).pipe(
      finalize(() => this.loading.set(false)), // ✅ يتقفل في كل الأحوال
      catchError((err) => {
        console.error('Failed to load persons', err);
        this.error.set('Something went wrong while loading people.');
        return of([] as Person[]);
      }),
    );
  }
}
