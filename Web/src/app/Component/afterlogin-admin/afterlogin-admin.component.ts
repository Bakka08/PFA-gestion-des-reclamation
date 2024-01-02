import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-afterlogin-admin',
  templateUrl: './afterlogin-admin.component.html',
  styleUrls: ['./afterlogin-admin.component.scss']
})
export class AfterloginAdminComponent implements OnInit, OnDestroy {
  userId: number;
  apiResponse: any[] = [];
  searchInput: string = '';
  private sessionCheckInterval: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.userId = +params['userId'];
    });
  }

  ngOnInit(): void {
    this.loadData();

    // Start a timer to check the session every 3 seconds
    this.sessionCheckInterval = setInterval(() => {
      this.checkSession();
    }, 3000);
  }

  ngOnDestroy(): void {
    // Clear the session check interval when the component is destroyed
    clearInterval(this.sessionCheckInterval);
  }

  loadData(): void {
    const apiUrl = 'http://192.168.1.102:8080/api/getAll';

    axios.get(apiUrl)
      .then((response) => {
        this.apiResponse = response.data.filter(item => {
          return (
            item.id.toString().includes(this.searchInput) ||
            item.user.firstName.toLowerCase().includes(this.searchInput.toLowerCase()) ||
            item.user.lastName.toLowerCase().includes(this.searchInput.toLowerCase()) ||
            item.user.email.toLowerCase().includes(this.searchInput.toLowerCase())
          );
        });
        this.handleFetchedData();
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }

  handleFetchedData(): void {
    console.log('Data fetched successfully!');
  }

  checkSession(): void {
    const sessionCheckUrl = `http://192.168.1.102:8080/api/check/${this.userId}`;

    axios.get(sessionCheckUrl)
      .then((response) => {
        const isSessionActive = response.data === 1;

        if (!isSessionActive) {
          alert('Session ended. Please login again.');
          this.logout();
        }
      })
      .catch((error) => {
        console.error('Error checking session: ', error);
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

  onSearchInputChange(): void {
    const inputElement = document.getElementById('form1') as HTMLInputElement;
    if (inputElement) {
      this.searchInput = inputElement.value;
      this.loadData();
    }
  }

  logout() {
    this.userId = 0;
    this.router.navigate(['/login']);
  }

  performAction(claimId: number, action: string): void {
    const apiUrl = `http://192.168.1.102:8080/api/action/${claimId}/${action}`;

    axios.put(apiUrl)
      .then(() => {
        console.log(`Action ${action} successfully performed on claim ID ${claimId}`);
        this.loadData();
      })
      .catch((error) => {
        console.error(`Error performing action ${action} on claim ID ${claimId}: `, error);
      });
  }
}
