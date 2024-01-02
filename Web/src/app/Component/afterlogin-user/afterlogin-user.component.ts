import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-afterlogin-user',
  templateUrl: './afterlogin-user.component.html',
  styleUrls: ['./afterlogin-user.component.scss']
})
export class AfterloginUserComponent implements OnInit {
  userId: number;
  showModal = false;
  showUpdateModal = false;
  claims: any[];
  newRequestSubject: string;
  newRequestDescription: string;
  updatedClaimId: number; // Variable to store the ID of the claim being updated

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = +params['userId'];
      this.getUserClaims();
     
    });
  }

 

  
  toggleModal() {
    this.showModal = !this.showModal;
  }

  toggleUpdateModal() {
    this.showUpdateModal = !this.showUpdateModal;
  }

  getUserClaims() {
    const url = `http://192.168.1.102:8080/api/get/${this.userId}`;

    axios.get(url)
      .then(response => {
        this.claims = response.data;
      })
      .catch(error => {
        console.error('Error fetching user claims', error);
      });
  }

  getBadgeStyles(status: string): string {
    switch (status) {
      case 'Accepted':
        return 'badge badge-success rounded-pill me-1';
      case 'Pending':
        return 'badge badge-warning rounded-pill me-1';
      case 'Decline':
        return 'badge badge-danger rounded-pill me-1';
      default:
        return 'badge rounded-pill me-1';
    }
  }

  addClaim() {
    const newRequestSubject = (document.getElementById('subjectInput') as HTMLInputElement).value;
    const newRequestDescription = (document.getElementById('textAreaExample') as HTMLTextAreaElement).value;

    axios.post(`http://192.168.1.102:8080/api/save/${this.userId}`, {
      subject: newRequestSubject,
      description: newRequestDescription,
    })
    .then(response => {
      this.getUserClaims();
      this.toggleModal();
      (document.getElementById('subjectInput') as HTMLInputElement).value = '';
      (document.getElementById('textAreaExample') as HTMLTextAreaElement).value = '';
    })
    .catch(error => {
      console.error('Error adding claim', error);
    });
  }

  updateClaim(claimId: number) {
    this.showUpdateModal = true;
    this.updatedClaimId = claimId;
    this.updateClaimDetails(claimId);
  }

  updateClaimDetails(claimIdToUpdate: number) {
    axios.get(`http://192.168.1.102:8080/api/getclaimbyid/${claimIdToUpdate}`)
      .then(response => {
        const claimDetails = response.data;

        (document.getElementById('subjectInputUpdate') as HTMLInputElement).value = claimDetails.subject;
        (document.getElementById('textAreaExampleUpdate') as HTMLTextAreaElement).value = claimDetails.description;
      })
      .catch(error => {
        console.error('Error fetching claim details for update', error);
      });
  }

  updateClaimmm() {
    const updatedSubject = (document.getElementById('subjectInputUpdate') as HTMLInputElement).value;
    const updatedDescription = (document.getElementById('textAreaExampleUpdate') as HTMLTextAreaElement).value;

    if (!updatedSubject || !updatedDescription) {
      // Display an error message or handle as appropriate
      console.error('Subject and Description are required for update.');
      return;
    }

    // Make a PUT request to update the claim
    axios.put(`http://192.168.1.102:8080/api/update/${this.updatedClaimId}`, {
      subject: updatedSubject,
      description: updatedDescription,
    })
    .then(response => {
      // Fetch claims again after the update
      this.getUserClaims();
      // Hide the update modal
      this.toggleUpdateModal();
    })
    .catch(error => {
      console.error('Error updating claim', error);
    });
  }

  deleteClaim(claimId: number) {
    axios.delete(`http://192.168.1.102:8080/api/delete/${claimId}`)
      .then(response => {
        // Fetch claims again after deletion
        this.getUserClaims();
      })
      .catch(error => {
        console.error('Error deleting claim', error);
      });
  }

  logout() {
    // Clear the user ID
    this.userId = 0;

    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
