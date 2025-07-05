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

    const getResistorImage = () => {
      switch (numberOfBands) {
        case '4':
          return '/lovable-uploads/492b19a2-9e13-4add-a2f4-4644fa4b3e21.png';
        case '5':
          return '/lovable-uploads/466b0287-ac38-485f-8222-091028a36960.png';
        case '6':
          return '/lovable-uploads/1451d1f6-49fe-4c4a-acbf-34d22bed0b2e.png';
        default:
          return '/lovable-uploads/492b19a2-9e13-4add-a2f4-4644fa4b3e21.png';
      }
    };

    return (
      <div className="flex justify-center relative">
        <div className="relative">
          <img 
            src={getResistorImage()} 
            alt={`${numberOfBands}-band resistor`} 
            className="w-full max-w-md h-auto"
          />
          
          {/* Color band overlays */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-md h-full">
              {numberOfBands === '4' && (
                <>
                  {/* Band 1 */}
                  {band1 && (
                    <div 
                      className="absolute w-2 h-8 top-1/2 transform -translate-y-1/2"
                      style={{ 
                        left: '25%',
                        backgroundColor: getBandColor(band1, 'color'),
                        border: '1px solid rgba(0,0,0,0.3)'
                      }}
                    />
                  )}
                  {/* Band 2 */}
                  {band2 && (
                    <div 
                      className="absolute w-2 h-8 top-1/2 transform -translate-y-1/2"
                      style={{ 
                        left: '35%',
                        backgroundColor: getBandColor(band2, 'color'),
                        border: '1px solid rgba(0,0,0,0.3)'
                      }}
                    />
                  )}
                  {/* Multiplier */}
                  {multiplier && (
                    <div 
                      className="absolute w-2 h-8 top-1/2 transform -translate-y-1/2"
                      style={{ 
                        left: '50%',
                        backgroundColor: getBandColor(multiplier, 'multiplier'),
                        border: '1px solid rgba(0,0,0,0.3)'
                      }}
                    />
                  )}
                  {/* Tolerance */}
                  {tolerance && (
                    <div 
                      className="absolute w-2 h-8 top-1/2 transform -translate-y-1/2"
                      style={{ 
                        left: '70%',
                        backgroundColor: getBandColor(tolerance, 'tolerance'),
                        border: '1px solid rgba(0,0,0,0.3)'
                      }}
                    />
                  )}
                </>
              )}
              
              {numberOfBands === '5' && (
                <>
                  {/* Band 1 */}
                  {band1 && (
                    <div 
                      className="absolute w-2 h-8 top-1/2 transform -translate-y-1/2"
                      style={{ 
                        left: '22%',
                        backgroundColor: getBandColor(band1, 'color'),
                        border: '1px solid rgba(0,0,0,0.3)'
                      }}
                    />
                  )}
                  {/* Band 2 */}
                  {band2 && (
                    <div 
                      className="absolute w-2 h-8 top-1/2 transform -translate-y-1/2"
                      style={{ 
                        left: '30%',
                        backgroundColor: getBandColor(band2, 'color'),
                        border: '1px solid rgba(0,0,0,0.3)'
                      }}
                    />
                  )}
                  {/* Band 3 */}
                  {band3 && (
                    <div 
                      className="absolute w-2 h-8 top-1/2 transform -translate-y-1/2"
                      style={{ 
                        left: '38%',
                        backgroundColor: getBandColor(band3, 'color'),
                        border: '1px solid rgba(0,0,0,0.3)'
                      }}
                    />
                  )}
                  {/* Multiplier */}
                  {multiplier && (
                    <div 
                      className="absolute w-2 h-8 top-1/2 transform -translate-y-1/2"
                      style={{ 
                        left: '50%',
                        backgroundColor: getBandColor(multiplier, 'multiplier'),
                        border: '1px solid rgba(0,0,0,0.3)'
                      }}
                    />
                  )}
                  {/* Tolerance */}
                  {tolerance && (
                    <div 
                      className="absolute w-2 h-8 top-1/2 transform -translate-y-1/2"
                      style={{ 
                        left: '70%',
                        backgroundColor: getBandColor(tolerance, 'tolerance'),
                        border: '1px solid rgba(0,0,0,0.3)'
                      }}
                    />
                  )}
                </>
              )}
              
              {numberOfBands === '6' && (
                <>
                  {/* Band 1 */}
                  {band1 && (
                    <div 
                      className="absolute w-2 h-8 top-1/2 transform -translate-y-1/2"
                      style={{ 
                        left: '20%',
                        backgroundColor: getBandColor(band1, 'color'),
                        border: '1px solid rgba(0,0,0,0.3)'
                      }}
                    />
                  )}
                  {/* Band 2 */}
                  {band2 && (
                    <div 
                      className="absolute w-2 h-8 top-1/2 transform -translate-y-1/2"
                      style={{ 
                        left: '27%',
                        backgroundColor: getBandColor(band2, 'color'),
                        border: '1px solid rgba(0,0,0,0.3)'
                      }}
                    />
                  )}
                  {/* Band 3 */}
                  {band3 && (
                    <div 
                      className="absolute w-2 h-8 top-1/2 transform -translate-y-1/2"
                      style={{ 
                        left: '34%',
                        backgroundColor: getBandColor(band3, 'color'),
                        border: '1px solid rgba(0,0,0,0.3)'
                      }}
                    />
                  )}
                  {/* Multiplier */}
                  {multiplier && (
                    <div 
                      className="absolute w-2 h-8 top-1/2 transform -translate-y-1/2"
                      style={{ 
                        left: '46%',
                        backgroundColor: getBandColor(multiplier, 'multiplier'),
                        border: '1px solid rgba(0,0,0,0.3)'
                      }}
                    />
                  )}
                  {/* Tolerance */}
                  {tolerance && (
                    <div 
                      className="absolute w-2 h-8 top-1/2 transform -translate-y-1/2"
                      style={{ 
                        left: '62%',
                        backgroundColor: getBandColor(tolerance, 'tolerance'),
                        border: '1px solid rgba(0,0,0,0.3)'
                      }}
                    />
                  )}
                  {/* Temperature Coefficient */}
                  {temperatureCoeff && (
                    <div 
                      className="absolute w-2 h-8 top-1/2 transform -translate-y-1/2"
                      style={{ 
                        left: '70%',
                        backgroundColor: getBandColor(temperatureCoeff, 'tempCoeff'),
                        border: '1px solid rgba(0,0,0,0.3)'
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default Resistors;
