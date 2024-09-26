import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountryService } from './countries.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CountriesController],
  providers: [CountryService],
})
export class CountriesModule {}
