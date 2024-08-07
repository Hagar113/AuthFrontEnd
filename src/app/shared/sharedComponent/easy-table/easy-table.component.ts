import { Component, Input, OnInit, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-easy-table',
  templateUrl: './easy-table.component.html',
  styleUrls: ['./easy-table.component.css'],
})
export class EasyTableComponent implements OnInit {
  @Input() inputData: any[] = [];
  @Input() pageName: string = '';
  @Input() inputColumns: Columns[] = [];
  @Input() actions: { key: string, title: string, handler: (rowData: any) => void }[] = [];
  @Output() actionTriggered = new EventEmitter<{ action: string, rowData: any }>();

  public configuration!: Config;
  public columns!: Columns[];
  public data: any[] = [];

  @ViewChild('actionsTemplate', { static: true }) actionsTemplate!: TemplateRef<any>;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.data = this.inputData;
    this.columns = [
      ...this.inputColumns,
      {
        key: 'actions',
        title: this.translate.instant('Actions'),
        cellTemplate: this.actionsTemplate,
      },
    ];
    this.configuration = { ...DefaultConfig };

    console.log('Input Data:', this.inputData);
  }

  handleAction(actionKey: string, rowData: any): void {
    this.actionTriggered.emit({ action: actionKey, rowData });
  }
}
