import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  template: `
    <nav class="navbar">
      <a class="navbar-brand" routerLink="/">Epicenter Fitness</a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" routerLink="/members">Members</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/classes">Classes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/check-in">Check-in</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/attendance">Attendance</a>
        </li>
      </ul>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #333;
      color: #fff;
      padding: 1rem;
    }
    .navbar-brand {
      font-size: 1.5rem;
      font-weight: bold;
      color: #fff;
      text-decoration: none;
    }
    .navbar-nav {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .nav-item {
      margin-left: 1rem;
    }
    .nav-link {
      color: #fff;
      text-decoration: none;
    }
  `],
  standalone: true,
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {}
