import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  sidebarRedirects = [
    {
      label: "Thêm mới",
      path: "add"
    },
    {
      label: "Danh sách",
      path: "list"
    },
    {
      label: "Thống kê",
      path: "statistic"
    }
  ]
}
