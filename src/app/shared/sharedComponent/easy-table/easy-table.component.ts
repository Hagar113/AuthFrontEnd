// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-easy-table',
//   templateUrl: './easy-table.component.html',
//   styleUrls: ['./easy-table.component.css']
// })
// export class EasyTableComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-easy-table',
  templateUrl: './easy-table.component.html',
  styleUrls: ['./easy-table.component.css'],
})
export class EasyTableComponent implements OnInit {
  public configuration!: Config;
  public columns!: Columns[];
  public data: any[] = [];

  ngOnInit(): void {
    this.columns = [
      { key: 'level', title: 'Level' },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'STATUS' },
    ];
    this.data = this.data;
    this.configuration = { ...DefaultConfig };
  }
}
