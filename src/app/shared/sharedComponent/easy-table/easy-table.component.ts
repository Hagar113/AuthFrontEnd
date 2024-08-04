import { Component, Input, OnInit, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
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
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  public configuration!: Config;
  public columns!: Columns[];
  public data: any[] = [];

  @ViewChild('actionsTemplate', { static: true }) actionsTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    this.data = this.inputData;
    this.columns = [
      ...this.inputColumns,
      {
        key: 'actions',
        title: 'Actions',
        cellTemplate: this.actionsTemplate,
      },
    ];
    this.configuration = { ...DefaultConfig };
  }

  editRole(roleId: number): void {
    this.edit.emit(roleId);
  }

  deleteRole(roleId: number): void {
    this.delete.emit(roleId);
  }
}
