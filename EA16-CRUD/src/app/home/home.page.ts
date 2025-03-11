import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonButton, IonInput } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Task } from '../task.service';
import { TaskService } from '../task.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonButton,
    IonInput,
    FormsModule, CommonModule
  ],
})
export class HomePage implements OnInit {

  tasks$!: Observable<Task[]>;
  newTaskName: string = '';
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks$ = this.taskService.getTasks();
  }

  addTask() {
    const name = this.newTaskName.trim();

    if (!name) {
      alert('El nombre de la tarea es obligatorio');
      return;
    }

    const newTask: Task = { name };

    this.taskService.addTask(newTask)
      .then(() => {
        console.log('Tarea agregada');
        this.newTaskName = '';
      })
      .catch((err: unknown) => console.error('Error al agregar tarea:', err));
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id)
      .then(() => console.log('Tarea eliminada'))
      .catch((err: unknown) => console.error('Error al eliminar tarea:', err));
  }
}
