import {
    Checkout as SourceCheckout,
} from 'SourceRoute/Checkout/Checkout.component';

import ContentWrapper from 'Component/ContentWrapper';
import ProgressBar from 'Component/ProgressBar';
import './Checkout.style';

export class Checkout extends SourceCheckout {
    progressBarSteps = [{title: 'shipping'}, {title: 'review & payments'}];

    render() {
        const { checkoutStep } = this.props;
        return (
            <main block="Checkout">
                <ProgressBar
                  parentStep={ checkoutStep }
                  steps={ this.progressBarSteps }
                />
                <ContentWrapper
                  wrapperMix={ { block: 'Checkout', elem: 'Wrapper' } }
                  label={ __('Checkout page') }
                >
                    { this.renderSummary(true) }
                    <div block="Checkout" elem="Step">
                        { this.renderTitle() }
                        { this.renderGuestForm() }
                        { this.renderStep() }
                        { this.renderLoader() }
                    </div>
                    <div>
                        { this.renderSummary() }
                        { this.renderPromo() }
                        { this.renderCoupon() }
                    </div>
                </ContentWrapper>
            </main>
        );
    }
};

export default Checkout;
