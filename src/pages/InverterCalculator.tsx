import Header from '@/components/Header';
import AllCalculatorsCTA from '@/components/AllCalculatorsCTA';
import InverterBatteryRelatedCategories from '@/components/InverterBatteryRelatedCategories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const InverterCalculator = () => {
  const [loadWattage, setLoadWattage] = useState('');
  const [backupTime, setBackupTime] = useState('');
  const [inverterType, setInverterType] = useState('normal');
  const [batteryType, setBatteryType] = useState('tubular');
  const [showResults, setShowResults] = useState(false);

  const calculateInverter = () => {
    if (!loadWattage || !backupTime) return;

    const wattage = parseFloat(loadWattage);
    const hours = parseFloat(backupTime);

    // Calculate VA rating (considering power factor of 0.8)
    const vaRating = wattage / 0.8;

    // Calculate battery capacity in Volt-Ampere-Hours (VAH)
    const batteryCapacityVAH = vaRating * hours;

    // Calculate battery voltage (assuming 12V system)
    const batteryVoltage = 12;

    // Calculate battery Ampere-Hours (AH)
    const batteryCapacityAH = batteryCapacityVAH / batteryVoltage;

    // Round values for practical use
    const roundedVaRating = Math.ceil(vaRating / 100) * 100;
    const roundedBatteryAH = Math.ceil(batteryCapacityAH / 20) * 20;

    // Set results
    setInverterVa(roundedVaRating);
    setBatteryAh(roundedBatteryAH);
    setShowResults(true);
  };

  const clearAll = () => {
    setLoadWattage('');
    setBackupTime('');
    setInverterType('normal');
    setBatteryType('tubular');
    setShowResults(false);
    setInverterVa(0);
    setBatteryAh(0);
  };

  const [inverterVa, setInverterVa] = useState(0);
  const [batteryAh, setBatteryAh] = useState(0);

  // Cost Estimation
  const inverterCost = inverterVa * 8; // Assuming ₹8 per VA
  const batteryCost = batteryAh * 250; // Assuming ₹250 per AH
  const totalCost = inverterCost + batteryCost;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AllCalculatorsCTA />
      
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {/* Main Title */}
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">
          Find the Right Inverter & Battery – Power Backup Calculator
        </h1>
        
        {/* Inverter Calculator Section */}
        <Card className="mb-6 sm:mb-8 border-2 border-blue-200">
          <CardHeader className="bg-blue-50 p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800 flex flex-col sm:flex-row sm:items-center gap-2">
              ⚡ Inverter & Battery Calculator
              <span className="text-xs sm:text-sm font-normal text-gray-600">
                Find the Perfect Power Backup Solution
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            {/* Load Wattage Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Load Wattage (Watts)
              </label>
              <Input
                type="number"
                value={loadWattage}
                onChange={(e) => setLoadWattage(e.target.value)}
                placeholder="Enter total load wattage"
                className="w-full"
              />
            </div>

            {/* Backup Time Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Backup Time (Hours)
              </label>
              <Input
                type="number"
                value={backupTime}
                onChange={(e) => setBackupTime(e.target.value)}
                placeholder="Enter required backup time"
                className="w-full"
              />
            </div>

            {/* Inverter Type Selection */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-4">
                Select Inverter Type:
              </p>
              <div className="flex flex-wrap gap-2">
                {['normal', 'pure sine wave'].map((type) => (
                  <Button
                    key={type}
                    onClick={() => setInverterType(type)}
                    variant={inverterType === type ? 'default' : 'outline'}
                    className={`px-4 py-2 text-sm ${
                      inverterType === type
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {type === 'normal' ? 'Normal' : 'Pure Sine Wave'}
                  </Button>
                ))}
              </div>
            </div>

            {/* Battery Type Selection */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-4">
                Select Battery Type:
              </p>
              <div className="flex flex-wrap gap-2">
                {['tubular', 'flat plate', 'lithium-ion'].map((type) => (
                  <Button
                    key={type}
                    onClick={() => setBatteryType(type)}
                    variant={batteryType === type ? 'default' : 'outline'}
                    className={`px-4 py-2 text-sm ${
                      batteryType === type
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {type === 'tubular' ? 'Tubular' : type === 'flat plate' ? 'Flat Plate' : 'Lithium-ion'}
                  </Button>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <div className="flex justify-center">
              <Button
                onClick={calculateInverter}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg font-semibold"
                disabled={!loadWattage || !backupTime}
              >
                CALCULATE
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {showResults && (
          <>
            {/* Inverter Specifications */}
            <Card className="mb-6 border-2 border-green-200">
              <CardHeader className="bg-green-50 p-4">
                <CardTitle className="text-center text-lg">Inverter Specifications</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700">VA Rating:</h3>
                    <p className="text-lg font-bold text-green-500">{inverterVa} VA</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700">Type:</h3>
                    <p className="text-lg font-bold text-green-500">{inverterType === 'normal' ? 'Normal' : 'Pure Sine Wave'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Battery Specifications */}
            <Card className="mb-6 border-2 border-orange-200">
              <CardHeader className="bg-orange-50 p-4">
                <CardTitle className="text-center text-lg">Battery Specifications</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700">Capacity:</h3>
                    <p className="text-lg font-bold text-orange-500">{batteryAh} AH</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700">Type:</h3>
                    <p className="text-lg font-bold text-orange-500">
                      {batteryType === 'tubular' ? 'Tubular' : batteryType === 'flat plate' ? 'Flat Plate' : 'Lithium-ion'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Breakdown */}
            <Card className="mb-6 border-2 border-purple-200">
              <CardHeader className="bg-purple-50 p-4">
                <CardTitle className="text-center text-lg">Cost Breakdown (Estimated)</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700">Inverter Cost:</h3>
                    <p className="text-lg font-bold text-purple-500">₹{inverterCost}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700">Battery Cost:</h3>
                    <p className="text-lg font-bold text-purple-500">₹{batteryCost}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-700">Total Estimated Cost:</h3>
                  <p className="text-2xl font-bold text-purple-500">₹{totalCost}</p>
                </div>
              </CardContent>
            </Card>

            {/* Clear Button */}
            <div className="flex justify-center">
              <Button
                onClick={clearAll}
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 px-6"
              >
                Clear All
              </Button>
            </div>
          </>
        )}

        {/* Explore Related Categories */}
        <InverterBatteryRelatedCategories />

        {/* Inverter Guide Section */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800">Inverter Buying Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6 pt-0">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">What to consider when buying an inverter</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Load Requirement:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Assess the total power consumption (in watts) of all the appliances you intend to run on the inverter. This will help you determine the appropriate VA rating of the inverter.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Backup Time:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Decide how long you need the inverter to provide power during outages. This will influence the battery capacity (in AH) required.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Inverter Type:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Choose between a normal inverter (suitable for basic appliances) and a pure sine wave inverter (recommended for sensitive electronic devices).
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Battery Type:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Select the appropriate battery type based on your budget and requirements. Tubular batteries are long-lasting, while lithium-ion batteries are compact and efficient.
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 text-xs sm:text-sm mt-3 sm:mt-4">
                Selecting the right inverter and battery for your power backup needs requires careful consideration of multiple factors. Consult with experts, evaluate different models, and stay informed about the latest technologies to make an informed decision.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Battery Guide Section */}
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800">Battery Buying Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6 pt-0">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">What to consider when buying a battery</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Capacity (AH):</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    The capacity of a battery is measured in Ampere-Hours (AH). Higher AH ratings provide longer backup times.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Voltage:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Ensure that the battery voltage matches the inverter's voltage requirement (typically 12V or 24V).
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Battery Type:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Choose between tubular, flat plate, and lithium-ion batteries based on your budget and requirements.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Maintenance:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Consider the maintenance requirements of the battery. Tubular and flat plate batteries require regular water top-ups, while lithium-ion batteries are maintenance-free.
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 text-xs sm:text-sm mt-3 sm:mt-4">
                Selecting the right battery for your inverter requires careful consideration of multiple factors. Consult with experts, compare different brands, and read customer reviews to make an informed decision.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InverterCalculator;
