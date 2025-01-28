import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCardContent,
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  dashboardForm: FormGroup;
  contacts: number[] = [0]; // Inicializa con un contacto
  links: { contact: string; url: string }[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.dashboardForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      peopleCount: ['', [Validators.required, Validators.min(1)]],
      contact_0: ['', Validators.required],
    });
  }

  addContact(): void {
    const index = this.contacts.length;
    this.contacts.push(index);
    this.dashboardForm.addControl(`contact_${index}`, new FormControl('', Validators.required));
  }

  removeContact(index: number): void {
    this.contacts.splice(index, 1);
    this.dashboardForm.removeControl(`contact_${index}`);
  }

  onGenerateLinks(): void {
    if (this.dashboardForm.valid) {
      const { amount, peopleCount } = this.dashboardForm.value;
      const contacts = this.contacts.map((i) => this.dashboardForm.value[`contact_${i}`]);

      this.http
        .post('http://localhost:3000/api/payment/create', { amount, peopleCount, contacts })
        .subscribe({
          next: (response: any) => {
            this.links = response.links; // Almacena los links generados
          },
          error: (error) => {
            console.error('Error al generar los links:', error);
            alert('Ocurrió un error al generar los links de pago.');
          },
        });
    }
  }

  onSendWhatsApp(): void {
    if (this.links.length > 0) {
      const contacts = this.contacts.map((i) => this.dashboardForm.value[`contact_${i}`]);

      this.http
        .post('http://localhost:3000/api/whatsapp/send-whatsapp', { contacts, links: this.links })
        .subscribe({
          next: (response) => {
            console.log('Mensajes enviados correctamente:', response);
            alert('¡Links enviados por WhatsApp!');
          },
          error: (error) => {
            console.error('Error al enviar los mensajes:', error);
            alert('Ocurrió un error al enviar los mensajes de WhatsApp.');
          },
        });
    } else {
      alert('Primero debes generar los links de pago.');
    }
  }
  getShortenedLink(link: string): string {
    const maxLength = 30; // Máximo de caracteres a mostrar
    return link.length > maxLength ? `${link.slice(0, maxLength)}...` : link;
  }
  onShareLink(link: { url: string; contact: string }): void {
    // Verifica si la Web Share API está disponible
    if (navigator.share) {
      navigator
        .share({
          title: 'Link de Pago',
          text: `¡Hola! Aquí tienes un link de pago: ${link.url}`,
          url: link.url, // Esto abre el link directamente si la app lo soporta
        })
        .then(() => {
          console.log('Link compartido exitosamente');
        })
        .catch((error) => {
          console.error('Error al compartir el link:', error);
        });
    } else {
      alert('La funcionalidad de compartir no está disponible en tu dispositivo.');
    }
  }
  
  
}
