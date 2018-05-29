//Patric

import * as React from "react";
import { ISubscriptionTierEntity } from "../../interfaces/subscription";
import { Button } from "../../common/components/form";
import { Stripe } from "../stripe/stripeCharge";
import { StripeExistingPayment } from "../stripe/stripeExistingPayment";


export const SubscriptionTierBlock: React.StatelessComponent<ISubscriptionTierEntity> = (props: ISubscriptionTierEntity) => {

    return (

        <div className="col-md-4 container">
            <div className="an-pricing-table-single with-shadow-dark row">
                <div className="price-header">
                    <h3 className="plan-name">{props.tierName}</h3>
                    <h1 className="plan-price"><span>$</span>{props.tierPrice}<small>/ Month</small></h1>
                </div>
                <p>{props.tierDescription}</p>
                <input className="hidden" value={props.createdById} />
                <div className="col-md-offset-1">
                    <Stripe
                        onSubmit={props.onSubmit}
                        amount={null}
                        keyId={props.keyId}
                    />
                </div>
            </div>
        </div>
    );
}


