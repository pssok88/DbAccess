//patric

import * as React from "react";
import { SubscriptionTierBlock } from "../../components/subscription";
import { ISubscriptionTierEntity } from "../../interfaces/subscription";
//Proprietary Information - Line Removed
import { Button } from "../../common/components/form/button";
//Proprietary Information - Line Removed
//Proprietary Information - Line Removed
import { IStripeCharge } from "../../interfaces/stripe/IStripeCharge";

interface ISubscriptionTierState {
    subscriptionTierEntity: ISubscriptionTierEntity,
    tierInfo: ISubscriptionTierEntity[]
}

export class SubscriptionTierPage extends React.Component<any, ISubscriptionTierState>{
    constructor(props) {
        super(props);
        this.state = {
            subscriptionTierEntity: {
                //key: 0,
                tierName: "",
                tierDescription: "",
                tierPrice: 0,
                createdById: 0,
                typeName: "",
                typeDescription: ""
            },
            tierInfo: []
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    public componentDidMount() {
        if (this.props.params.id) {
            console.log("id: ", this.props.params.id);
        }
       //Proprietary Information - Line Removed
            .then((response) => {
                const tiers = response.items;
                console.log(tiers + "you have no subscriptions")
                if (response.items.length == 0) {
                    return (console.log("this is this console log of the if statement"))
                }
                this.setState(
                    { tierInfo: tiers }
                )
            })
    }



    private onSubmit(token, keyId) {
        console.log(token)
        let ndx = this.state.tierInfo.findIndex(x => x.id === keyId);
        if (ndx >= 0) {
            this.setState({ subscriptionTierEntity: this.state.tierInfo[ndx] }, () => { this.StripeCharge(token) });
            console.log("after setstate", ndx, this.state.subscriptionTierEntity)


        }
    }

    private StripeCharge(token: any) {
        let data = {
            ["tierPrice"]: this.state.subscriptionTierEntity.tierPrice,
            ["id"]: this.state.subscriptionTierEntity.id,
            ["tierName"]: this.state.subscriptionTierEntity.tierName,
            ["custToken"]: token.id,
            ["cardToken"]: token.card.id,
            ["stripeEmail"]: token.card.name,
            ["expMonth"]: token.card.exp_month,
            ["expYear"]: token.card.exp_year,
            ["lastFourDigits"]: token.card.last4,
            ["cardType"]: token.card.brand,
            ["invoice"]: token.created
        }

       //Proprietary Information - Line Removed
            .then((response) => {
                console.log(response);
                //this is to reset after charge is complete
                this.setState({
                    subscriptionTierEntity: {
                        //key: 0,
                        keyId: 0,
                        id: 0,
                        tierName: "",
                        tierDescription: "",
                        tierPrice: 0,
                        createdById: 0,
                        typeDescription: "",
                        typeName: ""
                    }
                })
            });
        
    }


    public render() {
        if (this.state.tierInfo.length == 0) {
            return (<div className="main-wrapper">
                
                <div className="an-page-content">
                    <div className="an-flex-center-center">
                        <h3 className="an-logo-heading text-center wow fadeInDown" style={{ visibility: "visible" }}>

                        </h3>
                        <div className="an-4040-page">
                            <h1>Oops!</h1>
                            <p>Currently looks like you are not subscribed to any athletes...<br/> Go subscribe to your favorite Athletes now!!</p>
                        </div>
                        <div className="back-to-home wow fadeInUp" style={{ visibility: "visible" }}>
                            <a href="index.html" className="an-btn an-btn-default">Subscriptions[</a>
                        </div>




                    </div>
                </div>

            </div>)
        }

        return (
            <div className="col-md-12">
                <br />

                <div className="col-md-12 col-md-offset-1">
                    <br />
                    {this.state.tierInfo.map((tier, i) =>
                        <SubscriptionTierBlock
                            //key is required for mapping (unique identifier)
                            key={i}
                            keyId={tier.id}
                            id={tier.id}
                            tierName={tier.tierName}
                            tierPrice={tier.tierPrice}
                            tierDescription={tier.tierDescription}
                            typeDescription={tier.typeDescription}
                            typeName={tier.typeName}
                            createdById={tier.createdById}
                            onSubmit={this.onSubmit}
                        />
                    )}
                </div>
            </div>
        );

    }
}
