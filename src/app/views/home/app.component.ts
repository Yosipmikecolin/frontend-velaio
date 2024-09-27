import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateValidator } from 'src/app/validations';
import { People } from 'src/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  taskForm: FormGroup;
  submitted = false;
  people: People[] = [];
  skills: string[] = [];

  constructor() {
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

  onSubmit() {
    this.submitted = true;
    if (this.taskForm.valid) {
      alert('Datos guardados');
      console.log(this.taskForm.value);
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

  areFieldsFilled(): boolean {
    const fullName = this.taskForm.get('fullName')?.value;
    const age = this.taskForm.get('age')?.value;
    const skills = this.skills;

    return fullName && age && skills.length > 0;
  }

  addPerson() {
    const fullNameControl = this.taskForm.get('fullName');
    const ageControl = this.taskForm.get('age');
    const skills = this.skills;
    if (fullNameControl?.valid && ageControl?.valid && skills.length) {
      this.people.push({
        name: fullNameControl.value,
        age: fullNameControl.value,
        skills,
      });
    } else {
      alert('#');
      fullNameControl?.markAsTouched();
      ageControl?.markAsTouched();
    }
  }
}
