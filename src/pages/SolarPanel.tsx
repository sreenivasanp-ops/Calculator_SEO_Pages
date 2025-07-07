
import Header from '@/components/Header';
import AllCalculatorsCTA from '@/components/AllCalculatorsCTA';
import SolarRelatedCategories from '@/components/SolarRelatedCategories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ChevronDown, Minus, Plus } from 'lucide-react';

const SolarPanel = () => {
  const [buildingType, setBuildingType] = useState('existing');
  const [selectedState, setSelectedState] = useState('');
  const [monthlyBill, setMonthlyBill] = useState('');
  const [consumerCategory, setConsumerCategory] = useState('RESIDENTIAL');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [solarSize, setSolarSize] = useState(0.75);

  // Indian states list
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'
  ];

  // State-wise electricity tariff (₹/kWh)
  const stateTariffs = {
    'Maharashtra': 8.5,
    'Gujarat': 7.2,
    'Karnataka': 6.8,
    'Tamil Nadu': 5.5,
    'Delhi': 9.2,
    'Rajasthan': 7.8,
    'Uttar Pradesh': 6.5,
    'West Bengal': 7.1,
    'Haryana': 8.1,
    'Punjab': 6.9
  };

  const filteredStates = indianStates.filter(state =>
    state.toLowerCase().includes(selectedState.toLowerCase())
  );

  const handleStateInput = (value: string) => {
    setSelectedState(value);
    setShowSuggestions(value.length > 0);
  };

  const selectState = (state: string) => {
    setSelectedState(state);
    setShowSuggestions(false);
  };

  const adjustSolarSize = (increment: boolean) => {
    if (increment) {
      setSolarSize(prev => Math.min(prev + 0.25, 10));
    } else {
      setSolarSize(prev => Math.max(prev - 0.25, 0.25));
    }
  };

  const calculateSolar = () => {
    if (!selectedState || !monthlyBill) return;

    const bill = parseFloat(monthlyBill);
    const tariff = stateTariffs[selectedState] || 7.5; // Default tariff
    
    // Calculate monthly units consumed
    const monthlyUnits = bill / tariff;
    
    // Calculate required solar capacity (assuming 4-5 hours of sunlight)
    const requiredCapacity = (monthlyUnits * 12) / (4.5 * 365); // kW
    setSolarSize(Math.round(requiredCapacity * 4) / 4); // Round to nearest 0.25
    
    setShowResults(true);
  };

  const clearAll = () => {
    setSelectedState('');
    setMonthlyBill('');
    setConsumerCategory('RESIDENTIAL');
    setBuildingType('existing');
    setShowResults(false);
    setSolarSize(0.75);
  };

  // Calculate derived values
  const areaRequired = Math.round(solarSize * 100); // 100 sqft per kW
  const currentBill = parseFloat(monthlyBill) || 1000;
  const billWithSolar = Math.round(currentBill * 0.49); // 51% savings
  const savingsPercent = Math.round(((currentBill - billWithSolar) / currentBill) * 100);
  
  // System cost and financial calculations
  const systemCost = Math.round(solarSize * 50000); // ₹50,000 per kW
  const subsidy = Math.round(systemCost * 0.3); // 30% subsidy
  const netCost = systemCost - subsidy;
  const annualSavings = (currentBill - billWithSolar) * 12;
  const roi = Math.round((annualSavings / netCost) * 100 * 10) / 10; // ROI percentage

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AllCalculatorsCTA />
      
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {/* Main Title */}
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">
          Rooftop Solar Calculator & Cost Guide
        </h1>
        
        {/* Solar Calculator Input Section */}
        <Card className="mb-6 sm:mb-8 border-2 border-orange-200">
          <CardHeader className="bg-orange-50 p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800 flex flex-col sm:flex-row sm:items-center gap-2">
              ☀️ Solar Calculator
              <span className="text-xs sm:text-sm font-normal text-gray-600">
                Calculate Your Solar Requirements & Savings
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            {/* Building Type Selection */}
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="buildingType"
                  value="existing"
                  checked={buildingType === 'existing'}
                  onChange={(e) => setBuildingType(e.target.value)}
                  className="w-4 h-4 text-orange-500"
                />
                <span className="text-sm sm:text-base">Existing Building</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="buildingType"
                  value="new"
                  checked={buildingType === 'new'}
                  onChange={(e) => setBuildingType(e.target.value)}
                  className="w-4 h-4 text-orange-500"
                />
                <span className="text-sm sm:text-base">New Building</span>
              </label>
            </div>

            {/* State Input with Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your State</label>
              <div className="relative">
                <Input
                  type="text"
                  value={selectedState}
                  onChange={(e) => handleStateInput(e.target.value)}
                  placeholder="Enter your state"
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
                  onClick={() => setShowSuggestions(!showSuggestions)}
                >
                  DETECT 📍
                </Button>
              </div>
              
              {showSuggestions && filteredStates.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                  {filteredStates.map((state) => (
                    <div
                      key={state}
                      onClick={() => selectState(state)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {state}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Monthly Bill Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your average monthly electricity bill (₹)
              </label>
              <Input
                type="number"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(e.target.value)}
                placeholder="Enter your monthly bill"
                className="w-full"
              />
            </div>

            {/* Consumer Category Selection */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-4">
                Please Select Your Consumer Category Below:
              </p>
              <div className="flex flex-wrap gap-2">
                {['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL'].map((category) => (
                  <Button
                    key={category}
                    onClick={() => setConsumerCategory(category)}
                    variant={consumerCategory === category ? 'default' : 'outline'}
                    className={`px-4 py-2 text-sm ${
                      consumerCategory === category
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <div className="flex justify-center">
              <Button
                onClick={calculateSolar}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold"
                disabled={!selectedState || !monthlyBill}
              >
                CALCULATE
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {showResults && (
          <>
            {/* Solar System Size */}
            <Card className="mb-6 border-2 border-green-200">
              <CardHeader className="bg-green-50 p-4">
                <CardTitle className="text-center text-lg">Selected Solar System Size</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Button
                      onClick={() => adjustSolarSize(false)}
                      variant="outline"
                      size="icon"
                      className="w-10 h-10 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full border-4 border-gray-200 flex items-center justify-center bg-white">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-orange-500">{solarSize}</div>
                          <div className="text-sm text-gray-600">kW</div>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4 w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                    
                    <Button
                      onClick={() => adjustSolarSize(true)}
                      variant="outline"
                      size="icon"
                      className="w-10 h-10 rounded-full border-2 border-green-500 text-green-500 hover:bg-green-50"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-600 mb-2">Area required <span className="font-semibold">{areaRequired} sqft</span></p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm">With</span>
                      <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-semibold">Net Metering</span>
                      <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-semibold">Yes</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Bill & Savings */}
            <Card className="mb-6 border-2 border-blue-200">
              <CardHeader className="bg-blue-50 p-4">
                <CardTitle className="text-center text-lg">Your Monthly Bill</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-center items-center gap-8">
                  <div className="text-center">
                    <div className="w-16 h-20 bg-gray-800 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-white font-bold">₹</span>
                    </div>
                    <div className="text-lg font-bold">₹ {currentBill}</div>
                    <div className="text-sm text-gray-600">Current Bill</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-20 bg-orange-500 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-white font-bold">₹</span>
                    </div>
                    <div className="text-lg font-bold">₹ {billWithSolar}</div>
                    <div className="text-sm text-gray-600">Bill With Solar</div>
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <h3 className="text-lg font-semibold text-gray-700">Start Saving</h3>
                  <p className="text-2xl font-bold text-orange-500">{savingsPercent}% from Day 1</p>
                </div>
              </CardContent>
            </Card>

            {/* Financial Details */}
            <Card className="mb-6 border-2 border-purple-200">
              <CardHeader className="bg-purple-50 p-4">
                <CardTitle className="text-center text-lg">Financial Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                      💡
                    </div>
                    <div className="text-lg font-bold text-orange-500">₹{systemCost.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">System Cost (₹)</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                      💡
                    </div>
                    <div className="text-lg font-bold text-orange-500">{(annualSavings/100000).toFixed(1)}</div>
                    <div className="text-xs text-gray-600">Lifetime Savings (₹ Lacs)</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                      💡
                    </div>
                    <div className="text-lg font-bold text-orange-500">{roi}%</div>
                    <div className="text-xs text-gray-600">Return On Investment p.a.</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-orange-500 mb-2">
                    Solarize with Our Easy Financing Options
                  </h3>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Net Cost:</strong> ₹{netCost.toLocaleString()} (After 30% Government Subsidy)
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Annual Savings:</strong> ₹{annualSavings.toLocaleString()}
                    </p>
                  </div>
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
        <SolarRelatedCategories />
      </div>
    </div>
  );
};

export default SolarPanel;
