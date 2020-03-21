import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

  objectKeys = Object.keys;
  objectValues = Object.values;
  math = Math;
  rawView = '';
  serviceInfo;
  diskUsageInfo;
  bucketSizes=[];
  hgChartDatasets=[{data: [], label: 'Number of objects'}];
  hgChartLabels=[];
  hgChartType = 'radar';
  hgChartColors = [
      {
          backgroundColor: 'rgba(151,187,205,0.9)',
          borderColor: 'rgba(151,187,205,1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(151,187,205,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(151,187,205,1)'
      }
  ];
  hgChartOptions = {
      responsive: true
  };

  szChartDatasets=[{data: [], label: 'Size of bucket in Bytes'}];
  szChartLabels=[];
  szChartType = 'bar';
  szChartColors = [
      {
          backgroundColor: 'rgba(151,187,205,0.9)',
          borderColor: 'rgba(151,187,205,1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(151,187,205,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(151,187,205,1)'
      }
  ];
  szChartOptions = {
      responsive: true
  };

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  	this.serverInfo()
    this.diskInfo()
  }

  public hgChartClicked(e: any): void {
  }

  public hgChartHovered(e: any): void {
  }

  public szChartClicked(e: any): void {
  }

  public szChartHovered(e: any): void {
  }

  private serverInfo(){
  	this.apiService.serverInfo().subscribe((data)=>{
      this.apiService.validateAuthInResponse(data)
      this.serviceInfo = data;
    });
  }

  private diskInfo(){
  	this.apiService.diskInfo().subscribe((data)=>{
      this.apiService.validateAuthInResponse(data)
      console.log("Disk Usege >>>>>>>>>>>>",data);
      this.diskUsageInfo = data;
      if(data.hasOwnProperty('objectsSizesHistogram')){
        var objectsSizesHistogram = this.diskUsageInfo.objectsSizesHistogram;
        const histogramKeysRawArr = Object.keys(objectsSizesHistogram)
        const histogramValsRawArr = Object.values(objectsSizesHistogram)
        this.hgChartDatasets[0].data = histogramValsRawArr;

        this.hgChartLabels = [];
        for (let i = 0; i < histogramKeysRawArr.length; i++) {
          var histogramLabel = histogramKeysRawArr[i].split('_').join(' ');
          this.hgChartLabels.push(histogramLabel)
        }
      }

      if(data.hasOwnProperty('bucketsSizes') && this.diskUsageInfo.bucketsSizes != {}){
        var objectBucketSizes = this.diskUsageInfo.bucketsSizes;
        const bucketSizesKeysRawArr = Object.keys(objectBucketSizes)
        const bucketSizesValsRawArr = Object.values(objectBucketSizes)
        this.szChartDatasets[0].data = bucketSizesValsRawArr;
        this.szChartLabels= bucketSizesKeysRawArr;
      }
    });
  }

  private rawPrepare(obj){
    this.rawView = obj;
  }

}
