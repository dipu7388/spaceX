import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: "dk-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(
    private http: HttpService
  ) {}
  pokemonList: any[]=[];
  nextUrl
  loading=true;
  errorObj
  ngOnInit() {
    this.fetchData()
  }
 async fetchData(url?,event?){
    if(!url){
      url=environment.serviceUrl + 'pokemon'
    }
    let prm= new URL(url).searchParams;
    let params= new HttpParams().set("offset", `${prm.get("offset") || 0}` ).set("limit", `${prm.get("limit") || 20}`)

    if(event && event.target){
      if(!( (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 10)))
        return
    }
   this.loading=true;
   try {
        let data= await this.http.get({ url: environment.serviceUrl + 'pokemon' , params}) as {results:any[], previous: string | null, next: string | null, count: number};
      if(data.next){
        this.nextUrl= data.next;
      }
      this.pokemonList.push(...data.results.map(e=>{
     return {...e,
      id: parseInt(e.url.split('/pokemon/')[1],10)
    }
   }));
   } catch (error) {
     this.errorObj=error
   }finally{
   this.loading=false;

   }

  }

  debounceScroll (fn,d){
    let timer;
    return function (...args){
      let context=this;
      // let args= arguments;
      clearTimeout(timer)
      timer= setTimeout(() => {
        fn.apply(context, args)
      }, d);
    }
  }

  fetchMoreData= this.debounceScroll(this.fetchData,300);

}
