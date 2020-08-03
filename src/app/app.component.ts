import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CanvasJS from '../assets/canvasjs.min';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {  
	constructor(private _http: HttpClient) {}
	dataPointsArray:any;
	temp: any;
	ngOnInit():void {
	let y = 0;
	let dataPointsArray1 = [];
	let charts = [];
	/** 
	this._http.get('http://127.0.0.1:5002/').subscribe(data => {
			dataPointsArray1 = (data["lead_data"]["1"]);
			console.log(dataPointsArray1)
			for ( var i = 0; i < 5500; i++ ) {		  
				y = dataPointsArray1[i];	
				dataPoints.push({ y: y});
			}
			let chart = new CanvasJS.Chart("chartContainer1", {
				zoomEnabled: true,
				animationEnabled: true,
				exportEnabled: true,
				title: {
					text: "Performance Demo - 10000 DataPoints"
				},
				subtitles:[{
					text: "Try Zooming and Panning"
				}],
				data: [
				{
					type: "line",                
					dataPoints: dataPoints
				}]
			});
				
			chart.render();
			
			
		});
		*/
		

		
		this._http.get('http://140.113.59.182:8080/').subscribe(data => {
			let xAxisStripLinesArray = [];
			let yAxisStripLinesArray = [];
			for(var j=1;j<=12;j++){
				let dataPoints = [];
				dataPointsArray1 = (data["lead_data"][j.toString()]);
				for ( var i = 0; i < 5000; i++ ) {		  
					y = dataPointsArray1[i];	
					dataPoints.push({ y: y});
				}
				let con = "chartContainer";
				let lead = "Lead";

				let chart = new CanvasJS.Chart(con.concat(j.toString()), {
					zoomEnabled: true,
					animationEnabled: true,
					exportEnabled: true,
					title: {
						text: lead.concat(j.toString())
					},
					axisY:{
						stripLines:yAxisStripLinesArray,
					  gridThickness: 2,
					  gridColor:"#DC74A5",
					  lineColor:"#DC74A5",
					  tickColor:"#DC74A5",
					  labelFontColor:"#DC74A5",        
					},
					axisX:{
						stripLines:xAxisStripLinesArray,
					  gridThickness: 2,
					  gridColor:"#DC74A5",
					  lineColor:"#DC74A5",
					  tickColor:"#DC74A5",
					  labelFontColor:"#DC74A5",
					},
					data: [
					{
						lineThickness:3,
						type: "spline",                
						dataPoints: dataPoints
					}]
				});

				//chart.render();
				charts.push(chart);
				

			} 
			for(var z = 0;z <= 11;z++){
				for(var l = 0;l<5000;l++){
					if(l%20 == 0){
						xAxisStripLinesArray.push({value:l,thickness:0.7, color:"#DC74A5"});
					}
				}
				for(var y =-30;y<30;y = y+2.5){
					yAxisStripLinesArray.push({value:y,thickness:0.7, color:"#DC74A5"});
				}
				charts[z].render();
			}
		})
	/** 
	this._http.get('http://127.0.0.1:5002/').subscribe(data => {
		dataPointsArray = data["lead_data"]["1"];

	})
	*/

	/** 		
	for ( var i = 0; i < 5500; i++ ) {		  
		y += Math.round(5 + Math.random() * (-5 - 5));
		/**y = this.dataPointsArray[i];	
		dataPoints.push({ y: y});

	}
	
	
	let chart = new CanvasJS.Chart("chartContainer", {
		zoomEnabled: true,
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: "Performance Demo - 10000 DataPoints"
		},
		subtitles:[{
			text: "Try Zooming and Panning"
		}],
		data: [
		{
			type: "line",                
			dataPoints: dataPoints
		}]
	});
		
	chart.render();
	**/
	}
	
	getdata(){
		this._http.get('http://140.113.59.182:8080/').subscribe(data => {
			this.temp = data["lead_data"]["1"];
		})
	}
}
