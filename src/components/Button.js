import React from 'react';
import './Button.css';
import CircularProgress from '@material-ui/core/CircularProgress';

const Button = props => {
    const button = document.getElementsByTagName("button");

    //const [text, setText] = useState(props.value);

    if (!props.disabled)    
        button.disabled = true;

    else if (props.loading) {
        button.disabled = true;
    }
    return (<button type="submit" disabled={props.disabled}>{props.loading ? <CircularProgress 
        size={25} 
        style={{'color': 'white'}}
    /> : props.value}</button>)
}

export default Button;