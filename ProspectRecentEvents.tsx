import * as React from "react";
import { IProspectRecentEvents } from "../../interfaces/Events/IProspectRecentEvents";
//Proprietary Information - Line Removed
import * as Moment from "moment";
import { browserHistory } from "react-router";
import loadjs from "loadjs";

interface IProspectReactEventsState {
    prospectRecentEvents: IProspectRecentEvents;
    eventArray: IProspectRecentEvents[];
}

const imgSize = {
    height: 100,
    width: 100
}

export class ProspectRecentEvents extends React.Component<{}, IProspectReactEventsState>{

    constructor(props) {
        super(props);
        this.state = {
            prospectRecentEvents: {
                id: 0,
                eventName: "",
                eventDescription: "",
                fullAddress: "",
                startDate: "",
                endDate: "",//,
                startTime: new Date,
                endTime: new Date,
                isAllDayEvent: false,
                ticketPrice: 0,
                photoUrl: "",
                externalSiteUrl: "",
                createdById: 0,
                firstName: "",
                lastName: "",
                avatarUrl: ""
            },
            eventArray: []


        }
        //bind stuff here
        this.getRecentEvents = this.getRecentEvents.bind(this);
    }
    
    public componentDidMount() {
        this.getRecentEvents();
        
    }

    public getRecentEvents() {
        //Proprietary Information - Line Removed
            .then((response) => {
                //console.log(response)
                //let data = response.items;
                //data.forEach(itm => console.log(Moment("4-12-2018 " + itm.startTime).format("hh:mm")))

                this.setState({ eventArray: response.items }, () => this.loadJs() );//, () => loadjs("/content/public/js/main.js"))
            })
    }

    public loadJs() {
        loadjs("/Content/public/js/upcomingmatches-swiper.js")
    }

    public viewAll() {
        browserHistory.push("/home/Register")
    }

    public onClick(id: any) {
        console.log("this is the id" + id)
        return "nothing";
    }

    render() {
        return (
            <React.Fragment>
                <section className="tg-main-section tg-haslayout">
                    <div className="container">
                        <div className="tg-section-name">
                            <h2>Current Events</h2>
                        </div>
                        <div className="col-sm-11 col-xs-11 pull-right">
                            <div className="row" style={{ height: "445px" }}>
                                <div className="tg-latestresult">
                                    <div className="row">
                                        <div className="col-md-5 col-sm-12 col-xs-12">
                                            <div className="tg-contentbox">
                                                <div className="tg-section-heading"><h2>Prospect Events</h2></div>
                                                <div className="tg-description">
                                                    <p>Here are a few of the most recent events! Come check it out and support some of your favorite athletes.</p>
                                                </div>
                                                <div className="tg-btnbox">
                                                    <a className="tg-btn" href="/home/register">View all</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-7 col-sm-12 col-xs-12" style={{ height: "430px" }}>
                                            <div id="tg-upcomingmatch-slider" className="tg-upcomingmatch-slider tg-upcomingmatch swiper-container-vertical" style={{height: "430px"}}>
                                                <div className="swiper-wrapper" style={{ transform: "translate3d(0px, 0px, 0px)", transitionDuration:"0ms" }}>


                                                    {this.state.eventArray.map((arr, index) =>

                                                        <React.Fragment key={index}>
                                                            <div className="swiper-slide swiper-slide-active" style={{ height: "120px", margin:"5px"}}>
                                                                <div className="tg-match">
                                                                    <div className="tg-matchdetail">
                                                                        <div className="tg-box" style={{ blockSize: "100px", paddingTop: "5px" }}>
                                                                            <strong className="tg-teamlogo">
                                                                                <img style={imgSize} src={arr.photoUrl} />
                                                                            </strong>
                                                                            <h5 style={{ blockSize: "20px" }}><strong>{arr.eventName}</strong></h5>
                                                                            <div style={{ paddingTop: "20px" }}>
                                                                                <h6>{Moment(arr.startDate).format("MMM Do YY")} - {Moment(arr.endDate).format("MMM Do YY")}</h6>
                                                                            </div>
                                                                        </div>
                                                                        <div className="tg-box">
                                                                            <h4>Hosted By</h4>
                                                                        </div>
                                                                        <div className="tg-box">
                                                                            <strong className="tg-teamlogo">
                                                                                <img style={imgSize} src={arr.avatarUrl} />
                                                                            </strong>
                                                                            <h3>{arr.firstName}</h3>
                                                                            <h4>{arr.lastName}</h4>
                                                                        </div>
                                                                    </div>
                                                                    <div className="tg-matchhover" style={{ blockSize: "125px" }}>
                                                                        <div>
                                                                            <address>{arr.fullAddress}</address>
                                                                        </div>
                                                                        <div className="container" style={{ width: "240px" }}>
                                                                            <h4 style={{ paddingLeft: "20px" }}>{arr.eventDescription.split(" ").slice(0, 7).join(" ") + " ..."}</h4>
                                                                        </div>
                                                                        <div>
                                                                             <p style={{
                                                                                top: "50px",
                                                                                left: "15px",
                                                                                right: "25px",
                                                                                height: "125px",
                                                                                color: "#fff",
                                                                                fontSize: "12px"
                                                                            }}>{Moment("2018-04-20 " + arr.startTime).format("hh:mm A")} - {Moment("2018-04-20 " + arr.endTime).format("hh:mm A")}</p>
                                                                        </div>
                                                                        <div className="tg-btnbox" style={{
                                                                            position: "absolute",
                                                                            top: "40px",
                                                                            right: "25px",
                                                                            height: "125px"
                                                                        }}>
                                                                            <a className="tg-btn" href="javascript:;" onClick={() => browserHistory.push('/public/event/' + arr.id)}><span>read more</span></a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                           
                                                        </React.Fragment>
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ height: "45px" }}>
                                    <div className="tg-themebtnnext"><span className="fa fa-angle-down"></span></div>
                                    <div className="tg-themebtnprev swiper-button-disabled"><span className="fa fa-angle-up"></span></div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </React.Fragment>
        )
    }

}
