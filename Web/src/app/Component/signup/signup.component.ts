import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUp(): void {
    const firstName = (document.getElementById('form2ExampleNom') as HTMLInputElement).value;
    const lastName = (document.getElementById('form2ExamplePrenom') as HTMLInputElement).value;
    const tel = (document.getElementById('form2ExampleTelephone') as HTMLInputElement).value;
    const email = (document.getElementById('form2ExampleEmail') as HTMLInputElement).value;
    const password = (document.getElementById('form2ExamplePassword') as HTMLInputElement).value;

    // Check if the inputs are not empty
    if (!firstName || !lastName || !tel || !email || !password) {
      alert('All fields are required');
      return;
    }

    // Check email format
    if (!this.isValidEmail(email)) {
      alert('Invalid email format');
      return;
    }

    // Check password length
    if (password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    // Prepare the JSON payload
    const payload = {
      firstName,
      lastName,
      password,
      tel,
      email
    };

    // Make a POST request to the server
    axios.post('http://192.168.1.102:8080/api/signup', payload)
      .then(response => {
        if (response.data.message === 'Email is already in use') {
          alert('Email is already in use');
        } else {
          alert('Signup successful');
          // Empty the input fields
          (document.getElementById('form2ExampleNom') as HTMLInputElement).value = '';
          (document.getElementById('form2ExamplePrenom') as HTMLInputElement).value = '';
          (document.getElementById('form2ExampleTelephone') as HTMLInputElement).value = '';
          (document.getElementById('form2ExampleEmail') as HTMLInputElement).value = '';
          (document.getElementById('form2ExamplePassword') as HTMLInputElement).value = '';

          // Navigate to login
          window.location.href = '/login';
        }
      })
      .catch(error => {
        console.error('Error during signup:', error);
      });
  }

  private isValidEmail(email: string): boolean {
    // Use a regular expression for basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
