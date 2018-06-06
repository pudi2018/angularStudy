import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import Hero from '../components/heroes/hero';
import {HEROES} from '../components/heroes/mock-heroes';
import {AppModule} from '../app.module';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { MessageService } from './message.service';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: AppModule
})
export class HeroService {
  
  private heroesUrl = 'api/heroes';
  
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }
  // getHeroes(): Observable<Hero[]> {
  //   this.messageService.add('HeroService:fetched heroes')
  //   return of(HEROES);
  // }
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError('getHeroes',[]))
      )
  }
  getHero(id:number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  updateHero(hero:Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`update hero id =${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl,hero,httpOptions).pipe(
      tap((hero: Hero) =>this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`detleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }
  private log(message: string){
    this.messageService.add('HttpService' + message)
  }
  private handleError<T> (operators = 'operation', result? : T){
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operators} failed: ${error.message}`)

      return of(result as T)
    }
  }
  
}