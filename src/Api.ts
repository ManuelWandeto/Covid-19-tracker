export interface IStatData {
    countryName: string,
    countryCode: string,
    latLng: {
        latitude: number,
        longitude: number,
    },
    active: number,
    recovered: number,
    critical: number,
    deaths: number
}

export async function getCountryStats() {
    try {
        const response = await fetch('https://us-central1-covid-tracker-api-c2a95.cloudfunctions.net/api/globalStats');
        const stats = await response.json();

        const countries = stats?.countries;
        if(countries) {
            return countries as IStatData[];
        } else {
            throw new Error('fetch operation yielded non truthy data');
        }
    } catch (error) {
        console.error(`an error occured: ${error}`)
    }

}
