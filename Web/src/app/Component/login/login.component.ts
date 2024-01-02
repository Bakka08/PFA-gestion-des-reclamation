// Import necessary modules
import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router) {}

  loginUser() {
    // Read inputs
    const identifier = (document.getElementById('form2Example11') as HTMLInputElement).value;
    const password = (document.getElementById('form2Example22') as HTMLInputElement).value;

    // Check if inputs are not empty
    if (identifier && password) {
        const loginData = {
            email: identifier,
            password: password
        };

        // Make an Axios POST request
        axios.post('http://192.168.1.102:8080/api/login', loginData)
            .then(response => {
                const user = response.data;

                // Check user role and navigate accordingly
                if (user && user.role === 'User') {
                    this.router.navigate(['/after-login-user'], { queryParams: { userId: user.id } });
                } else if (user && user.role === 'Manager') {
                    this.router.navigate(['/after-login-admin'], { queryParams: { userId: user.id } });
                } else {
                    console.error('Invalid user role.');
                }
            })
            .catch(error => {
                console.error('Login failed:', error);
                // Handle login failure (e.g., show an error message)
            });
    } else {
        console.error('Please enter both identifier and password.');
    }
  }
}
