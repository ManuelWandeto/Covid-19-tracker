declare module 'react-country-flag' {
    import React, {CSSProperties} from 'react';

    interface ICountryFlagProps {
        className?: string,
        countryCode: string,
        svg: boolean,
        style?: CSSProperties,
        'aria-label'?: string
    }
    function ReactCountryFlag(props: ICountryFlagProps): JSX.Element;
    export default ReactCountryFlag;
}