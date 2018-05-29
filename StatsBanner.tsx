
import * as React from "react";
import { IStatsEntity } from "../../interfaces/Stats/IStatsEntity";
import { UserApi } from "../../api/Stats/index";
import { } from "../../public/image"

interface IStatsPageState {
    stats: IStatsEntity;
}

export class StatsPage extends React.Component<{}, IStatsPageState>{
    constructor(props) {
        super(props);
        this.state = {
            stats : {
                TotalSubscribers: 0,
                TotalCampaigns: 0,
                TotalFans: 0,
                TotalAthletes: 0
            }
        }
        this.stats = this.stats.bind(this);
    }

    public componentDidMount() {
        this.stats();
    }

    public stats() {
        UserApi.statsData()
            .then((response) => {
                //console.log(response)
                this.setState({
                    stats: {
                        TotalSubscribers: response.item.totalSubscribers,
                        TotalCampaigns: response.item.totalCampaigns,
                        TotalFans: response.item.totalFans,
                        TotalAthletes: response.item.totalAthletes
                    }
                })
            })
    }

    render() {
        return (
            <section className="tg-main-section tg-haslayout" style={{ backgroundColor:"#373542" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-xs-12">
                            <div className="tg-statistics">
                                <div className="tg-statistic tg-goals">
                                    <span className="tg-icon"><img src="/Content/public/images/prospectKick.png" alt="Fighting icon by kareemovic, from thenounproject.com" style={{ height: "115px", position: "relative", bottom: "10px"}} /></span>
                                    <h2><span className="tg-statistic-count">{this.state.stats.TotalAthletes}</span></h2>
                                    <h3>Prospects</h3>
                                </div>
                                <div className="tg-statistic tg-activeplayers">
                                    <span className="tg-icon"><img src="/Content/public/images/sportsFan.png" alt="Sport Fan icon by Colin Lawrence, from thenounproject.com" style={{ height: "115px", position: "relative", bottom: "10px" }} /></span>
                                    <h2><span className="tg-statistic-count">{this.state.stats.TotalFans}</span></h2>
                                    <h3>Fans</h3>
                                </div>
                                <div className="tg-statistic tg-activeteams">
                                    <span className="tg-icon"><img src="/Content/public/images/prospectSubscribers.png" alt="Group icon by Joy Thomas, from thenounproject.com" style={{ height: "115px", position: "relative", bottom:"10px" }} /></span>
                                    <h2><span className="tg-statistic-count">{this.state.stats.TotalSubscribers}</span></h2>
                                    <h3>Subscribers</h3>
                                </div>
                                <div className="tg-statistic tg-earnedawards">
                                    <span className="tg-icon"><img src="/Content/public/images/prospectTrophyNew.png" alt="Trophy icon by Gregor Cresnar, from thenounproject.com" style={{ height: "115px", position: "relative", bottom: "10px" }} /></span>
                                    <h2><span className="tg-statistic-count">${this.state.stats.TotalCampaigns}</span></h2>
                                    <h3>Campaigns Funding</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

}
