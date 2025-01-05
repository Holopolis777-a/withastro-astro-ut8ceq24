import React from 'react';
import { AllInclusiveServices } from './components/AllInclusiveServices';
import { OtherBenefits } from './components/OtherBenefits';
import { CallToAction } from './components/CallToAction';

export default function Benefits() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AllInclusiveServices />
      <OtherBenefits />
      <CallToAction />
    </div>
  );
}