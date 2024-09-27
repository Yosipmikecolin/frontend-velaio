import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { TasksComponent } from './views/tasks/tasks.component';
import { FormComponent } from './components/form/form.component';
import { NoFoundComponent } from './views/no-found/no-found.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tasks', component: TasksComponent },
  { path: '**', component: NoFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TasksComponent,
    FormComponent,
    NoFoundComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
