import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VehicleList from './VehicleList';
import VehicleDetails from './details/VehicleDetails';
import EditVehicle from './edit/[id]';
import CustomerBenefits from './CustomerBenefits';
import PoolVehicleList from './pool/PoolVehicleList';
import PoolVehicleDetails from './pool/PoolVehicleDetails';
import EditPoolVehicle from './pool/EditPoolVehicle';

export default function VehiclesPage() {
  return (
    <Routes>
      <Route index element={<VehicleList />} />
      <Route path=":id" element={<VehicleDetails />} />
      <Route path="edit/:id" element={<EditVehicle />} />
      <Route path="customer-benefits" element={<CustomerBenefits />} />
      <Route path="pool" element={<PoolVehicleList />} />
      <Route path="pool/:id" element={<PoolVehicleDetails />} />
      <Route path="pool/edit/:id" element={<EditPoolVehicle />} />
    </Routes>
  );
}