import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CountryService {
    constructor(private readonly httpService: HttpService) { }

    async getAvailableCountries() {
        const response = await lastValueFrom(
            this.httpService.get('https://date.nager.at/api/v3/AvailableCountries'),
        );
        return response.data;
    }

    async getCountryInfo(countryCode: string) {
        try {

            const countryResponse = await lastValueFrom(
                this.httpService.get(`https://restcountries.com/v3.1/alpha/${countryCode}`),
            );

            const countryData = countryResponse.data[0];
            const countryName = countryData.name.common;
            const borderCountriesCodes = countryData.borders || [];
            const flagUrl = countryData.flags.svg;

            const populationResponse = await lastValueFrom(
                this.httpService.post(
                    'https://countriesnow.space/api/v0.1/countries/population',
                    { country: countryName },
                ),
            );

            const populationData = populationResponse.data.data.populationCounts;

            let borderCountries = [];

            if (borderCountriesCodes.length > 0) {
                const bordersResponse = await lastValueFrom(
                    this.httpService.get(
                        `https://restcountries.com/v3.1/alpha?codes=${borderCountriesCodes.join(',')}`,
                    ),
                );

                borderCountries = bordersResponse.data.map(
                    (country: { name: { common: string; }, cca2: string }) => ({
                        name: country.name.common,
                        code: country.cca2,
                    }),
                );
            }


            return {
                countryCode,
                countryName,
                borderCountries,
                populationData,
                flagUrl,
            };
        } catch (error) {
            console.error(error);
            throw new NotFoundException('Country not found or API error');
        };
    };
}
