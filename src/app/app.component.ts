import {Component, OnInit} from '@angular/core';
import {Person} from './person';
import {PersonService} from './person.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public persons: Person[];
  public updatePerson: Person;
  public deletePerson: Person;

  constructor(private personService: PersonService) {  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.findAllPersons();
  }

  public findAllPersons(): void {
    this.personService.findAllPersons().subscribe(
      (response: Person[]) => {
        this.persons = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddPerson(addForm: NgForm): void {
    document.getElementById('close-add-person-form').click();

    this.personService.createPerson(addForm.value).subscribe(
      (response: Person) => {
        this.findAllPersons();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdatePerson(person: Person): void {

    this.personService.updatePerson(person).subscribe(
      (response: Person) => {
        this.findAllPersons();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeletePerson(id: number): void {

    this.personService.deletePerson(id).subscribe(
      (response: void) => {
        this.findAllPersons();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchPerson(key: string): void {
    const result: Person[] = [];
    for (const person of this.persons) {
      if (person.email.indexOf(key) !== -1) {
        result.push(person);
      }
    }

    this.persons = result;

    if (result === null || !key) {
      this.findAllPersons();
    }
  }

  public onOpenModal(person: Person, mode: string): void {

    const container = document.getElementById('main');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addPerson');
    }

    if (mode === 'edit') {
      this.updatePerson = person;
      button.setAttribute('data-target', '#updatePerson');
    }

    if (mode === 'delete') {
      this.deletePerson = person;
      button.setAttribute('data-target', '#deletePerson');
    }

    container.appendChild(button);
    button.click();

  }

}
