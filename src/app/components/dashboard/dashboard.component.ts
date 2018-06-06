import { Component, OnInit } from '@angular/core';
import Hero from '../heroes/hero';
import {HeroService} from '../../service/hero.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [HeroService]
})
export class DashboardComponent implements OnInit {
  heroes:Hero[] = [];
  getHeroes():void{
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1,5))
  }
  constructor(private heroService:HeroService) { }

  ngOnInit() {
    this.getHeroes()
  }

}
