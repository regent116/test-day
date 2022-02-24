import ProgressBarItem from 'Component/ProgressBarItem';
import { PureComponent } from 'react';
import './ProgressBar.style';

export class ProgressBar extends PureComponent {
    constructor(props){
        super(props);
        this.state = { step: 0 };
    }

    componentDidUpdate(prevProps) {
        const { checkoutStep } = this.props;
        const { checkoutStep: prevCheckoutStep } = prevProps;

        if (checkoutStep !== prevCheckoutStep) {
            this.updateStep();
        }
    }

    updateStep(){
        this.setState((prevState) => ({
            step: prevState.step + 1
        })); 
    }

    renderSteps = () => {
        const { steps } = this.props;
        const { step } = this.state;
 
        return(
            steps.map((e, i) => {
                return (
                    <ProgressBarItem 
                      key={i} 
                      step={step}
                      stepId={i}
                      title={e.title}
                    />
                )
            })
        )
    }

    render(){
        return(
            <div block="ProgressBar" elem="Wrapper" >
                {this.renderSteps()}
            </div> 
        )
    }
}

export default ProgressBar