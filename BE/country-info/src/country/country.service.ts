import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CountryService {
  constructor(private readonly httpService: HttpService) {}

  async getAvailableCountries() {
    const url = 'https://date.nager.at/api/v3/AvailableCountries';
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getCountryInfo(countryCode: string) {
    const borderCountriesUrl = `https://date.nager.at/api/v3/CountryInfo/${countryCode}`;
    const populationUrl =
      'https://countriesnow.space/api/v0.1/countries/population';
    const flagUrl = 'https://countriesnow.space/api/v0.1/countries/flag/images';

    const [borderCountriesResponse, populationResponse, flagResponse] =
      await Promise.all([
        firstValueFrom(this.httpService.get(borderCountriesUrl)),
        firstValueFrom(this.httpService.get(populationUrl)),
        firstValueFrom(this.httpService.get(flagUrl)),
      ]);

    return {
      borderCountries: borderCountriesResponse.data,
      populationData: populationResponse.data,
      flagUrl: flagResponse.data,
    };
  }
}
