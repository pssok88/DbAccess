import * as React from 'react';
import StripeCheckout from 'react-stripe-checkout';


interface IStripeCheckout {
	onSubmit: (token: any, keyId?: number) => void;
    amount: number;
    keyId?: number;
}

export class Stripe extends React.Component<IStripeCheckout> {
    onToken = (token) => {
        fetch('/save-stripe-token', {
            method: 'POST',
            body: JSON.stringify(token),
        }).then(response => {
            this.props.onSubmit(token, this.props.keyId)
            
            });
    }

    // ...

    render() {

        return (
		<StripeCheckout
		amount={this.props.amount}
                token={this.onToken}
                stripeKey="//Proprietary Information - Line Removed"
            />
        )
    }
}
