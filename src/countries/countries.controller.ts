import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from '@countries/countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly CountryService: CountryService) {}

  @Get('available')
  async getAvailableCountries() {
    return await this.CountryService.getAvailableCountries();
  }

  @Get('info/:code')
  async getCountryInfo(@Param('code') code: string) {
    return await this.CountryService.getCountryInfo(code);
  }
}
