import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { DashboardItemComponent } from "../dashboard-item/dashboard-item.component";

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [DashboardItemComponent],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit {
  currentStatus = signal<'online' | 'offline' | 'unknown'>('online');
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      console.log(this.currentStatus());
    });
  }

  ngOnInit() {
    const interval = setInterval(() => {
      const rnd = Math.random();

      if (rnd < 0.5) {
        this.currentStatus.set('online');
      }
      else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      }
      else {
        this.currentStatus.set('unknown');
      }
    }, 6000);

    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    })
  }

  
}
