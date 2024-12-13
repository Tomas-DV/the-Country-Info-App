interface RootObject {
  borderCountries: BorderCountries;
  populationData: PopulationData;
  flagUrl: FlagUrl;
}
interface FlagUrl {
  error: boolean;
  msg: string;
  data: Datum2[];
}
interface Datum2 {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}
interface PopulationData {
  error: boolean;
  msg: string;
  data: Datum[];
}
interface Datum {
  country: string;
  code: string;
  iso3: string;
  populationCounts: PopulationCount[];
}
interface PopulationCount {
  year: number;
  value: number;
}
interface BorderCountries {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: Border[];
}
interface Border {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders?: any;
}
