import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(name: string[], searchInput: string): any[] {
    if (!searchInput) {
      return [];
    }
    searchInput = searchInput.toLowerCase();
    return name.filter(
      x => x.toLowerCase().includes(searchInput)
    )
  }
}