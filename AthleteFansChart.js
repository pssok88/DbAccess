import * as React from "react";
import { Bar } from "react-chartjs-2";
import { UserApi } from "../../api/Stats/index";
import { ChartDropDownList } from "../../common/components/subscriptions/chartDropDownlist";
import { ChartDateInput } from "../../common/components/subscriptions/ChartDateInput";
export class AthleteFanChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [""],
                datasets: [
                    {
                        data: [],
                        backgroundColor: ['#F57C00', '#F57C00', '#F57C00', '#F57C00', '#F57C00', '#F57C00'],
                    }
                ]
            },
            postData: {
                interval: "Day",
                startDate: "2018-02-01"
            },
            grandTotal: 0
        };
        this.onDropChange = this.onDropChange.bind(this);
        this.chartData = this.chartData.bind(this);
        this.startDate = this.startDate.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }
    componentDidMount() {
        this.chartData();
    }
    onButtonClick() {
        this.setInitialState();
    }
    setInitialState() {
        //This function will reset the current state of the class to its initial state. Used to 'clear' out the input texts.
        this.setState(Object.assign({}, this.state, { chartData: {
                labels: [""],
                datasets: [
                    {
                        data: [],
                        backgroundColor: ['#F57C00', '#F57C00', '#F57C00', '#F57C00', '#F57C00', '#F57C00'] //['#eb547c', 'rgba(54, 162, 235, 0.9)', 'rgba(255, 206, 86, 0.9)', '#70c1b3', 'rgba(153, 102, 255, 0.9)', 'rgba(255, 159, 64, 0.9)', 'rgba(255, 99, 132, 0.9)', 'rgba(54, 162, 235, 0.9)', 'rgba(255, 206, 86, 0.9)', 'rgba(75, 192, 192, 0.9)', 'rgba(153, 102, 255, 0.9)', '#F57C00']
                    }
                ]
            }, postData: {
                interval: "Day",
                startDate: "2018-02-01"
            }, grandTotal: 0 }), () => { this.chartData(); });
    }
    chartData() {
        UserApi.chartData(this.state.postData)
            .then((response) => {
            let timeFrame = [];
            let totalFans = [];
            let data = response.items;
            data.forEach((itm) => {
                timeFrame.push(itm.timeFrame);
                totalFans.push(itm.totalFans);
            });
            this.setState({
                chartData: Object.assign({}, this.state.chartData, { labels: timeFrame }),
                grandTotal: data[0].grandTotal
            });
            this.setState(Object.assign({}, this.state, { chartData: Object.assign({}, this.state.chartData, { datasets: [Object.assign({}, this.state.chartData.datasets[0], { data: totalFans })] }) }));
        });
    }
    onDropChange(fieldname, fieldvalue) {
        this.setState({
            postData: Object.assign({}, this.state.postData, { interval: fieldvalue })
        }, () => this.chartData());
    }
    startDate(fieldname, fieldvalue) {
        this.setState({
            postData: Object.assign({}, this.state.postData, { startDate: fieldvalue })
        }, () => this.chartData());
    }
    render() {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "col-md-6 col-centered" },
                React.createElement("div", { className: "an-single-component with-shadow" },
                    React.createElement("div", { className: "an-component-header", style: { backgroundColor: "#f9f9f9" } },
                        React.createElement("h6", null, "Fans Following Status"),
                        React.createElement("div", { className: "component-header-right" },
                            React.createElement("div", { className: "an-settings-button" },
                                React.createElement("a", { className: "setting", onClick: this.onButtonClick },
                                    React.createElement("i", { className: "icon-loading" })))),
                        React.createElement(ChartDropDownList, { label: "", name: "filter", selectedValue: this.state.postData.interval, onChange: this.onDropChange, options: [
                                { key: "Filter By", value: "Filter By" },
                                { key: "Month", value: "Month" },
                                { key: "Week", value: "Week" },
                                { key: "Day", value: "Day" }
                            ] }),
                        React.createElement(ChartDateInput, { name: "startDate", label: "Start Date", value: this.state.postData.startDate, onChange: this.startDate, type: "date", placeholder: this.state.postData.startDate })),
                    React.createElement("div", { className: "an-component-body" },
                        React.createElement("div", { className: "an-chart-content" },
                            React.createElement("div", { className: "an-chart-details" },
                                React.createElement("div", { className: "left" },
                                    React.createElement("h3", null,
                                        "Total Fans : ",
                                        this.state.grandTotal,
                                        " ",
                                        React.createElement("span", null, "To Date"))),
                                React.createElement("div", { className: "right" },
                                    React.createElement("p", null,
                                        this.state.postData.interval == "Day" ? "Dai" : this.state.postData.interval == "" || this.state.postData.interval == "Filter By" ? "Month" : this.state.postData.interval,
                                        "ly View"))),
                            React.createElement("div", { className: "an-chart-content barChartTwo" },
                                React.createElement(Bar, { data: this.state.chartData, options: {
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
                                    } }))))))));
    }
}
{
}
//# sourceMappingURL=AthleteFansChart.js.map