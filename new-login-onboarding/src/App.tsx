import React, { useState } from 'react';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import HowItWorks from './pages/HowItWorks';
import AirportSelection from './pages/AirportSelection';
import HomeAirport from './pages/HomeAirport';
import Preferences from './pages/Preferences';
import Notifications from './pages/Notifications';

export default function App() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Welcome onNext={nextStep} />;
      case 2:
        return <HowItWorks onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <AirportSelection onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <HomeAirport onNext={nextStep} onBack={prevStep} />;
      case 5:
        return <Preferences onNext={nextStep} onBack={prevStep} />;
      case 6:
        return <Notifications onNext={() => window.location.href = '/dashboard'} onBack={prevStep} />;
      default:
        return <Welcome onNext={nextStep} />;
    }
  };

  return (
    <Layout>
      {renderStep()}
    </Layout>
  );
}