import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'dk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentParams = this.activateRoute.queryParams;
  missionList: any[] = [];
  loading = true;
  errorObj;
  filters = [
    {
      name: 'Launch Year',
      key: 'launch_year',
      values: Array(new Date().getFullYear() - 2002 + 1)
        .fill(new Date().getFullYear())
        .map((e, i) => ({
          param: { launch_year: e - i },
          value: e - i,
          label: e - i,
        })),
    },
    {
      name: 'Successful Launch',
      key: 'launch_success',
      values: [
        { param: { launch_success: 'yes' }, value: 'yes', label: 'Yes' },
        { param: { launch_success: 'no' }, value: 'no', label: 'No' },
      ],
    },
    {
      name: 'Successful Landing',
      key: 'land_success',
      values: [
        { param: { land_success: 'yes' }, value: 'yes', label: 'Yes' },
        { param: { land_success: 'no' }, value: 'no', label: 'No' },
      ],
    },
  ];
  currentFilterParam = {};
  constructor(
    private http: HttpService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    activateRoute.queryParams.subscribe((e) => {
      this.currentFilterParam = e || {};
      this.missionList = [];
      this.fetchData();
    });
  }
  ngOnInit() {}
  async fetchData(event?) {
    let params = new HttpParams()
      .set('offset', this.missionList.length + '')
      .set('limit', '20');
    Object.entries(this.currentFilterParam).forEach(([k, v]) => {
      params = params.set(k, v + '');
    });
    if (event && event.target) {
      if (
        !(
          event.target.offsetHeight + event.target.scrollTop >=
          event.target.scrollHeight - 10
        )
      )
        return;
    }
    this.loading = true;
    try {
      let data = (await this.http.get({
        url: environment.serviceUrl,
        params,
      })) as any[];
      this.missionList.push(...data);
    } catch (error) {
      this.errorObj = error;
    } finally {
      this.loading = false;
    }
  }

  debounceScroll(fn, d) {
    let timer;
    return function (...args) {
      let context = this;
      // let args= arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, d);
    };
  }

  fetchMoreData = this.debounceScroll(this.fetchData, 300);

  applyFilter(paramName, paramValue) {
    this.router.navigate([], {
      queryParams: {
        [paramName]:
          this.currentFilterParam[paramName] == paramValue ? null : paramValue,
      },
      queryParamsHandling: 'merge',
    });
  }
}
