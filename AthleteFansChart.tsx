import * as React from "react";
import * as ReactDOM from "react-dom";
import { Bar } from "react-chartjs-2";
import { IAthleteFanChart } from "../../interfaces/Charts/IAthleteFanChart";
//Proprietary Information - Line Removed
import { DropDownList, Input } from "../../common/components/form";
import { ChartDropDownList } from "../../common/components/subscriptions/chartDropDownlist";
import { ChartDateInput } from "../../common/components/subscriptions/ChartDateInput";


interface IAthleteFanChartState {
    chartData: {
        labels: any[],
        datasets: [{
            data: any[],
            backgroundColor: string[]
        }]
    };
    postData: {
        interval: string;
        startDate: string;
    };
    grandTotal: number;
}


export class AthleteFanChart extends React.Component<{}, IAthleteFanChartState>{

    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [""],
                datasets: [
                    {
                        data: [],
                        backgroundColor: ['#F57C00', '#F57C00', '#F57C00', '#F57C00', '#F57C00', '#F57C00'],//['rgba(255,99,132,0.6)','rgba(54,162,235,0.6)','rgba(255,206,86,0.6)','rgba(75,192,192,0.6)','rgba(153,102,255,0.6)','rgba(255,259,64,0.6)','rgba(255,99,132,0.6)']
                    }
                ]
            },
            postData: {
                interval: "Day",
                startDate: "2018-02-01"
            },
            grandTotal: 0

        }
        this.onDropChange = this.onDropChange.bind(this);
        this.chartData = this.chartData.bind(this);
        this.startDate = this.startDate.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    public componentDidMount() {
        this.chartData();
    }

    private onButtonClick() {
        this.setInitialState();
    }

    private setInitialState() {
        //This function will reset the current state of the class to its initial state. Used to 'clear' out the input texts.
        this.setState({
            ...this.state,
            chartData: {
                labels: [""],
                datasets: [
                    {
                        data: [],
                        backgroundColor: ['#F57C00', '#F57C00', '#F57C00', '#F57C00', '#F57C00', '#F57C00']//['#eb547c', 'rgba(54, 162, 235, 0.9)', 'rgba(255, 206, 86, 0.9)', '#70c1b3', 'rgba(153, 102, 255, 0.9)', 'rgba(255, 159, 64, 0.9)', 'rgba(255, 99, 132, 0.9)', 'rgba(54, 162, 235, 0.9)', 'rgba(255, 206, 86, 0.9)', 'rgba(75, 192, 192, 0.9)', 'rgba(153, 102, 255, 0.9)', '#F57C00']
                    }
                ]
            },
            postData: {
                interval: "Day",
                startDate: "2018-02-01"
            },
            grandTotal: 0
        }, () => { this.chartData(); })
    }
    
    public chartData() {
       //Proprietary Information - Line Removed
            .then((response) => {
                let timeFrame = [];
                let totalFans = [];
                let data = response.items;
                data.forEach((itm) => {
                    timeFrame.push(itm.timeFrame)
                    totalFans.push(itm.totalFans)
                });
                this.setState({
                    chartData: {
                        ...this.state.chartData,
                        labels: timeFrame
                    },
                    grandTotal: data[0].grandTotal
                });
                this.setState({
                    ...this.state,
                    chartData: {
                        ...this.state.chartData,
                        datasets: [{
                            ...this.state.chartData.datasets[0],
                            data: totalFans
                        }]
                    }
                })
            })

    }

    public onDropChange(fieldname: string, fieldvalue: any) {
        this.setState({
            postData: {
                ...this.state.postData,
                interval: fieldvalue
            }
        }, () => this.chartData())
    }

    public startDate(fieldname: string, fieldvalue: any) {
        this.setState({
            postData: {
                ...this.state.postData,
                startDate: fieldvalue
            }
        }, () => this.chartData())
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="col-md-6 col-centered">
                    <div className="an-single-component with-shadow">
                        <div className="an-component-header" style={{ backgroundColor: "#f9f9f9" }}>
                            <h6>Fans Following Status</h6>
                            <div className="component-header-right">
                                <div className="an-settings-button">
                                    <a className="setting" onClick={this.onButtonClick}><i className="icon-loading"></i></a>
                                </div>
                            </div>
                            <ChartDropDownList
                                label={""}
                                name="filter"
                                selectedValue={this.state.postData.interval}
                                onChange={this.onDropChange}
                                options={[
                                    { key: "Filter By", value: "Filter By" },
                                    { key: "Month", value: "Month" },
                                    { key: "Week", value: "Week" },
                                    { key: "Day", value: "Day" }
                                ]}
                            />
                            <ChartDateInput
                                name="startDate"
                                label="Start Date"
                                value={this.state.postData.startDate}
                                onChange={this.startDate}
                                type="date"
                                placeholder={this.state.postData.startDate}
                            />
                        </div>
                        <div className="an-component-body">
                            <div className="an-chart-content">
                                <div className="an-chart-details">
                                    <div className="left">
                                        <h3>Total Fans : {this.state.grandTotal} <span>To Date</span></h3>
                                    </div>
                                    <div className="right">
                                        <p>{this.state.postData.interval == "Day"? "Dai" : this.state.postData.interval == "" || this.state.postData.interval == "Filter By" ? "Month" : this.state.postData.interval}ly View</p>
                                    </div>
                                </div>
                                <div className="an-chart-content barChartTwo">
                                    <Bar
                                        data={this.state.chartData}
                                        options={{
                                            scales: {
                                                yAxes: [{
                                                    ticks: {
                                                        beginAtZero: true
                                                    }
                                                }]
                                            },
                                            title: {
                                                display: true,
                                                text: "Number of Fans",
                                                fontSize: 25,
                                                position: "Left"
                                            },
                                            legend: {
                                                display: false,
                                                position: "bottom"
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          
            </React.Fragment>
        )
    }

}



{/* 
          <div className="container col-md-5" style={{ border: "solid" }}>
                    <ul className="list-inline">
                        <li><ul>
                            <li style={{ width: "180px", top: "25px" }}><h4>Total Fans: <strong>{this.state.grandTotal}</strong></h4></li>
                            <li style={{ width: "180px", top: "25px" }}><h4>Fan Range by <strong>{this.state.postData.interval}</strong></h4></li>
                        </ul></li>
                        <li style={{ width: "180px", top: "25px" }}>
                            <DropDownList
                                label="Filter"
                                name="filter"
                                selectedValue={this.state.postData.interval}
                                onChange={this.onDropChange}
                                options={[
                                    { key: "Month", value: "Month" },
                                    { key: "Week", value: "Week" },
                                    { key: "Day", value: "Day" }
                                ]}
                            />
                        </li>
                        <li style={{ width: "180px", top: "25px" }}>
                            <Input
                                name="startDate"
                                label="Start Date"
                                value={this.state.postData.startDate}
                                onChange={this.startDate}
                                type="date"
                                placeholder={this.state.postData.startDate}
                            />
                        </li>
                    </ul>
                    <div className="chart">
                        <Bar
                            data={this.state.chartData}
                            options={{
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                },
                                title: {
                                    display: true,
                                    text: "Number of Fans",
                                    fontSize: 25,
                                    position: "Left"
                                },
                                legend: {
                                    display: false,
                                    position: "bottom"
                                }
                            }}
                        />
                    </div>
                </div>

*/}
