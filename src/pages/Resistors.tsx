
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    'Black': { value: 1, label: '× 1' },
    'Brown': { value: 10, label: '× 10' },
    'Red': { value: 100, label: '× 100' },
    'Orange': { value: 1000, label: '× 1K' },
    'Yellow': { value: 10000, label: '× 10K' },
    'Green': { value: 100000, label: '× 100K' },
    'Blue': { value: 1000000, label: '× 1M' },
    'Violet': { value: 10000000, label: '× 10M' },
    'Grey': { value: 100000000, label: '× 100M' },
    'White': { value: 1000000000, label: '× 1G' },
    'Gold': { value: 0.1, label: '× 0.1' },
    'Silver': { value: 0.01, label: '× 0.01' }
  };

  const toleranceValues = {
    'Brown': '±1% (F)',
    'Red': '±2% (G)',
    'Orange': '±0.05% (W)',
    'Yellow': '±0.02% (P)',
    'Green': '±0.5% (D)',
    'Blue': '±0.25% (C)',
    'Violet': '±0.1% (B)',
    'Grey': '±0.01% (L)',
    'Gold': '±5% (J)',
    'Silver': '±10% (K)'
  };

  const temperatureCoeffValues = {
    'Black': '250 ppm/K(U)',
    'Brown': '100 ppm/K(S)',
    'Red': '50 ppm/K (R)',
    'Orange': '15 ppm/K (P)',
    'Yellow': '25 ppm/K (Q)',
    'Green': '20 ppm/K (Z)',
    'Blue': '10 ppm/K (Z)',
    'Violet': '5 ppm/K (M)',
    'Grey': '1 ppm/K (K)'
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

  const renderResistorVisual = () => {
    const getBandColor = (colorName) => {
      if (colorName === 'Gold') return '#FFD700';
      if (colorName === 'Silver') return '#C0C0C0';
      return colorValues[colorName]?.color || '#FFFFFF';
    };

    const bands = [];
    if (band1) bands.push(getBandColor(band1));
    if (band2) bands.push(getBandColor(band2));
    if (numberOfBands !== '4' && band3) bands.push(getBandColor(band3));
    if (multiplier) bands.push(getBandColor(multiplier));
    if (tolerance) bands.push(getBandColor(tolerance));
    if (numberOfBands === '6' && temperatureCoeff) bands.push(getBandColor(temperatureCoeff));

    return (
      <div className="flex justify-center mt-1 mb-1">
        <svg width="300" height="60" viewBox="0 0 300 60">
          {/* Wire leads */}
          <line x1="0" y1="30" x2="40" y2="30" stroke="#C0C0C0" strokeWidth="2"/>
          <line x1="260" y1="30" x2="300" y2="30" stroke="#C0C0C0" strokeWidth="2"/>
          
          {/* Resistor body - cylindrical shape */}
          <ellipse cx="150" cy="30" rx="110" ry="12" fill="#E6D3A3" stroke="#B8860B" strokeWidth="1"/>
          
          {/* Color bands */}
          {bands.map((color, index) => {
            let x = 70 + (index * 20);
            if (numberOfBands === '4' && index === 3) x = 210; // Tolerance band spacing for 4-band
            if (numberOfBands === '5' && index === 4) x = 210; // Tolerance band spacing for 5-band
            if (numberOfBands === '6' && index === 4) x = 200; // Tolerance band spacing for 6-band
            if (numberOfBands === '6' && index === 5) x = 220; // Temperature coefficient spacing for 6-band
            
            return (
              <rect
                key={index}
                x={x}
                y="20"
                width="8"
                height="20"
                fill={color}
                stroke={color === '#FFFFFF' ? '#000' : 'none'}
                strokeWidth={color === '#FFFFFF' ? '1' : '0'}
              />
            );
          })}
        </svg>
      </div>
    );
  };

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
                        <SelectItem key={color} value={color}>{color} ({toleranceValues[color]})</SelectItem>
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
                          <SelectItem key={color} value={color}>{color} ({temperatureCoeffValues[color]})</SelectItem>
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
                    <CardContent className="text-center pt-0 pb-2">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <p className="text-xl font-bold text-blue-600">{resistorValue}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Resistor Visual */}
                {(band1 && band2 && multiplier && tolerance) && (
                  <Card className="border-2 border-gray-200">
                    <CardHeader className="pb-1">
                      <CardTitle className="text-lg text-center">Resistor Visual</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 pb-2">
                      {renderResistorVisual()}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Code Reference Chart */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800">Color Code Reference</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/de89c643-07c5-4d4f-9071-c6aaeb69834b.png" 
                alt="Resistor Color Code Reference Chart" 
                className="max-w-full h-auto"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Resistors;
