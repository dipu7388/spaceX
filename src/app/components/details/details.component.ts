import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { distinctUntilKeyChanged, filter } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  host: {
    'class': 'ram'
  }
})
export class DetailsComponent implements OnInit {
  pokemon: {[key: string]: any}
  errorObj
  loading=true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(filter(e=> e.id), distinctUntilKeyChanged('id')).subscribe(e=>{
      this.fetchData(e.id)
    })
  }

   async fetchData(id,url?){
    if(!url){
      url=environment.serviceUrl + 'pokemon/'+ id
    }
    url= new URL(url).origin + new URL(url).pathname
    let prm= new URL(url).searchParams;
    try {
      this.loading=true;
        let data= await this.http.get({ url }) as {results:any[], previous: string | null, next: string | null, count: number};
      this.pokemon=data;
    } catch (error) {
      this.pokemon=null
      this.errorObj=error
    }finally{
      this.loading=false;
    }
  }

}
