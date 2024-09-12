export interface CheckIn {
  id: number;
  beerId: number;
  rating: number;
  notes: string;
  date: string;
  userId: string;
}

export interface CheckInDTO {
  id: number;
  beerId: number;
  beerName: string;
  rating: number;
  notes?: string;
  date: string;
  userId: string;
  firstName: string;
  lastName: string;
  beerImageUrl: string;
  brewery: string;
  country: string;
}
