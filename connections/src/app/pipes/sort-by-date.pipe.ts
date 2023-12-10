import { Pipe, PipeTransform } from '@angular/core';
import { MessageWithAuthorName } from '../models/dialog.model';

@Pipe({
  name: 'sortByDate',
  standalone: true,
})
export class SortByDatePipe implements PipeTransform {
  transform(value: MessageWithAuthorName[]): MessageWithAuthorName[] {
    return value.sort(
      (a, b) => parseInt(a.createdAt.S, 10) - parseInt(b.createdAt.S, 10)
    );
  }
}
