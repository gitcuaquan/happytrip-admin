export interface City {
  id: string;
  name: string;
  status: string;
}

export interface ResponeDistricts {
    id: string;
    name: string;
    status: boolean;
    districts: City[];
}
