import {Component} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {StuffService} from '../../services/services';

@Component({
    selector: 'dashboard',
    template: `
    <div>
      <div class="jumbotron">
        <h1>Dashboard</h1>
        <button md-raised-button (click)="doStuff()">Do stuff</button>
      </div>
    </div>
  `
})
export class DashboardComponent {
    constructor(private stuffService: StuffService, private snackBar: MdSnackBar) {
    }
    doStuff() {
        this.stuffService.getText().subscribe((text: string) => {
            this.snackBar.open(text, null, {
                duration: 500
            });
        });
    }
}