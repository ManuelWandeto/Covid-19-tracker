import React from 'react';
import {components, OptionProps} from 'react-select';
import CountryFlag from 'react-country-flag';

export interface OptionData {
    code: string;
    label: string;
    value: string;
}

interface IconOptionProps extends OptionProps<any> {
    data: OptionData
}

const IconOption: React.FC<IconOptionProps> = (props) => {
    const {Option} = components;
    return (
        <Option {...props}>
            <CountryFlag 
            svg = {true}
            style = {{minWidth: 25, marginRight: 10}}
            countryCode = {props.data.code}
            />
            {props.data.label}
        </Option>
    )
}

export default IconOption