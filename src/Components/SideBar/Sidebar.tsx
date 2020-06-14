import React from 'react';
import './Sidebar.css';
import InfoBox from './Info-Box/InfoBox';
import Select from 'react-select';
import IconOption, {OptionData} from './IconOption';
import { GlobalStats } from '../../shared/interfaces';

const SideBar: React.FC<GlobalStats> = ({countries, updatedAt, worldwide}) => {
    const options: OptionData[] = countries.map(country => {
        return {
            code: country.countryCode,
            label: country.name,
            value: country.name
        }
    })
    return (
        <div className= "sidebar">
            <div className="info-container">
                <Select 
                isSearchable = {true}
                components = {{Option: IconOption}}
                options = {options}
                />
                <div className="info">
                    <InfoBox label = "Active" color = '#CCA664' value = '1,234,322'/>
                    <InfoBox label = "Recovered" color = '#5CC1AC' value = '164,315'/>
                    <InfoBox label = "Deaths" color = '#BA3131' value = '72,034'/>
                </div>
            </div>
            <div className="statistics"></div>
        </div>
    );
}

export default SideBar;
