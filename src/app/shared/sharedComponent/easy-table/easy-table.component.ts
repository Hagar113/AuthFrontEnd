import { Component, Input, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-easy-table',
  templateUrl: './easy-table.component.html',
  styleUrls: ['./easy-table.component.css'],
})
export class EasyTableComponent implements OnInit {
  @Input() inputData: any[] = [];
  @Input() pageName: string = '';
  @Input() inputColumns: Columns[] = [];

  public configuration!: Config;
  public columns!: Columns[];
  public data: any[] = [];

  ngOnInit(): void {
    this.data = this.inputData;
    this.columns = [
      ...this.inputColumns,
      {
        key: 'actions',
        title: 'Actions',
        cellTemplate: this.getActionsTemplate(),
      },
    ];
    this.configuration = { ...DefaultConfig };
  }

  getActionsTemplate(): any {
    return (rowIndex: number) => `
      <div class="btn-group">
        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          Actions
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" (click)="editRole(${rowIndex})">Edit</a></li>
          <li><a class="dropdown-item text-danger" (click)="deleteRole(${rowIndex})">Delete</a></li>
        </ul>
      </div>
    `;
  }

  editRole(rowIndex: number): void {
    const roleId = this.data[rowIndex].id;
    // Call parent component's editRole method
    (this as any).editRole(roleId);
  }

  deleteRole(rowIndex: number): void {
    const roleId = this.data[rowIndex].id;
    // Call parent component's deleteRole method
    (this as any).deleteRole(roleId);
  }
}
