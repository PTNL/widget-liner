import { Declare, Widget, OnChange } from 'ptnl-constructor-sdk';
import { DefaultDataOptionKey } from 'ptnl-constructor-sdk/constants';
import { EBlockKey, EViewOption } from './enum';


const ctx = document.getElementById('root') as HTMLCanvasElement;
const CHART_CONFIG: Chart.ChartConfiguration = {
    type: 'line',
    data: {
        labels: [],
        datasets: []
    },
    options: {}
};

const CHART = new window.Chart(ctx.getContext('2d'), CHART_CONFIG)
const COLORS = [
    '#00AFD7',
    '#C724B1',
    '#10069F',
    '#FF9900',
    '#1857F0',
    '#FEDB00',
    '#78D64B',
    '#0C83E4',
    '#8A1F7A',
    '#E45D2B',
    '#F5C7D1',
    '#0E0F7D',
    '#ED6881',
    '#70B5EC',
    '#D76BC8',
    '#6F6CC3',
];

window.addEventListener('resize', function () {
    CHART.resize()
})

@Declare()
export class Liner extends Widget implements OnChange {
    color_indicator = 0;
    
    get columns() {
        return this.dataSettings[DefaultDataOptionKey].columnsByBlock;
    }

    onChange(): void {
        this.color_indicator = 0;

        if (!this.columns[EBlockKey.X].length) {
            CHART.update();
            this.ready();
            return;
        }
        

        if (this.columns[EBlockKey.Category].length) {
            CHART_CONFIG.data.datasets = this.getCategoryRows();
        } else {
            CHART_CONFIG.data.datasets = this.getRows();
        }
        
        CHART_CONFIG.data.labels = this.data[DefaultDataOptionKey].map(item => {
            return item[this.columns[EBlockKey.X][0].path]
        });
    
        Object.assign(CHART_CONFIG.options, this.getConfigOptions());

        CHART.update();
        this.ready();
    }
    
    private getConfigOptions(): Chart.ChartOptions {
        console.log(this.viewSettings)
        return {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: 10,
            },
            plugins: {
                datalabels: {
                    display: this.viewSettings[EViewOption.DataLabels],
                    align: 'top'
                },
            },
            legend: {
                display: this.viewSettings[EViewOption.Legend],
            },
            elements: {
                point: {
                    pointStyle: this.viewSettings[EViewOption.PointerStyle],
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        display: this.viewSettings[EViewOption.TickX]
                    },
                    gridLines: {
                        display: this.viewSettings[EViewOption.GridX],
                    }
                }],
                yAxes: [
                    {
                        type: 'linear',
                        position: 'left',
                        ticks: {
                            display: this.viewSettings[EViewOption.TickY]
                        },
                        gridLines: {
                            display: this.viewSettings[EViewOption.GridY],
                        },
                    }
                ]
            }
        }
    }
    
    private getRows() {
        const rows = [];
        this.columns[EBlockKey.Y].forEach(column => {
            rows.push(this.createDataset(
                column.name,
                this.data[DefaultDataOptionKey].map(item => item[column.path])
            ));
        });
        return rows;
    }
    
    private getCategoryRows() {
        const categoryPath = this.columns[EBlockKey.Category][0].path;
        const groups = new Set<any>();
        const rows = [];
    
        this.data[DefaultDataOptionKey].forEach(item => groups.add(item[categoryPath]));
        this.columns[EBlockKey.Y].forEach(column => {
            groups.forEach(group => {
                rows.push(
                    this.createDataset(
                        `${column.name} (${group})`,
                        this.data[DefaultDataOptionKey].map(item => {
                            if (item[categoryPath] === group) {
                                return item[column.path]
                            } else {
                                return 0
                            }
                        })
                    )
                )
            })
        });
        return rows;
    }
    

    private createDataset(label, data, yID = 1) {
        this.color_indicator += 1;
        return {
            label,
            data,
            fill: this.viewSettings[EViewOption.Fill],
            backgroundColor: this.getBackgroundColor(COLORS[this.color_indicator % COLORS.length]),
            borderColor: COLORS[this.color_indicator % COLORS.length],
            borderWidth: 1,
            lineTension: this.viewSettings[EViewOption.LineTension] ? 0.3 : null,
            pointRadius: 2,
            pointHoverRadius: 5,
            pointBackgroundColor: COLORS[this.color_indicator % COLORS.length],
            showLine: this.viewSettings[EViewOption.Line]
        }
    }

    private getBackgroundColor(hex) {
        const rgb = this.hexToRgb(hex)
        if (!rgb) {
            return hex
        }
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;
    }

    private hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
      
}
