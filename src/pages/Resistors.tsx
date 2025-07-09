
import Header from '@/components/Header';
import AllCalculatorsCTA from '@/components/AllCalculatorsCTA';
import ResistorRelatedCategories from '@/components/ResistorRelatedCategories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

const Resistors = () => {
  const [resistance, setResistance] = useState('');
  const [tolerance, setTolerance] = useState('');
  const [bands, setBands] = useState('4');
  const [colorCodes, setColorCodes] = useState<string[]>([]);

  const colorMap: { [key: string]: { value: number; multiplier: number; tolerance?: number; color: string } } = {
    'black': { value: 0, multiplier: 1, color: '#000000' },
    'brown': { value: 1, multiplier: 10, tolerance: 1, color: '#8B4513' },
    'red': { value: 2, multiplier: 100, tolerance: 2, color: '#FF0000' },
    'orange': { value: 3, multiplier: 1000, color: '#FFA500' },
    'yellow': { value: 4, multiplier: 10000, color: '#FFFF00' },
    'green': { value: 5, multiplier: 100000, tolerance: 0.5, color: '#00FF00' },
    'blue': { value: 6, multiplier: 1000000, tolerance: 0.25, color: '#0000FF' },
    'violet': { value: 7, multiplier: 10000000, tolerance: 0.1, color: '#8A2BE2' },
    'grey': { value: 8, multiplier: 100000000, tolerance: 0.05, color: '#808080' },
    'white': { value: 9, multiplier: 1000000000, color: '#FFFFFF' },
    'gold': { value: -1, multiplier: 0.1, tolerance: 5, color: '#FFD700' },
    'silver': { value: -2, multiplier: 0.01, tolerance: 10, color: '#C0C0C0' }
  };

  const calculateResistance = () => {
    if (!resistance || !tolerance) return;

    const resistanceValue = parseFloat(resistance);
    const toleranceValue = parseFloat(tolerance);
    
    // Simple color code calculation for 4-band resistor
    if (bands === '4') {
      const digits = resistanceValue.toString().split('');
      const firstDigit = parseInt(digits[0]);
      const secondDigit = parseInt(digits[1]) || 0;
      const multiplierPower = digits.length - 2;
      
      const colors: string[] = [];
      
      // Find colors for digits
      for (const [colorName, colorData] of Object.entries(colorMap)) {
        if (colorData.value === firstDigit) colors[0] = colorName;
        if (colorData.value === secondDigit) colors[1] = colorName;
        if (Math.log10(colorData.multiplier) === multiplierPower) colors[2] = colorName;
        if (colorData.tolerance === toleranceValue) colors[3] = colorName;
      }
      
      setColorCodes(colors.filter(Boolean));
    }
  };

  const resetCalculator = () => {
    setResistance('');
    setTolerance('');
    setBands('4');
    setColorCodes([]);
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resistance Value (Ohms)
                </label>
                <Input
                  type="number"
                  value={resistance}
                  onChange={(e) => setResistance(e.target.value)}
                  placeholder="Enter resistance value"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tolerance (%)
                </label>
                <Select value={tolerance} onValueChange={setTolerance}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tolerance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">±5% (Gold)</SelectItem>
                    <SelectItem value="10">±10% (Silver)</SelectItem>
                    <SelectItem value="1">±1% (Brown)</SelectItem>
                    <SelectItem value="2">±2% (Red)</SelectItem>
                    <SelectItem value="0.5">±0.5% (Green)</SelectItem>
                    <SelectItem value="0.25">±0.25% (Blue)</SelectItem>
                    <SelectItem value="0.1">±0.1% (Violet)</SelectItem>
                    <SelectItem value="0.05">±0.05% (Grey)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Bands
              </label>
              <Select value={bands} onValueChange={setBands}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4 Band Resistor</SelectItem>
                  <SelectItem value="5">5 Band Resistor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={calculateResistance}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
                disabled={!resistance || !tolerance}
              >
                Calculate Color Code
              </Button>
              <Button
                onClick={resetCalculator}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2"
              >
                Reset
              </Button>
            </div>

            {/* Color Code Result */}
            {colorCodes.length > 0 && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-700 mb-3">Color Code Result:</h3>
                <div className="flex gap-2 mb-3">
                  {colorCodes.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-16 border-2 border-gray-300 rounded"
                      style={{ backgroundColor: colorMap[color]?.color }}
                      title={color.charAt(0).toUpperCase() + color.slice(1)}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  Resistance: {resistance}Ω ±{tolerance}%
                </p>
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
