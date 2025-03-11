import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonLabel],
})
export class HomePage {

  items: { id: number; name: string; }[] = [];
  nextId: number = 1;

  nameError: boolean = false;

  editingItem: { id: number; name: string; } | null = null;
  //almacen termporal del usuario que se esta editando

  constructor(public navCtrl: NavController) { }

  validateAndAdd(name: string): void {
    this.nameError = false;



    if (!name.trim() || name.trim().length < 3) {
      this.nameError = true;
    }

    //agrega cuando no hay errores
    if (!this.nameError) {
      this.addItem(name); //usa la funcion add item :)
    }
  }


  addItem(name: string): void {
    if (name.trim()) {
      this.items.push({
        id: this.nextId++,
        name: name.trim(),
      });
    } else {
      alert('Este campo no puede estar vacio');
    }
  }

  //funcion para activar la edicion
  enableEdit(item: { id: number; name: string; }): void {
    this.editingItem = { ...item };
  }

  // Guardar cambios de la edicion
  saveEdit(): void {
    if (!this.editingItem) return;

    const { id, name } = this.editingItem;

    if (!name.trim() || name.trim().length < 3) {
      alert('El nombre es obligatorio y debe tener al menos 3 caracteres.');
      return;
    }

    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.items[index] = { id, name: name.trim() };
    }

    this.editingItem = null;
  }

  cancelEdit(): void {
    this.editingItem = null;
  }



  //eliminar elemento de la lista
  removeItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }



}
