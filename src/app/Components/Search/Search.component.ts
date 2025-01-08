import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileService } from '../../services/file.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-Search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Search.component.html',
  styleUrls: ['./Search.component.css'],
})
export class SearchComponent implements OnInit {

  data:any[] = [ ];
  title: string = '';
  Directorate:string='';
  letterNumber: string | null = null;
  tags: string = '';
  resultArray: {
    fileDate: any; letterNumber: number; title: string; tags: string ,  Directorate:string;

}[] = [];
fileDate: any;
from: any;

constructor(private fileService: FileService) {}

  ngOnInit():void {
    this.fileService.getFile().subscribe({
      next: (response) => {(this.data = response),this.resultArray=[...this.data];},
      error: (error) => console.error('Error:', error),
      complete: () => console.log('File fetched successfully.'),
    });
    this.resultArray = this.data;
  }

  beginSearch(event: any) {
    const value = event.target?.value;
    if (value) {
      console.log(value);
    } else {
      console.log('لا توجد قيمة في الحقل.');
    }

    const filter = {
      Directorate: this.Directorate,
      fileDate: this.fileDate,
      from: this.from,
      letterNumber: this.letterNumber,
      title: this.title,
      tags: this.tags,
    };
    console.log('Search Filter:', filter);

    this.resultArray = this.data.filter((row) => this.isExist(row, filter));
  }

  isExist(
    row: { fileDate: string; letterNumber: string; title: string; tags: string; Directorate: string },
    filter: { fileDate: string; letterNumber: string | null; title: string; tags: string; Directorate: string }
  ): boolean {
    let findings = true;
  
    (Object.keys(filter) as (keyof typeof filter)[]).forEach((key) => {
      if (row.hasOwnProperty(key)) {
        const textToSearch = row[key]; // القيمة داخل row
        const searchValue = filter[key]; // القيمة المراد البحث عنها
  
        if (searchValue) {
          if (key === 'fileDate') {
            const rowDate = new Date(textToSearch).toISOString().split('T')[0];
            const searchDate = new Date(searchValue).toISOString().split('T')[0];
            if (rowDate !== searchDate) {
              findings = false;
            }
          } else if (key === 'letterNumber') {
            if (Number(textToSearch) !== Number(searchValue)) {
              findings = false;
            }
          } else if (['Directorate', 'title', 'tags'].includes(key)) {
            if (
              typeof textToSearch === 'string' &&
              typeof searchValue === 'string'
            ) {
              const res = textToSearch.trim().toLowerCase().includes(searchValue.trim().toLowerCase());
              if (!res) {
                findings = false;
              }
            }
          }
        }
      }
    });
  
    return findings;
  }
}