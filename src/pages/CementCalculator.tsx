
import Header from '@/components/Header';
import AllCalculatorsCTA from '@/components/AllCalculatorsCTA';
import CementRelatedCategories from '@/components/CementRelatedCategories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const CementCalculator = () => {
  // Brick Wall Calculator States
  const [brickLength, setBrickLength] = useState('');
  const [brickHeight, setBrickHeight] = useState('');
  const [wallLength, setWallLength] = useState('');
  const [wallHeight, setWallHeight] = useState('');
  const [wallThickness, setWallThickness] = useState('');
  const [brickResults, setBrickResults] = useState({ cement: '', sand: '', bricks: '', cost: '' });

  // Plaster Calculator States
  const [plasterArea, setPlasterArea] = useState('');
  const [plasterThickness, setPlasterThickness] = useState('');
  const [plasterRatio, setPlasterRatio] = useState('1:4');
  const [plasterResults, setPlasterResults] = useState({ cement: '', sand: '', cost: '' });

  // Concrete Calculator States
  const [concreteVolume, setConcreteVolume] = useState('');
  const [concreteGrade, setConcreteGrade] = useState('M20');
  const [concreteResults, setConcreteResults] = useState({ cement: '', sand: '', aggregate: '', cost: '' });

  const calculateBrickWall = () => {
    if (!brickLength || !brickHeight || !wallLength || !wallHeight || !wallThickness) return;

    const bL = parseFloat(brickLength) / 1000; // Convert mm to m
    const bH = parseFloat(brickHeight) / 1000;
    const wL = parseFloat(wallLength);
    const wH = parseFloat(wallHeight);
    const wT = parseFloat(wallThickness) / 1000;

    const wallVolume = wL * wH * wT;
    const brickVolume = bL * bH * wT;
    const mortarVolume = wallVolume * 0.3; // 30% mortar

    const numberOfBricks = Math.ceil(wallVolume / brickVolume);
    const cementBags = Math.ceil((mortarVolume * 7) / 0.035); // 1:7 ratio
    const sandCuFt = mortarVolume * 35.315;
    const totalCost = (cementBags * 300) + (numberOfBricks * 8) + (sandCuFt * 60);

    setBrickResults({
      cement: cementBags.toString(),
      sand: sandCuFt.toFixed(2),
      bricks: numberOfBricks.toString(),
      cost: totalCost.toFixed(2)
    });
  };

  const calculatePlaster = () => {
    if (!plasterArea || !plasterThickness) return;

    const area = parseFloat(plasterArea);
    const thickness = parseFloat(plasterThickness) / 1000; // Convert mm to m
    const volume = area * thickness;

    const ratio = plasterRatio === '1:3' ? 3 : plasterRatio === '1:4' ? 4 : 6;
    const cementBags = Math.ceil((volume * ratio) / 0.035);
    const sandCuFt = volume * 35.315;
    const totalCost = (cementBags * 300) + (sandCuFt * 60);

    setPlasterResults({
      cement: cementBags.toString(),
      sand: sandCuFt.toFixed(2),
      cost: totalCost.toFixed(2)
    });
  };

  const calculateConcrete = () => {
    if (!concreteVolume) return;

    const volume = parseFloat(concreteVolume);
    let cementRatio, sandRatio, aggregateRatio;

    switch (concreteGrade) {
      case 'M15':
        cementRatio = 5.4; sandRatio = 0.4; aggregateRatio = 0.8;
        break;
      case 'M20':
        cementRatio = 7; sandRatio = 0.42; aggregateRatio = 0.84;
        break;
      case 'M25':
        cementRatio = 8.5; sandRatio = 0.44; aggregateRatio = 0.88;
        break;
      default:
        cementRatio = 7; sandRatio = 0.42; aggregateRatio = 0.84;
    }

    const cementBags = Math.ceil(volume * cementRatio);
    const sandCuFt = (volume * sandRatio * 35.315);
    const aggregateCuFt = (volume * aggregateRatio * 35.315);
    const totalCost = (cementBags * 300) + (sandCuFt * 60) + (aggregateCuFt * 80);

    setConcreteResults({
      cement: cementBags.toString(),
      sand: sandCuFt.toFixed(2),
      aggregate: aggregateCuFt.toFixed(2),
      cost: totalCost.toFixed(2)
    });
  };

  const clearBrickWall = () => {
    setBrickLength(''); setBrickHeight(''); setWallLength(''); setWallHeight(''); setWallThickness('');
    setBrickResults({ cement: '', sand: '', bricks: '', cost: '' });
  };

  const clearPlaster = () => {
    setPlasterArea(''); setPlasterThickness(''); setPlasterRatio('1:4');
    setPlasterResults({ cement: '', sand: '', cost: '' });
  };

  const clearConcrete = () => {
    setConcreteVolume(''); setConcreteGrade('M20');
    setConcreteResults({ cement: '', sand: '', aggregate: '', cost: '' });
  };

  const cementGuide = [
    { title: 'OPC (Ordinary Portland Cement)', description: 'Most common type, suitable for general construction.' },
    { title: 'PPC (Pozzolana Portland Cement)', description: 'Eco-friendly, good for mass concrete works.' },
    { title: 'Rapid Hardening Cement', description: 'For quick setting, used in road repairs.' },
    { title: 'Low Heat Cement', description: 'Generates less heat, ideal for large dams.' },
    { title: 'Sulphate Resisting Cement', description: 'Resists sulphate attack, used in marine structures.' }
  ];

  const applications = [
    { title: 'Residential Buildings', description: 'For foundations, walls, and roofs.' },
    { title: 'Commercial Complexes', description: 'For high-rise buildings and infrastructure.' },
    { title: 'Road Construction', description: 'For pavements and bridges.' },
    { title: 'Water Retaining Structures', description: 'For dams, reservoirs, and canals.' },
    { title: 'Marine Construction', description: 'For ports, harbors, and coastal structures.' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AllCalculatorsCTA />
      
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {/* Main Title */}
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">
          Calculate Cement for Your Project – Bags and Cost Estimator
        </h1>
        
        {/* Brick Wall Calculator */}
        <Card className="mb-6 sm:mb-8 border-2 border-red-200">
          <CardHeader className="bg-red-50 p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800 flex flex-col sm:flex-row sm:items-center gap-2">
              🧱 Brick Wall Calculator
              <span className="text-xs sm:text-sm font-normal text-gray-600">
                Calculate Cement, Sand & Bricks for Wall Construction
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brick Length (mm)</label>
                <Input value={brickLength} onChange={(e) => setBrickLength(e.target.value)} placeholder="230" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brick Height (mm)</label>
                <Input value={brickHeight} onChange={(e) => setBrickHeight(e.target.value)} placeholder="75" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Wall Length (m)</label>
                <Input value={wallLength} onChange={(e) => setWallLength(e.target.value)} placeholder="10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Wall Height (m)</label>
                <Input value={wallHeight} onChange={(e) => setWallHeight(e.target.value)} placeholder="3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Wall Thickness (mm)</label>
                <Input value={wallThickness} onChange={(e) => setWallThickness(e.target.value)} placeholder="230" />
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={calculateBrickWall} className="bg-red-500 hover:bg-red-600 text-white px-8 py-3">
                CALCULATE BRICK WALL
              </Button>
            </div>

            {brickResults.cement && (
              <div className="mt-6 p-4 bg-gray-100 rounded-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Brick Wall Results</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div><span className="font-medium">Cement:</span> {brickResults.cement} bags</div>
                  <div><span className="font-medium">Sand:</span> {brickResults.sand} cu.ft</div>
                  <div><span className="font-medium">Bricks:</span> {brickResults.bricks} nos</div>
                  <div><span className="font-medium">Total Cost:</span> ₹{brickResults.cost}</div>
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <Button onClick={clearBrickWall} variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                Clear Brick Wall
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Plaster Calculator */}
        <Card className="mb-6 sm:mb-8 border-2 border-green-200">
          <CardHeader className="bg-green-50 p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800 flex flex-col sm:flex-row sm:items-center gap-2">
              🏗️ Plaster Calculator
              <span className="text-xs sm:text-sm font-normal text-gray-600">
                Calculate Cement & Sand for Plastering
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plaster Area (sq.m)</label>
                <Input value={plasterArea} onChange={(e) => setPlasterArea(e.target.value)} placeholder="100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thickness (mm)</label>
                <Input value={plasterThickness} onChange={(e) => setPlasterThickness(e.target.value)} placeholder="12" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cement:Sand Ratio</label>
                <select value={plasterRatio} onChange={(e) => setPlasterRatio(e.target.value)} className="w-full border border-gray-300 rounded-md p-2">
                  <option value="1:3">1:3</option>
                  <option value="1:4">1:4</option>
                  <option value="1:6">1:6</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={calculatePlaster} className="bg-green-500 hover:bg-green-600 text-white px-8 py-3">
                CALCULATE PLASTER
              </Button>
            </div>

            {plasterResults.cement && (
              <div className="mt-6 p-4 bg-gray-100 rounded-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Plaster Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div><span className="font-medium">Cement:</span> {plasterResults.cement} bags</div>
                  <div><span className="font-medium">Sand:</span> {plasterResults.sand} cu.ft</div>
                  <div><span className="font-medium">Total Cost:</span> ₹{plasterResults.cost}</div>
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <Button onClick={clearPlaster} variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                Clear Plaster
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Concrete Calculator */}
        <Card className="mb-6 sm:mb-8 border-2 border-blue-200">
          <CardHeader className="bg-blue-50 p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800 flex flex-col sm:flex-row sm:items-center gap-2">
              🏢 Concrete Calculator
              <span className="text-xs sm:text-sm font-normal text-gray-600">
                Calculate Cement, Sand & Aggregate for Concrete
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Concrete Volume (cu.m)</label>
                <Input value={concreteVolume} onChange={(e) => setConcreteVolume(e.target.value)} placeholder="10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Concrete Grade</label>
                <select value={concreteGrade} onChange={(e) => setConcreteGrade(e.target.value)} className="w-full border border-gray-300 rounded-md p-2">
                  <option value="M15">M15</option>
                  <option value="M20">M20</option>
                  <option value="M25">M25</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={calculateConcrete} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3">
                CALCULATE CONCRETE
              </Button>
            </div>

            {concreteResults.cement && (
              <div className="mt-6 p-4 bg-gray-100 rounded-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Concrete Results</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div><span className="font-medium">Cement:</span> {concreteResults.cement} bags</div>
                  <div><span className="font-medium">Sand:</span> {concreteResults.sand} cu.ft</div>
                  <div><span className="font-medium">Aggregate:</span> {concreteResults.aggregate} cu.ft</div>
                  <div><span className="font-medium">Total Cost:</span> ₹{concreteResults.cost}</div>
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <Button onClick={clearConcrete} variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                Clear Concrete
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Explore Related Categories */}
        <CementRelatedCategories />

        {/* Cement Guide Section */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800">Cement Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6 pt-0">
            {cementGuide.map((item, index) => (
              <div key={index}>
                <h3 className="text-base sm:text-lg font-semibold text-gray-700">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Applications Section */}
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800">Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6 pt-0">
            {applications.map((item, index) => (
              <div key={index}>
                <h3 className="text-base sm:text-lg font-semibold text-gray-700">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CementCalculator;
