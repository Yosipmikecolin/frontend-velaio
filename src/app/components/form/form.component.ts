import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './form.service';
import { dateValidator } from 'src/app/validations';
import { DataTask, People } from 'src/interfaces';
import { Event } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  taskForm: FormGroup;
  submitted = false;
  loading = false;
  people: People[] = [];
  skills: string[] = [];

  constructor(private apiService: ApiService) {
    this.taskForm = new FormGroup({
      taskName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      dueDate: new FormControl('', [Validators.required, dateValidator()]),
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      age: new FormControl('', [Validators.required, Validators.min(18)]),
      nameSkill: new FormControl(''),
    });
  }

  async onSubmit() {
    this.submitted = true;
    const taskName = this.taskForm.get('taskName')?.value;
    const dueDate = this.taskForm.get('dueDate')?.value;
    if (this.people.length && taskName && dueDate) {
      this.loading = true;
      const task: DataTask = {
        task: { taskName, dueDate },
        people: this.people,
      };
      try {
        const response = await this.apiService.postData(task);
        console.log('Respuesta de la API:', response);
        this.taskForm.reset();
        this.submitted = false;
        this.people = [];
      } catch (error) {
        console.error('Error en la petición:', error);
      } finally {
        this.loading = false;
      }
    }
  }

  addSkill() {
    const skillInput = this.taskForm.get('nameSkill');
    if (skillInput?.value) {
      const newSkill = skillInput.value;
      const currentSkills = [...this.skills, newSkill];
      this.skills = currentSkills;
      skillInput?.setValue('');
    }
  }
  removeSkill(skill: string) {
    const newSkills = this.skills.filter((i) => i !== skill);
    this.skills = newSkills;
  }

  removePerson(person: string) {
    const newPeople = this.people.filter((i) => i.name !== person);
    this.people = newPeople;
  }

  areFieldsFilled(): boolean {
    const fullName = this.taskForm.get('fullName')?.value;
    const age = this.taskForm.get('age')?.value;

    return fullName && age && this.skills.length > 0;
  }

  addPerson() {
    const taskName = this.taskForm.get('taskName');
    const dueDate = this.taskForm.get('dueDate');
    const fullNameControl = this.taskForm.get('fullName');
    const ageControl = this.taskForm.get('age');
    const skillControl = this.taskForm.get('nameSkill');
    if (fullNameControl?.valid && ageControl?.valid && this.skills.length) {
      this.people.push({
        name: fullNameControl.value,
        age: fullNameControl.value,
        skills: this.skills,
      });

      fullNameControl.setValue('');
      ageControl.setValue('');
      skillControl?.setValue('');
      this.skills = [];

      if (taskName?.valid && dueDate?.valid) {
        this.submitted = false;
      }
    }
  }
}
