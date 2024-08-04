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
  @Input() actions: { key: string, title: string, handler: (rowData: any) => void }[] = []; // Configurable actions
  @Output() actionTriggered = new EventEmitter<{ key: string, rowData: any }>();

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

    console.log('Input Data:', this.inputData);
  }

  handleAction(actionKey: string, rowData: any): void {
    console.log('Received rowData:', rowData);

    const action = this.actions.find(a => a.key === actionKey);
    if (action) {
      if (rowData) {
        if (rowData.id !== undefined) {
          console.log(`Performing action '${actionKey}' with rowData.id:`, rowData.id);
          action.handler(rowData);
        } else {
          console.error('Invalid rowData: Missing id', rowData);
        }
      } else {
        console.error('Invalid rowData: undefined');
      }
    } else {
      console.error('Action not found:', actionKey);
    }
  }
}
