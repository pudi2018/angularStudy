import { Component, OnInit } from '@angular/core';
import Hero from './hero';
import {HEROES} from './mock-heroes';
import {HeroService} from '../../service/hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroService]
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id:1,
    name: 'WIndstorm'
  }
  selectedHero: Hero;
  heroes: Hero[];
  onSelect(hero:Hero):void{
    this.selectedHero = hero;
  }
  getHeroes():void{
      //this.heroes = this.heroService.getHeroes();
      this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
  constructor(private heroService:HeroService) { 
    
  }

  ngOnInit() {
    this.getHeroes()
  }

}
