export type PoolVehicleRequestStatus = 'pending' | 'approved' | 'rejected';

export interface PoolVehicleRequest {
  id: string;
  userId: string;
  vehicleId: string;
  vehicle: {
    make: string;
    model: string;
    type: string;
    image: string;
  };
  startDate: Date;
  endDate: Date;
  status: PoolVehicleRequestStatus;
  requestDate: Date;
  bookingReference: string;
}

export interface PoolVehicleRequestFilters {
  status?: PoolVehicleRequestStatus;
  dateFrom?: Date;
  dateTo?: Date;
}