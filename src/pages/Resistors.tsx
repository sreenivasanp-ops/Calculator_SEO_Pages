
import Header from '@/components/Header';
import AllCalculatorsCTA from '@/components/AllCalculatorsCTA';
import ResistorRelatedCategories from '@/components/ResistorRelatedCategories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PriceQuoteModal from '@/components/PriceQuoteModal';
import { useState } from 'react';

const Resistors = () => {
  const [bands, setBands] = useState('4');
  const [band1, setBand1] = useState('');
  const [band2, setBand2] = useState('');
  const [band3, setBand3] = useState('');
  const [multiplier, setMultiplier] = useState('');
  const [tolerance, setTolerance] = useState('');
  const [ppm, setPpm] = useState('');
  const [resistorValue, setResistorValue] = useState('');
  const [showResult, setShowResult] = useState(false);

  const colorMap: { [key: string]: { value: number; multiplier: number; tolerance?: number; ppm?: number; color: string } } = {
    'black': { value: 0, multiplier: 1, color: '#000000' },
    'brown': { value: 1, multiplier: 10, tolerance: 1, ppm: 100, color: '#8B4513' },
    'red': { value: 2, multiplier: 100, tolerance: 2, ppm: 50, color: '#FF0000' },
    'orange': { value: 3, multiplier: 1000, ppm: 15, color: '#FFA500' },
    'yellow': { value: 4, multiplier: 10000, ppm: 25, color: '#FFFF00' },
    'green': { value: 5, multiplier: 100000, tolerance: 0.5, color: '#00FF00' },
    'blue': { value: 6, multiplier: 1000000, tolerance: 0.25, color: '#0000FF' },
    'violet': { value: 7, multiplier: 10000000, tolerance: 0.1, color: '#8A2BE2' },
    'grey': { value: 8, multiplier: 100000000, tolerance: 0.05, color: '#808080' },
    'white': { value: 9, multiplier: 1000000000, color: '#FFFFFF' },
    'gold': { value: -1, multiplier: 0.1, tolerance: 5, color: '#FFD700' },
    'silver': { value: -2, multiplier: 0.01, tolerance: 10, color: '#C0C0C0' }
  };

  const digitColors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
  
  const multiplierColors = [
    { key: 'silver', label: 'Silver (0.01 Ω)', value: 0.01 },
    { key: 'gold', label: 'Gold (0.1 Ω)', value: 0.1 },
    { key: 'black', label: 'Black (1 Ω)', value: 1 },
    { key: 'brown', label: 'Brown (10 Ω)', value: 10 },
    { key: 'red', label: 'Red (100 Ω)', value: 100 },
    { key: 'orange', label: 'Orange (1K Ω)', value: 1000 },
    { key: 'yellow', label: 'Yellow (10K Ω)', value: 10000 },
    { key: 'green', label: 'Green (100K Ω)', value: 100000 },
    { key: 'blue', label: 'Blue (1M Ω)', value: 1000000 },
    { key: 'violet', label: 'Violet (10M Ω)', value: 10000000 }
  ];

  const toleranceColors = [
    { key: 'silver', label: 'Silver (± 10%)', value: 10 },
    { key: 'gold', label: 'Gold (± 5%)', value: 5 },
    { key: 'brown', label: 'Brown (± 1%)', value: 1 },
    { key: 'red', label: 'Red (± 2%)', value: 2 },
    { key: 'green', label: 'Green (± 0.5%)', value: 0.5 },
    { key: 'blue', label: 'Blue (± 0.25%)', value: 0.25 },
    { key: 'violet', label: 'Violet (± 0.1%)', value: 0.1 }
  ];

  const ppmColors = [
    { key: 'brown', label: 'Brown (100 ppm)', value: 100 },
    { key: 'red', label: 'Red (50 ppm)', value: 50 },
    { key: 'orange', label: 'Orange (15 ppm)', value: 15 },
    { key: 'yellow', label: 'Yellow (25 ppm)', value: 25 }
  ];

  const calculateResistorValue = () => {
    if (!band1 || !band2 || !multiplier || !tolerance) return;

    let value = 0;
    const band1Value = colorMap[band1]?.value || 0;
    const band2Value = colorMap[band2]?.value || 0;
    const multiplierValue = multiplierColors.find(c => c.key === multiplier)?.value || 1;

    if (bands === '4') {
      // 4-band: digit1, digit2, multiplier, tolerance
      value = (band1Value * 10 + band2Value) * multiplierValue;
    } else if (bands === '5') {
      // 5-band: digit1, digit2, digit3, multiplier, tolerance
      if (!band3) return;
      const band3Value = colorMap[band3]?.value || 0;
      value = (band1Value * 100 + band2Value * 10 + band3Value) * multiplierValue;
    } else if (bands === '6') {
      // 6-band: digit1, digit2, digit3, multiplier, tolerance, ppm
      if (!band3 || !ppm) return;
      const band3Value = colorMap[band3]?.value || 0;
      value = (band1Value * 100 + band2Value * 10 + band3Value) * multiplierValue;
    }

    // Format the value
    let formattedValue = '';
    if (value >= 1000000) {
      formattedValue = `${(value / 1000000).toFixed(2)}M Ω`;
    } else if (value >= 1000) {
      formattedValue = `${(value / 1000).toFixed(2)}K Ω`;
    } else {
      formattedValue = `${value.toFixed(2)} Ω`;
    }

    setResistorValue(formattedValue);
    setShowResult(true);
  };

  const resetCalculator = () => {
    setBand1('');
    setBand2('');
    setBand3('');
    setMultiplier('');
    setTolerance('');
    setPpm('');
    setResistorValue('');
    setShowResult(false);
  };

  const getSelectedColors = () => {
    const colors = [];
    if (band1) colors.push(colorMap[band1]?.color);
    if (band2) colors.push(colorMap[band2]?.color);
    if (bands !== '4' && band3) colors.push(colorMap[band3]?.color);
    if (multiplier) colors.push(colorMap[multiplier]?.color);
    if (tolerance) colors.push(colorMap[tolerance]?.color);
    if (bands === '6' && ppm) colors.push(colorMap[ppm]?.color);
    return colors.filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AllCalculatorsCTA />
      
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {/* Main Title */}
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">
          Resistor Color Code Calculator & Guide
        </h1>
        
        {/* Resistor Calculator Section */}
        <Card className="mb-6 sm:mb-8 border-2 border-blue-200">
          <CardHeader className="bg-blue-50 p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800">
              🔧 Resistor Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Bands
              </label>
              <Select value={bands} onValueChange={(value) => {
                setBands(value);
                setBand1('');
                setBand2('');
                setBand3('');
                setMultiplier('');
                setTolerance('');
                setPpm('');
                setShowResult(false);
              }}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  1st Band
                </label>
                <Select value={band1} onValueChange={setBand1}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Color" />
                  </SelectTrigger>
                  <SelectContent>
                    {digitColors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color.charAt(0).toUpperCase() + color.slice(1)} ({colorMap[color].value})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  2nd Band
                </label>
                <Select value={band2} onValueChange={setBand2}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Color" />
                  </SelectTrigger>
                  <SelectContent>
                    {digitColors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color.charAt(0).toUpperCase() + color.slice(1)} ({colorMap[color].value})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {(bands === '5' || bands === '6') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    3rd Band
                  </label>
                  <Select value={band3} onValueChange={setBand3}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Color" />
                    </SelectTrigger>
                    <SelectContent>
                      {digitColors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color.charAt(0).toUpperCase() + color.slice(1)} ({colorMap[color].value})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Multiplier ({bands === '4' ? '3rd' : bands === '5' ? '4th' : '4th'} Band)
                </label>
                <Select value={multiplier} onValueChange={setMultiplier}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Color" />
                  </SelectTrigger>
                  <SelectContent>
                    {multiplierColors.map((color) => (
                      <SelectItem key={color.key} value={color.key}>
                        {color.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tolerance ({bands === '4' ? '4th' : bands === '5' ? '5th' : '5th'} Band)
                </label>
                <Select value={tolerance} onValueChange={setTolerance}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Color" />
                  </SelectTrigger>
                  <SelectContent>
                    {toleranceColors.map((color) => (
                      <SelectItem key={color.key} value={color.key}>
                        {color.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {bands === '6' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PPM (6th Band)
                  </label>
                  <Select value={ppm} onValueChange={setPpm}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Color" />
                    </SelectTrigger>
                    <SelectContent>
                      {ppmColors.map((color) => (
                        <SelectItem key={color.key} value={color.key}>
                          {color.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={calculateResistorValue}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
                disabled={!band1 || !band2 || !multiplier || !tolerance || (bands === '6' && !ppm) || (bands !== '4' && !band3)}
              >
                Calculate Resistor Value
              </Button>
              <Button
                onClick={resetCalculator}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2"
              >
                Clear All
              </Button>
            </div>

            {/* Output Section - Only show when calculate is clicked */}
            {showResult && resistorValue && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-700 mb-3">Resistor Value:</h3>
                <p className="text-xl font-bold text-gray-800 mb-4">{resistorValue}</p>
                
                {/* Visual Resistor Mockup */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Resistor Visual:</h4>
                  <div className="flex items-center justify-center">
                    {/* Resistor body with color bands */}
                    <div className="relative bg-gray-200 rounded-lg" style={{ width: '200px', height: '40px' }}>
                      {/* Lead wires */}
                      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-4 h-0.5 bg-gray-600"></div>
                      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-4 h-0.5 bg-gray-600"></div>
                      
                      {/* Color bands */}
                      {getSelectedColors().map((color, index) => (
                        <div
                          key={index}
                          className="absolute top-1 bottom-1 rounded"
                          style={{
                            backgroundColor: color,
                            width: '12px',
                            left: `${20 + index * 25}px`,
                            border: color === '#FFFFFF' ? '1px solid #ccc' : 'none'
                          }}
                        />
                      ))}
                      
                      {/* Resistor body pattern */}
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 rounded-lg opacity-50"></div>
                    </div>
                  </div>
                </div>
                
                {/* Get Best Price CTA */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <PriceQuoteModal productType="resistor">
                    <Button className="w-full bg-indiamart-blue hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
                      Get Best Price
                    </Button>
                  </PriceQuoteModal>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Move Related Categories here - between calculator and color code reference */}
        <ResistorRelatedCategories />

        {/* Color Code Reference Section */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800">Resistor Color Code Reference</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Color</th>
                    <th className="border border-gray-300 p-2 text-left">Digit</th>
                    <th className="border border-gray-300 p-2 text-left">Multiplier</th>
                    <th className="border border-gray-300 p-2 text-left">Tolerance</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(colorMap).map(([colorName, data]) => (
                    <tr key={colorName}>
                      <td className="border border-gray-300 p-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 border border-gray-400 rounded"
                            style={{ backgroundColor: data.color }}
                          />
                          {colorName.charAt(0).toUpperCase() + colorName.slice(1)}
                        </div>
                      </td>
                      <td className="border border-gray-300 p-2">
                        {data.value >= 0 ? data.value : '-'}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {data.multiplier >= 1 ? 
                          `×${data.multiplier.toLocaleString()}` : 
                          `×${data.multiplier}`
                        }
                      </td>
                      <td className="border border-gray-300 p-2">
                        {data.tolerance ? `±${data.tolerance}%` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Resistor Buying Guide */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800">Resistor Buying Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6 pt-0">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">Key factors to consider when purchasing resistors</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Resistance Value & Tolerance:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Choose the correct resistance value for your circuit requirements. Tolerance indicates precision - lower tolerance percentages mean higher accuracy. Common tolerances are ±5% (gold), ±10% (silver), and ±1% (brown) for precision applications.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Power Rating & Heat Dissipation:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Select appropriate power rating (1/8W, 1/4W, 1/2W, 1W, etc.) based on expected current flow. Higher power ratings handle more current without overheating. Consider thermal management in high-power applications.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Resistor Type & Construction:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Carbon film resistors are cost-effective for general use. Metal film resistors offer better stability and lower noise. Wire-wound resistors handle high power. Surface-mount (SMD) resistors save space in compact designs.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Temperature Coefficient & Stability:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Temperature coefficient (measured in ppm/°C) indicates how resistance changes with temperature. Lower values provide better stability. Critical for precision circuits and harsh environmental conditions.
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 text-xs sm:text-sm mt-3 sm:mt-4">
                Always verify resistor specifications against circuit requirements. Consider purchasing resistor kits with common values for prototyping and repair work.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Resistors;
