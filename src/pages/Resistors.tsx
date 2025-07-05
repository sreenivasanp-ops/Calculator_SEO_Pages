import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';

const Resistors = () => {
  const [numberOfBands, setNumberOfBands] = useState('4');
  const [band1, setBand1] = useState('');
  const [band2, setBand2] = useState('');
  const [band3, setBand3] = useState('');
  const [multiplier, setMultiplier] = useState('');
  const [tolerance, setTolerance] = useState('');
  const [temperatureCoeff, setTemperatureCoeff] = useState('');
  const [resistorValue, setResistorValue] = useState('');

  const colorValues = {
    'Black': { value: 0, color: '#000000' },
    'Brown': { value: 1, color: '#8B4513' },
    'Red': { value: 2, color: '#FF0000' },
    'Orange': { value: 3, color: '#FFA500' },
    'Yellow': { value: 4, color: '#FFFF00' },
    'Green': { value: 5, color: '#008000' },
    'Blue': { value: 6, color: '#0000FF' },
    'Violet': { value: 7, color: '#8A2BE2' },
    'Grey': { value: 8, color: '#808080' },
    'White': { value: 9, color: '#FFFFFF' }
  };

  const multiplierValues = {
    'Black': { value: 1, label: '× 1', color: '#000000' },
    'Brown': { value: 10, label: '× 10', color: '#8B4513' },
    'Red': { value: 100, label: '× 100', color: '#FF0000' },
    'Orange': { value: 1000, label: '× 1K', color: '#FFA500' },
    'Yellow': { value: 10000, label: '× 10K', color: '#FFFF00' },
    'Green': { value: 100000, label: '× 100K', color: '#008000' },
    'Blue': { value: 1000000, label: '× 1M', color: '#0000FF' },
    'Violet': { value: 10000000, label: '× 10M', color: '#8A2BE2' },
    'Grey': { value: 100000000, label: '× 100M', color: '#808080' },
    'White': { value: 1000000000, label: '× 1G', color: '#FFFFFF' },
    'Gold': { value: 0.1, label: '× 0.1', color: '#FFD700' },
    'Silver': { value: 0.01, label: '× 0.01', color: '#C0C0C0' }
  };

  const toleranceValues = {
    'Brown': { label: '±1% (F)', color: '#8B4513' },
    'Red': { label: '±2% (G)', color: '#FF0000' },
    'Orange': { label: '±0.05% (W)', color: '#FFA500' },
    'Yellow': { label: '±0.02% (P)', color: '#FFFF00' },
    'Green': { label: '±0.5% (D)', color: '#008000' },
    'Blue': { label: '±0.25% (C)', color: '#0000FF' },
    'Violet': { label: '±0.1% (B)', color: '#8A2BE2' },
    'Grey': { label: '±0.01% (L)', color: '#808080' },
    'Gold': { label: '±5% (J)', color: '#FFD700' },
    'Silver': { label: '±10% (K)', color: '#C0C0C0' }
  };

  const temperatureCoeffValues = {
    'Black': { label: '250 ppm/K(U)', color: '#000000' },
    'Brown': { label: '100 ppm/K(S)', color: '#8B4513' },
    'Red': { label: '50 ppm/K (R)', color: '#FF0000' },
    'Orange': { label: '15 ppm/K (P)', color: '#FFA500' },
    'Yellow': { label: '25 ppm/K (Q)', color: '#FFFF00' },
    'Green': { label: '20 ppm/K (Z)', color: '#008000' },
    'Blue': { label: '10 ppm/K (Z)', color: '#0000FF' },
    'Violet': { label: '5 ppm/K (M)', color: '#8A2BE2' },
    'Grey': { label: '1 ppm/K (K)', color: '#808080' }
  };

  const calculateResistor = () => {
    if (!band1 || !band2 || !multiplier || !tolerance) return;

    let baseValue = 0;
    
    if (numberOfBands === '4') {
      baseValue = (colorValues[band1].value * 10 + colorValues[band2].value) * multiplierValues[multiplier].value;
    } else if (numberOfBands === '5') {
      if (!band3) return;
      baseValue = (colorValues[band1].value * 100 + colorValues[band2].value * 10 + colorValues[band3].value) * multiplierValues[multiplier].value;
    } else if (numberOfBands === '6') {
      if (!band3 || !temperatureCoeff) return;
      baseValue = (colorValues[band1].value * 100 + colorValues[band2].value * 10 + colorValues[band3].value) * multiplierValues[multiplier].value;
    }

    // Format the value
    let formattedValue = '';
    if (baseValue >= 1000000) {
      formattedValue = `${(baseValue / 1000000).toFixed(2)} MΩ`;
    } else if (baseValue >= 1000) {
      formattedValue = `${(baseValue / 1000).toFixed(2)} kΩ`;
    } else {
      formattedValue = `${baseValue.toFixed(2)} Ω`;
    }

    const toleranceText = toleranceValues[tolerance];
    const tempCoeffText = numberOfBands === '6' && temperatureCoeff ? temperatureCoeffValues[temperatureCoeff] : '';
    
    setResistorValue(`${formattedValue} ${toleranceText}${tempCoeffText ? ` ${tempCoeffText}` : ''}`);
  };

  const clearAll = () => {
    setBand1('');
    setBand2('');
    setBand3('');
    setMultiplier('');
    setTolerance('');
    setTemperatureCoeff('');
    setResistorValue('');
  };

  const ResistorVisual = () => {
    const getBandColor = (bandValue: string, type: 'color' | 'multiplier' | 'tolerance' | 'tempCoeff') => {
      if (!bandValue) return '#CCCCCC';
      
      switch (type) {
        case 'color':
          return colorValues[bandValue]?.color || '#CCCCCC';
        case 'multiplier':
          return multiplierValues[bandValue]?.color || '#CCCCCC';
        case 'tolerance':
          return toleranceValues[bandValue]?.color || '#CCCCCC';
        case 'tempCoeff':
          return temperatureCoeffValues[bandValue]?.color || '#CCCCCC';
        default:
          return '#CCCCCC';
      }
    };

    return (
      <div className="flex justify-center">
        <svg width="320" height="120" viewBox="0 0 320 120">
          {/* Left wire */}
          <line x1="20" y1="60" x2="70" y2="60" stroke="#C0C0C0" strokeWidth="4"/>
          
          {/* Right wire */}
          <line x1="250" y1="60" x2="300" y2="60" stroke="#C0C0C0" strokeWidth="4"/>
          
          {/* Resistor body - rectangular with rounded ends */}
          <rect x="70" y="40" width="180" height="40" fill="#F5DEB3" stroke="#8B4513" strokeWidth="2" rx="5"/>
          
          {/* Color bands based on number of bands */}
          {numberOfBands === '4' && (
            <>
              {/* Band 1 */}
              <rect x="90" y="38" width="12" height="44" fill={getBandColor(band1, 'color')} stroke="#000" strokeWidth="0.5"/>
              {/* Band 2 */}
              <rect x="115" y="38" width="12" height="44" fill={getBandColor(band2, 'color')} stroke="#000" strokeWidth="0.5"/>
              {/* Multiplier */}
              <rect x="170" y="38" width="12" height="44" fill={getBandColor(multiplier, 'multiplier')} stroke="#000" strokeWidth="0.5"/>
              {/* Tolerance */}
              <rect x="215" y="38" width="12" height="44" fill={getBandColor(tolerance, 'tolerance')} stroke="#000" strokeWidth="0.5"/>
            </>
          )}
          
          {numberOfBands === '5' && (
            <>
              {/* Band 1 */}
              <rect x="85" y="38" width="10" height="44" fill={getBandColor(band1, 'color')} stroke="#000" strokeWidth="0.5"/>
              {/* Band 2 */}
              <rect x="105" y="38" width="10" height="44" fill={getBandColor(band2, 'color')} stroke="#000" strokeWidth="0.5"/>
              {/* Band 3 */}
              <rect x="125" y="38" width="10" height="44" fill={getBandColor(band3, 'color')} stroke="#000" strokeWidth="0.5"/>
              {/* Multiplier */}
              <rect x="170" y="38" width="10" height="44" fill={getBandColor(multiplier, 'multiplier')} stroke="#000" strokeWidth="0.5"/>
              {/* Tolerance */}
              <rect x="215" y="38" width="10" height="44" fill={getBandColor(tolerance, 'tolerance')} stroke="#000" strokeWidth="0.5"/>
            </>
          )}
          
          {numberOfBands === '6' && (
            <>
              {/* Band 1 */}
              <rect x="85" y="38" width="8" height="44" fill={getBandColor(band1, 'color')} stroke="#000" strokeWidth="0.5"/>
              {/* Band 2 */}
              <rect x="100" y="38" width="8" height="44" fill={getBandColor(band2, 'color')} stroke="#000" strokeWidth="0.5"/>
              {/* Band 3 */}
              <rect x="115" y="38" width="8" height="44" fill={getBandColor(band3, 'color')} stroke="#000" strokeWidth="0.5"/>
              {/* Multiplier */}
              <rect x="150" y="38" width="8" height="44" fill={getBandColor(multiplier, 'multiplier')} stroke="#000" strokeWidth="0.5"/>
              {/* Tolerance */}
              <rect x="190" y="38" width="8" height="44" fill={getBandColor(tolerance, 'tolerance')} stroke="#000" strokeWidth="0.5"/>
              {/* Temperature Coefficient */}
              <rect x="210" y="38" width="8" height="44" fill={getBandColor(temperatureCoeff, 'tempCoeff')} stroke="#000" strokeWidth="0.5"/>
            </>
          )}
        </svg>
      </div>
    );
  };

  const colorCodeData = [
    { color: 'Black', colorCode: '#000000', band1: '0', band2: '0', band3: '0', multiplier: '× 1', tolerance: '', tempCoeff: '250 ppm/K(U)' },
    { color: 'Brown', colorCode: '#8B4513', band1: '1', band2: '1', band3: '1', multiplier: '× 10', tolerance: '±1% (F)', tempCoeff: '100 ppm/K(S)' },
    { color: 'Red', colorCode: '#FF0000', band1: '2', band2: '2', band3: '2', multiplier: '× 100', tolerance: '±2% (G)', tempCoeff: '50 ppm/K (R)' },
    { color: 'Orange', colorCode: '#FFA500', band1: '3', band2: '3', band3: '3', multiplier: '× 1K', tolerance: '±0.05%(W)', tempCoeff: '15 ppm/K (P)' },
    { color: 'Yellow', colorCode: '#FFFF00', band1: '4', band2: '4', band3: '4', multiplier: '× 10K', tolerance: '±0.02%(P)', tempCoeff: '25 ppm/K (Q)' },
    { color: 'Green', colorCode: '#008000', band1: '5', band2: '5', band3: '5', multiplier: '× 100K', tolerance: '±0.5% (D)', tempCoeff: '20 ppm/K (Z)' },
    { color: 'Blue', colorCode: '#0000FF', band1: '6', band2: '6', band3: '6', multiplier: '× 1M', tolerance: '±0.25%(C)', tempCoeff: '10 ppm/K (Z)' },
    { color: 'Violet', colorCode: '#8A2BE2', band1: '7', band2: '7', band3: '7', multiplier: '× 10M', tolerance: '±0.1% (B)', tempCoeff: '5 ppm/K (M)' },
    { color: 'Grey', colorCode: '#808080', band1: '8', band2: '8', band3: '8', multiplier: '× 100M', tolerance: '±0.01% (L)', tempCoeff: '1 ppm/K (K)' },
    { color: 'White', colorCode: '#FFFFFF', band1: '9', band2: '9', band3: '9', multiplier: '× 1G', tolerance: '', tempCoeff: '' },
    { color: 'Gold', colorCode: '#FFD700', band1: '', band2: '', band3: '', multiplier: '× 0.1', tolerance: '±5% (J)', tempCoeff: '' },
    { color: 'Silver', colorCode: '#C0C0C0', band1: '', band2: '', band3: '', multiplier: '× 0.01', tolerance: '±10% (K)', tempCoeff: '' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">
          Find Your Resistor – Color Code to Value
        </h1>
        
        {/* Resistor Calculator Section */}
        <Card className="mb-6 sm:mb-8 border-2 border-teal-200">
          <CardHeader className="bg-teal-50 p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800 flex flex-col sm:flex-row sm:items-center gap-2">
              🔧 Resistor Color Code Calculator
              <span className="text-xs sm:text-sm font-normal text-gray-600">
                Calculate Resistor Value from Color Bands
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Bands</label>
                  <Select value={numberOfBands} onValueChange={setNumberOfBands}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of bands" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">1st Band</label>
                  <Select value={band1} onValueChange={setBand1}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(colorValues).map(color => (
                        <SelectItem key={color} value={color}>{color} ({colorValues[color].value})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">2nd Band</label>
                  <Select value={band2} onValueChange={setBand2}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(colorValues).map(color => (
                        <SelectItem key={color} value={color}>{color} ({colorValues[color].value})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {numberOfBands !== '4' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">3rd Band</label>
                    <Select value={band3} onValueChange={setBand3}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(colorValues).map(color => (
                          <SelectItem key={color} value={color}>{color} ({colorValues[color].value})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Multiplier ({numberOfBands === '4' ? '3rd' : '4th'} Band)</label>
                  <Select value={multiplier} onValueChange={setMultiplier}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select multiplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(multiplierValues).map(color => (
                        <SelectItem key={color} value={color}>{color} ({multiplierValues[color].label})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tolerance ({numberOfBands === '4' ? '4th' : numberOfBands === '5' ? '5th' : '5th'} Band)</label>
                  <Select value={tolerance} onValueChange={setTolerance}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tolerance" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(toleranceValues).map(color => (
                        <SelectItem key={color} value={color}>{color} ({toleranceValues[color].label})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {numberOfBands === '6' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Temperature Coefficient (6th Band)</label>
                    <Select value={temperatureCoeff} onValueChange={setTemperatureCoeff}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select temperature coefficient" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(temperatureCoeffValues).map(color => (
                          <SelectItem key={color} value={color}>{color} ({temperatureCoeffValues[color].label})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex justify-center gap-4 pt-4">
                  <Button 
                    onClick={calculateResistor}
                    className="bg-teal-500 hover:bg-teal-600 text-white px-6"
                  >
                    Calculate
                  </Button>
                  <Button 
                    onClick={clearAll}
                    variant="outline" 
                    className="border-orange-500 text-orange-500 hover:bg-orange-50 px-6"
                  >
                    Clear All
                  </Button>
                </div>
              </div>

              {/* Output Section */}
              <div className="space-y-4">
                {resistorValue && (
                  <Card className="border-2 border-gray-200">
                    <CardHeader className="pb-1">
                      <CardTitle className="text-lg text-center">Resistor Value</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center pt-0 pb-1" style={{ height: '60%' }}>
                      <div className="p-1 bg-blue-50 rounded-lg">
                        <p className="text-xl font-bold text-blue-600">{resistorValue}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Resistor Visual Mockup */}
                {(band1 && band2 && multiplier && tolerance) && (
                  <Card className="border-2 border-gray-200">
                    <CardHeader className="pb-1">
                      <CardTitle className="text-lg text-center">Resistor Visual</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-2">
                      <ResistorVisual />
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Code Reference Section */}
        <Card className="mb-6 sm:mb-8 border-2 border-blue-200">
          <CardHeader className="bg-blue-50 p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800 flex flex-col sm:flex-row sm:items-center gap-2">
              📊 Colour Code Reference
              <span className="text-xs sm:text-sm font-normal text-gray-600">
                Complete Resistor Color Code Chart
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center font-semibold">Color</TableHead>
                    <TableHead className="text-center font-semibold">
                      1st<br />
                      2nd<br />
                      3rd<br />
                      Band
                    </TableHead>
                    <TableHead className="text-center font-semibold">Multiplier</TableHead>
                    <TableHead className="text-center font-semibold">Tolerance</TableHead>
                    <TableHead className="text-center font-semibold">
                      Temperature<br />
                      Coefficient
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {colorCodeData.map((row) => (
                    <TableRow key={row.color}>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div 
                            className="w-6 h-6 border border-gray-400 rounded"
                            style={{ backgroundColor: row.colorCode }}
                          ></div>
                          <span className="font-medium">{row.color}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-mono">
                        {row.band1 || row.band2 || row.band3 ? `${row.band1 || '-'}` : '-'}
                      </TableCell>
                      <TableCell className="text-center font-mono text-sm">
                        {row.multiplier}
                      </TableCell>
                      <TableCell className="text-center font-mono text-sm">
                        {row.tolerance || '-'}
                      </TableCell>
                      <TableCell className="text-center font-mono text-sm">
                        {row.tempCoeff || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Resistors;
