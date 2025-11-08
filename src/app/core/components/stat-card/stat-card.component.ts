import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCardComponent {
  title = input.required<string>();
  value = input.required<string | number>();
  icon = input.required<string>();
}
