import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './ProgressBarItem.style';

export class ProgressBarItem extends PureComponent {
    static propTypes = {
        isActive: PropTypes.bool,
        stepId: PropTypes.number.isRequired,
        title: PropTypes.string
    };

    static defaultProps = {
        isActive: false,
        stepId: 0,
        title: ''
    }

    constructor(props){
        super(props);
    }

    renderItemContent = () => {
        const { isActive, stepId } = this.props;
        const content = stepId + 1;

        if(isActive === false) {
            return <div block="ProgressBarItem" elem="Item_content">{ content }</div>
        } else {
            return <div block="ProgressBarItem" elem="CheckMark" />
        }
    }

    renderContent = () => {
        const { isActive, title } = this.props;
        
        return(
            <>
                <div
                    block="ProgressBarItem"
                    elem="Item"
                    mods={ { isActive } }  
                >
                    { this.renderItemContent() }
                </div>
                <div
                    block="ProgressBarItem"
                    elem="Title"
                    mods= { { isActive } }
                >
                    { title }
                </div>
            </>
        );

    }

    render(){
        return(
            <div 
              block="ProgressBarItem"
              elem="Wrapper"
            >
                { this.renderContent() }
            </div>
        );
    }
    
}

export default ProgressBarItem