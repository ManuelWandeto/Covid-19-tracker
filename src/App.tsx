import React, {useState} from 'react';
import WorldMap from './Components/MapComponent/WorldMap';
import useSwr from 'swr';
import {WorldwideStats} from './Api';
import LoadingScreen from './Components/LoadingScreen/LoadingScreen';

export enum Status { success, loading, error };

function App() {
    const [status, setStatus] = useState<Status>(Status.loading);
    const [isDoneLoading, setDoneLoading] = useState<boolean>(false);

    const {data} = useSwr<WorldwideStats, Error>('api/globalStats', (endpoint: string) => {
        return fetch(`https://us-central1-covid-tracker-api-c2a95.cloudfunctions.net/${endpoint}`)
                    .then(response => response.json());
    }, { 
        revalidateOnFocus: false, 
        dedupingInterval: 60000,
        onError: () => {
            setStatus(Status.error);
        },
        onSuccess: () => {
            setTimeout(() => {
                setStatus(Status.success);
                setTimeout(() => {
                    setDoneLoading(true);
                }, 1500)
            }, 1200);
        }
    })

    if(isDoneLoading && data) {
        return <WorldMap countries = {data.countries} worldwide = {data.worldwide}/> 
    } else {
        return <LoadingScreen status = {status}/>
    }
}

export default App;