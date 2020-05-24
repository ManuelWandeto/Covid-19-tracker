export interface IStatData {
    countryName: string,
    countryCode: string,
    latLng: {
        latitude: number,
        longitude: number,
    },
    confirmed: number,
    active: number,
    recovered: number,
    critical: number,
    deaths: number
}

export interface WorldwideStats {
    worldwide: IStatData,
    countries: IStatData[]
}

export async function getWorldWideStats() {
    try {
        const response = await fetch('https://us-central1-covid-tracker-api-c2a95.cloudfunctions.net/api/globalStats');
        const stats = await response.json();
        const worldwideStats: WorldwideStats = {
            worldwide: stats.worldwide,
            countries: stats.countries
        }
        if(worldwideStats) 
            return worldwideStats;
        else 
            throw new Error(`fetch operation yielded non truthy data`);
    } catch (error) {
        console.error(`an error occured: ${error}`)
    }

}
