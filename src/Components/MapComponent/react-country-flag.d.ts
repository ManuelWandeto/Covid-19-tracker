declare module 'react-country-flag' {
    import React from 'react';

    interface ICountryFlagProps {
        className: string,
        countryCode: string,
        svg: boolean,
        'aria-label'?: string
    }
    function ReactCountryFlag(props: ICountryFlagProps): JSX.Element;
    export default ReactCountryFlag;
}