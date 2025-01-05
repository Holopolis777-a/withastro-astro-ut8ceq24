import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SalaryVehicleList from './SalaryVehicleList';
import SalaryVehicleDetails from './details/SalaryVehicleDetails';
import EditSalaryVehicle from './edit/[id]';

export default function SalarySacrificePage() {
  return (
    <Routes>
      <Route index element={<SalaryVehicleList />} />
      <Route path=":id" element={<SalaryVehicleDetails />} />
      <Route path="edit/:id" element={<EditSalaryVehicle />} />
    </Routes>
  );
}