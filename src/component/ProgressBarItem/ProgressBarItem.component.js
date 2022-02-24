import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import './ProgressBarItem.style';

export class ProgressBarItem extends PureComponent {
    constructor(props){
        super(props);
    }

    renderItemContent = () => {
        const { step, stepId } = this.props;
        const isActive = step >= stepId ? true : false;
        const content = stepId + 1;

        if(isActive === false) {
            return <div block="ProgressBarItem" elem="Item_content">{content}</div>
        } else {
            return <div block="ProgressBarItem" elem="CheckMark" />
        }
    }

    renderContent = () => {
        const { step, stepId, title } = this.props;
        const isActive = step >= stepId ? true : false;

        return(
            <>
                <div
                    block="ProgressBarItem"
                    elem="Item"
                    mods={ {isActive} }  
                >
                    {this.renderItemContent()}
                </div>
                <div
                    block="ProgressBarItem"
                    elem="Title"
                    mods= { {isActive} }
                >
                    {title}
                </div>
            </>
        )

    }

    render(){
        return(
            <div 
              block="ProgressBarItem"
              elem="Wrapper"
            >
                {this.renderContent()}
            </div>
        )
    }
    
}

export default ProgressBarItem