/**
 * Created by 米饭 on 2017-04-14.
 */

import {Injectable} from "@angular/core";

@Injectable()
export default class LocalStorageService {

  constructor() {
  }


  set<T>(key: string, value: T | null) {
    let jsonStr = JSON.stringify(value);
    localStorage.setItem(key, jsonStr);
  }
  get<T>(key: string): T | null {
    let jsonStr = localStorage.getItem(key);
    if(!jsonStr) {
      return null;
    }
    return JSON.parse(jsonStr);
  }

  clear(): void {
    localStorage.clear();
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  key(index: number): string | null {
    return localStorage.key(index);
  }

  get length(): number {
    return localStorage.length;
  }
}

