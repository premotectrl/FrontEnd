var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import * as ChartsJs from 'chart.js';
let ScalarChart = class ScalarChart {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.validKPIData = true;
        this.midIcon = "assets/mobile-robotics/connect-graph.svg";
    }
    set chartConfig(kpiGroup) {
        this._chartConfig = kpiGroup;
        this._states = Array.from(this._chartConfig.kpis.values());
        if (this.chart) {
            this.updateChart(this.chart, this._chartConfig);
        }
    }
    ngOnChanges(changes) {
        // const dVal: SimpleChanges = changes.chartConfig.currentValue;
        // this.updateChart(this.chart, dVal);
    }
    ngOnInit() {
        // this.context = this.canvasRef.nativeElement.getContext('2d');
        // this.makeChart(this._chartConfig, this.context);
    }
    ngAfterViewInit() {
        this.context = this.canvasRef.nativeElement.getContext('2d');
        this.makeChart(this._chartConfig, this.context);
    }
    updateChart(updChart, newData) {
        try {
            const newDat = Array.from(newData.kpis).map(([k, kpiConf]) => kpiConf.value);
            updChart.data.datasets[0].data = newDat;
            updChart.update();
        }
        catch (e) { }
    }
    makeChart(config, context) {
        const COLORS = Array.from(config.kpis).map(([k, kpiConf]) => kpiConf.color);
        const LABELS = Array.from(config.kpis).map(([k, kpiConf]) => kpiConf.title);
        const VALUES = Array.from(config.kpis).map(([k, kpiConf]) => kpiConf.value);
        this.chart = new ChartsJs.Chart(context, {
            type: 'doughnut',
            data: {
                labels: LABELS,
                datasets: [
                    {
                        data: VALUES,
                        backgroundColor: COLORS
                    }
                ]
            },
            options: {
                cutoutPercentage: 70,
                legend: {
                    display: false
                }
            }
        });
    }
};
__decorate([
    Input('chartConfig'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ScalarChart.prototype, "chartConfig", null);
__decorate([
    ViewChild('myChart'),
    __metadata("design:type", ElementRef)
], ScalarChart.prototype, "canvasRef", void 0);
ScalarChart = __decorate([
    Component({
        selector: 'scalar-chart',
        template: `
        
        <!--<div *ngIf="_chartConfig ">
            <span translate>mobile-robotics-navigation.tab.title</span>
            <img src="{{_chartConfig.icon}}" alt="" class="">


            <ul>
                <li *ngFor="let kpi of _states">
                    name: {{kpi.title}}, value: {{kpi.value}}, samples: {{kpi.count}}, icon: {{kpi.icon}}, color: {{kpi.color}}
                </li>
            </ul>
            
            <div>
                <canvas #myChart></canvas>
            </div>
        </div>-->

        
        <div *ngIf="_chartConfig" class="col-xs-12 secondary-kpis-column" ngClass="validKPIData ? 'col-md-4' : 'col-md-6'">
            <div class="secondary-kpis-column-header">{{_chartConfig.title}}</div>
            <div ngShow="validKPIData" class="row vertical-align" style="margin-top: 30px;">
              
                <div class=" col-xs-4 col-sm-4 col-md-6 col-lg-6">  
                     <div class="infoContainer">
                         <img src="{{midIcon}}" alt="" class="holeIcon">
                     </div>
                     <canvas class="chart chart-doughnut" #myChart></canvas>
                </div>
            
                <div class="  col-xs-8 col-sm-8 col-md-6 col-lg-6 legend-table">
                    
                    <table align="left">
                        <tr *ngFor="let state of _states">
                            <td>
                               <!-- <div class="legend-table-color" [ngStyle]="{'background-color': state.color}"></div> -->
                               <img  class="legend-table-color" src="{{state.icon}}"> 
                            </td>
                            <td class="legend-table-value">{{state.value}}&#37;</td>
                            <td class="legend-table-label">{{state.title}}</td>
                        </tr>
                    </table>


                    <!--<ul>
                        <li *ngFor="let kpi of _states">
                            name: {{kpi.title}}, value: {{kpi.value}}, samples: {{kpi.count}}, icon: {{kpi.icon}}, color: {{kpi.color}}
                        </li>
                    </ul>-->
                    
                </div>
            </div>

            <!--<kc-alert ngHide="validKPIData" warning="true">
                {{'views.productivityInsights.EmptyKpisWarning' | translate}}
            </kc-alert>-->
        </div>
    `,
        styles: [
            `
            /* style here ! this is less -> have a look at map-view.component.ts */
            .chartContainer{
                position: relative;
            }
            .infoContainer{ 
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                /* Flex positioning ensures that the enclosed p tag is centered horizontally and vertically in the container*/
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            .holeIcon{
                width: 10%;
               } 
            .seeMe{
                background-color: red;
            }
        
        `
        ],
    }),
    __metadata("design:paramtypes", [ElementRef])
], ScalarChart);
export { ScalarChart };
//# sourceMappingURL=scalar-chart.component.js.map