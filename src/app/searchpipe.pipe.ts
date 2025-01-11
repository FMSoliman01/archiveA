import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'search' 
})
export class SearchPipe implements PipeTransform {
  transform(name: any[], searchInput: string): any[] {
    if (!searchInput) {
      return name;
    }
    //searchInput = searchInput.toLowerCase();
    return name.filter((name) =>
      name.toLowerCase().includes(searchInput.toLowerCase()));
    
  }
}