import { Injectable } from '@angular/core';
import Hero from '../components/heroes/hero';
import {HEROES} from '../components/heroes/mock-heroes';
import {AppModule} from '../app.module';
import {Observable, of} from 'rxjs';
import { MessageService } from './message.service';
@Injectable({
  providedIn: AppModule
})
export class HeroService {
  
  constructor(private messageService: MessageService) { }
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService:fetched heroes')
    return of(HEROES);
  }
  
}