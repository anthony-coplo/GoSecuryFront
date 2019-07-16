import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ressources',
  templateUrl: './ressources.component.html',
  styleUrls: ['./ressources.component.scss']
})
export class RessourcesComponent implements OnInit {

  constructor(private http: HttpClient) { }

  public ressources: any;

  ngOnInit() {
    this.getRessources();
  }

  async getRessources() {
    await this.http.get('http://localhost:8080/ressources').toPromise()
    .then((res) => {
      this.ressources = res;
    });
  }
}
