// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Por favor, inicia sesión primero.');
      this.router.navigate(['/login']); // Redirigir al login si no hay token
      return false;
    }
    return true;
  }
}
