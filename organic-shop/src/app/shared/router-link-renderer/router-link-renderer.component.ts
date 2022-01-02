import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'routerlink-renderer',
  template: `<a class="nav-link" [routerLink]='["/admin/products", value]'>Edit</a>`,
  styles: []
})
export class RouterLinkRendererComponent implements ICellRendererAngularComp {
  value!: string; 
  constructor() { }
  agInit(params: ICellRendererParams): void {
    this.value= params.value;
  }
  refresh(params: ICellRendererParams): boolean {
    this.value= params.value;
    return true;
  }
}
