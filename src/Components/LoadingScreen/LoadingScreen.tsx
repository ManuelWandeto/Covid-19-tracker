import React from 'react';
import './LoadingScreen.css';
import Lottie, {Options} from "react-lottie-wrapper";
import CoronaLoader from '../assets/Lotties/covid-defender.json';
import ShieldDone from '../assets/Lotties/shield-done.json';
import ErrorAnimation from '../assets/Lotties/error.json';

import {Status} from '../../App';


const loaderOptions: Options = {
    animationData: CoronaLoader,
    autoplay: true,
    loop: true,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
     }
}
const doneOptions: Options = {
    ...loaderOptions,
    animationData: ShieldDone,
    loop: false,
}
const errorOptions: Options = {
    ...loaderOptions,
    animationData: ErrorAnimation,
}

function LoadingScreen(props: {status: Status}) {
    return (
        <div className = "bg">
            <div className="content">
                {(props.status === Status.loading) ?
                    (
                        <div>
                            <Lottie key='loading' options= {loaderOptions} width= {350} height= {350} />
                            <h1>Fetching Data</h1>
                        </div>
                    )
                    : (props.status === Status.success) ? (
                        <div>
                            <Lottie key= 'doneLoading' options= {doneOptions} width= {350} height= {350} />
                            <h1>Done!</h1>
                        </div>
                    ) : (
                        <div>
                            <Lottie key= 'errorAnimation' options= {errorOptions} width= {350} height= {350} />
                            <h1>An error occured, retrying now...</h1>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default LoadingScreen;