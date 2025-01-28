import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  imports: [ MatFormFieldModule, MatCardModule, MatIconModule, ReactiveFormsModule, CommonModule, MatInputModule, MatButtonModule, RouterLink, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
}) 
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar, private http: HttpClient) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  
  onLogin(): void {
    if (this.loginForm.valid) {
      this.http.post('http://localhost:3000/api/auth/login', this.loginForm.value).subscribe({
        next: (response: any) => {
          // Guardar el token en localStorage o similar
          localStorage.setItem('token', response.token);

          // Mostrar el toast de éxito
          this.snackBar.open('¡Login exitoso!', 'Cerrar', {
            duration: 3000, // Duración en milisegundos
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });

          // Redirigir al dashboard
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);

          // Mostrar el toast de error
          this.snackBar.open('Error al iniciar sesión. Verifica tus credenciales.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
      });
    }
  }
}
