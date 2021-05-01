import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person} from './person';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PersonService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {  }

  public findAllPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiServerUrl}/person/all`);
  }

  public findPerson(personId: number): Observable<Person> {
    return this.http.get<Person>(`${this.apiServerUrl}/person/${personId}`);
  }

  public createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.apiServerUrl}/person/create`, person);
  }

  public updatePerson(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.apiServerUrl}/person/update`, person);
  }

  public deletePerson(personId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/person/delete/${personId}`);
  }

}
