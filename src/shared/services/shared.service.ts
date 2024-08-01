// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private attributeSource = new BehaviorSubject<string>('amount');
  currentAttribute = this.attributeSource.asObservable();

  changeAttribute(attribute: string) {
    this.attributeSource.next(attribute);
  }
}
