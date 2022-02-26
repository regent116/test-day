import PropTypes from 'prop-types';
import ProgressBarItem from 'Component/ProgressBarItem';
import { PureComponent } from 'react';
import './ProgressBar.style';

export class ProgressBar extends PureComponent {
    static propTypes = {
        parentStep: PropTypes.string.isRequired,
        steps: PropTypes.arrayOf(PropTypes.shape(
            { title: PropTypes.string }
        )).isRequired
    };

    static defaultProps = {
        parentStep: 'FIRST_STEP',
        steps: { title: '' }
    };

    constructor(props){
        super(props);
        this.state = { currentStep: 0 };
        this.prevSteps = [];
    }

    componentDidUpdate(prevProps) {
        const { parentStep } = this.props;
        const { parentStep: prevParentStep } = prevProps;
        const { currentStep } = this.state;

        if (parentStep !== prevParentStep && this.isPreviousStep(parentStep) === false) {
            this.prevSteps.push({name: prevParentStep, id: currentStep});
            this.incrementStep();
            return;
        }

        if(parentStep !== prevParentStep && Number.isInteger(this.isPreviousStep(parentStep))) {
            this.goToStep(this.isPreviousStep(parentStep));
        }
    }

    componentWillUnmount(){
        this.prevSteps = [];
    }

    isPreviousStep = (step) => {
        let result = false;

        if(!this.prevSteps.length) return result;

        this.prevSteps.map((prevStep) => {
            if(prevStep.name === step) return result = prevStep.id;
        });
        
        return result;
    }

    incrementStep(){
        this.setState((prevState) => ({
            currentStep: prevState.currentStep + 1
        })); 
    }

    goToStep(id){
        this.setState( {currentStep : id});
    }

    renderSteps = () => {
        const { steps } = this.props;
        const { currentStep } = this.state;
        
        return(
            steps.map((e, i) => {
                const isActive = currentStep >= i ? true : false;
                
                return (
                    <>
                        { i !== 0 ? <div block="ProgressBar" elem="StepBar" mods={ { isActive } } />  : ''}
                        <ProgressBarItem
                            isActive={isActive}
                            stepId={i}
                            title={e.title}
                        />
                    </>
                );
            })
        )
        
    }

    renderProgressBar = () => {
        const { steps } = this.props;
        const { currentStep } = this.state; 
        const stepLength = steps.length;
        const isLastStep = currentStep === stepLength ? true : false;

        return(
            <>
                <div block="ProgressBar" elem="Left">
                    <div
                      block="ProgressBar"
                      elem="StepBar"
                      mods={ { isActiveNoAnimation : true } }
                      style={ { width: '100%'}}
                    />
                </div>
                    <div block="ProgressBar" elem="Wrapper">
                        { this.renderSteps() }
                    </div>
                <div block="ProgressBar" elem="Right">
                    <div block="ProgressBar"
                      elem="StepBar"
                      mods={ { isActive : isLastStep } }
                      style={ { width: '100%' } }
                    />
                </div>
            </>
        );
    }

    render(){
        return(
            <div block="ProgressBar" elem="Container" >
                { this.renderProgressBar() }
            </div> 
        )
    }
}

export default ProgressBar