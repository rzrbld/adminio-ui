import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchPolicy: string): any[] {

    if (!items) {
      return [];
    }
    if (!searchPolicy) {
      return items;
    }
    searchPolicy = searchPolicy.toLocaleLowerCase();

    return items.filter(it => {
      return it.toLocaleLowerCase().includes(searchPolicy);
    });
  }

}
