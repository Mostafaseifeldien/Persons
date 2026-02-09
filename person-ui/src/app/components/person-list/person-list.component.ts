import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';
import { Observable, shareReplay, tap } from 'rxjs';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
  private readonly personService = inject(PersonService);

  readonly displayedColumns = ['avatar', 'name', 'email'];
  readonly filter = signal('');

  // ✅ مهم: خليها Observable متسندة في ngOnInit
  persons$!: Observable<Person[]>;

  readonly loading = this.personService.loading;
  readonly error = this.personService.error;

  readonly hasFilter = computed(() => this.filter().trim().length > 0);

  ngOnInit(): void {
    // ✅ ما تعملش subscribe هنا (الـ async pipe هيعمل subscribe)
    this.persons$ = this.personService.getPersons().pipe(
      tap((data) => console.log('✅ API DATA =>', data)),
      shareReplay(1), // ✅ يمنع أي طلبات زيادة لو async اتكرر بالغلط
    );
  }

  onFilterChange(value: string): void {
    this.filter.set(value);
  }

  filtered(persons: Person[]): Person[] {
    const query = this.filter().trim().toLowerCase();
    if (!query) return persons;

    return persons.filter((p) => {
      const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
      return (
        fullName.includes(query) ||
        p.email.toLowerCase().includes(query) ||
        String(p.id).includes(query)
      );
    });
  }

  initials(person: Person): string {
    return `${person.firstName?.[0] ?? ''}${person.lastName?.[0] ?? ''}`.toUpperCase();
  }
}
