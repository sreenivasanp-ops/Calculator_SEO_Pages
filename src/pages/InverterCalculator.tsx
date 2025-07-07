import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';

interface ApplianceItem {
  name: string;
  wattage: number;
  quantity: number;
}

interface ApplianceCategory {
  id: string;
  name: string;
  icon: string;
  items: ApplianceItem[];
}

const InverterCalculator = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [appliances, setAppliances] = useState<ApplianceCategory[]>([
    {
      id: 'fans',
      name: 'Fans and coolers',
      icon: '🌀',
      items: [
        { name: 'Ceiling Fan 75W', wattage: 75, quantity: 0 },
        { name: 'Table Fan 50W', wattage: 50, quantity: 0 },
        { name: 'Room Cooler 250W', wattage: 250, quantity: 0 }
      ]
    },
    {
      id: 'laptops',
      name: 'Laptops and Computers',
      icon: '💻',
      items: [
        { name: 'Laptop 100W', wattage: 100, quantity: 0 }
      ]
    },
    {
      id: 'lights',
      name: 'Lights',
      icon: '💡',
      items: [
        { name: 'LED Bulb 5W', wattage: 5, quantity: 0 },
        { name: 'LED Bulb 9W', wattage: 9, quantity: 0 },
        { name: 'CFL Light 15W', wattage: 15, quantity: 0 },
        { name: 'Tubelight 20W', wattage: 20, quantity: 0 },
        { name: 'CFL Heavy 30W', wattage: 30, quantity: 0 },
        { name: 'Tubelight 40W', wattage: 40, quantity: 0 },
        { name: 'Light Bulb (Incandescent) 40W', wattage: 40, quantity: 0 },
        { name: 'Light Bulb (Incandescent) 60W', wattage: 60, quantity: 0 },
        { name: 'Light Bulb (Incandescent) 100W', wattage: 100, quantity: 0 }
      ]
    },
    {
      id: 'appliances',
      name: 'Home Appliances',
      icon: '🏠',
      items: [
        { name: 'Juicer Mixer Grinder 800W', wattage: 800, quantity: 0 },
        { name: 'Toaster 800W', wattage: 800, quantity: 0 },
        { name: 'Refrigerator (upto 200L) 300W', wattage: 300, quantity: 0 },
        { name: 'Refrigerator (upto 500L) 500W', wattage: 500, quantity: 0 },
        { name: 'Microwave Oven 1400W', wattage: 1400, quantity: 0 },
        { name: 'Vacuum Cleaner 1400W', wattage: 1400, quantity: 0 },
        { name: 'Washing Machine 1000W', wattage: 1000, quantity: 0 },
        { name: 'Geyser/Water Heater 2200W', wattage: 2200, quantity: 0 },
        { name: 'Room Heater 2200W', wattage: 2200, quantity: 0 }
      ]
    },
    {
      id: 'entertainment',
      name: 'TV & other entertainment',
      icon: '📺',
      items: [
        { name: 'Television LED (upto 40") 60W', wattage: 60, quantity: 0 },
        { name: 'Television CRT (upto 21") 100W', wattage: 100, quantity: 0 },
        { name: 'Television Plasma 250W', wattage: 250, quantity: 0 },
        { name: 'Set Top Box (DTH) 50W', wattage: 50, quantity: 0 },
        { name: 'Music System 300W', wattage: 300, quantity: 0 },
        { name: 'Gaming Console 200W', wattage: 200, quantity: 0 }
      ]
    },
    {
      id: 'acs',
      name: 'ACs',
      icon: '❄️',
      items: [
        { name: 'Air Conditioner (1 Ton, 3 star) 1200W', wattage: 1200, quantity: 0 },
        { name: 'Air Conditioner (1.5 Ton, 3 star) 1700W', wattage: 1700, quantity: 0 },
        { name: 'Air Conditioner (2 Ton, 3 star) 2300W', wattage: 2300, quantity: 0 },
        { name: 'Air Conditioner (1 Ton, Inverter) 1100W', wattage: 1100, quantity: 0 },
        { name: 'Air Conditioner (1.5 Ton, Inverter) 1600W', wattage: 1600, quantity: 0 },
        { name: 'Air Conditioner (2 Ton, Inverter) 2100W', wattage: 2100, quantity: 0 }
      ]
    },
    {
      id: 'others',
      name: 'Others',
      icon: '📋',
      items: [
        { name: 'Photo Copier 2000W', wattage: 2000, quantity: 0 },
        { name: 'Office Printer/Scanner 2000W', wattage: 2000, quantity: 0 },
        { name: 'Petrol Filling Machine 1500W', wattage: 1500, quantity: 0 },
        { name: 'Projector 600W', wattage: 600, quantity: 0 },
        { name: 'Surveillance System 100W', wattage: 100, quantity: 0 }
      ]
    },
    {
      id: 'motors',
      name: 'Motors',
      icon: '⚙️',
      items: [
        { name: 'Water Pump (0.5 HP) 400W', wattage: 400, quantity: 0 },
        { name: 'Water Pump (1 HP) 800W', wattage: 800, quantity: 0 }
      ]
    }
  ]);

  const [totalLoad, setTotalLoad] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [averageRunningLoad, setAverageRunningLoad] = useState('');
  const [backupHours, setBackupHours] = useState('2');
  const [showPlanningInputs, setShowPlanningInputs] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const updateQuantity = (categoryId: string, itemIndex: number, change: number) => {
    setAppliances(prev => prev.map(category => {
      if (category.id === categoryId) {
        const updatedItems = [...category.items];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          quantity: Math.max(0, updatedItems[itemIndex].quantity + change)
        };
        return { ...category, items: updatedItems };
      }
      return category;
    }));
  };

  const calculateTotal = () => {
    let total = 0;
    appliances.forEach(category => {
      category.items.forEach(item => {
        total += item.wattage * item.quantity;
      });
    });
    setTotalLoad(total);
    setShowResult(true);
    setShowPlanningInputs(true);
  };

  const clearAll = () => {
    setAppliances(prev => prev.map(category => ({
      ...category,
      items: category.items.map(item => ({ ...item, quantity: 0 }))
    })));
    setTotalLoad(0);
    setShowResult(false);
    setShowPlanningInputs(false);
    setShowRecommendations(false);
    setAverageRunningLoad('');
    setBackupHours('2');
  };

  const handleLetsPlan = () => {
    if (averageRunningLoad && backupHours) {
      setShowRecommendations(true);
    }
  };

  const calculateRecommendations = () => {
    const runningLoadPercentage = parseInt(averageRunningLoad) / 100;
    const effectiveLoad = totalLoad * runningLoadPercentage;
    const vaRating = Math.ceil(totalLoad / 0.7);
    const hours = parseInt(backupHours);
    const batteryCapacity = Math.ceil((effectiveLoad * hours) / (12 * 0.8));
    
    let recommendedVA;
    if (vaRating < 500) {
      recommendedVA = 500;
    } else {
      recommendedVA = Math.ceil(vaRating / 100) * 100;
    }
    
    let recommendedBattery;
    if (batteryCapacity < 100) {
      recommendedBattery = 100;
    } else if (batteryCapacity >= 100 && batteryCapacity < 150) {
      recommendedBattery = 150;
    } else if (batteryCapacity >= 150 && batteryCapacity < 200) {
      recommendedBattery = 200;
    } else if (batteryCapacity >= 200 && batteryCapacity < 220) {
      recommendedBattery = 220;
    } else {
      recommendedBattery = Math.ceil(batteryCapacity / 10) * 10;
    }
    
    return {
      vaRating,
      batteryCapacity,
      recommendedVA,
      recommendedBattery
    };
  };

  const recommendations = calculateRecommendations();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Inverter Size Calculator – Know What You Need
        </h1>
        
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl text-center">Inverter Load Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {appliances.map((category) => (
              <Collapsible 
                key={category.id}
                open={openSections[category.id]}
                onOpenChange={() => toggleSection(category.id)}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between w-full p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium text-blue-600">{category.name}</span>
                    </div>
                    {openSections[category.id] ? 
                      <ChevronUp className="w-5 h-5" /> : 
                      <ChevronDown className="w-5 h-5" />
                    }
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="mt-2">
                  <div className="space-y-2 ml-6">
                    {category.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(category.id, index, -1)}
                            className="w-8 h-8 p-0"
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(category.id, index, 1)}
                            className="w-8 h-8 p-0"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
            
            <div className="flex justify-center gap-4 mt-6">
              <Button onClick={calculateTotal} className="bg-blue-600 hover:bg-blue-700">
                Calculate
              </Button>
              <Button onClick={clearAll} variant="outline">
                Clear All
              </Button>
            </div>
            
            {showResult && (
              <Card className="mt-6 bg-blue-50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="font-semibold text-lg mb-2">Total Load (W)*</h3>
                    <div className="text-2xl font-bold text-blue-600">{totalLoad}W</div>
                  </div>
                </CardContent>
              </Card>
            )}

            {showPlanningInputs && (
              <div className="mt-6 space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Average Running Load (%)*
                        </label>
                        <Select value={averageRunningLoad} onValueChange={setAverageRunningLoad}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select percentage" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border shadow-lg">
                            <SelectItem value="25">25%</SelectItem>
                            <SelectItem value="50">50%</SelectItem>
                            <SelectItem value="75">75%</SelectItem>
                            <SelectItem value="100">100%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Backup Hours
                        </label>
                        <div className="relative">
                          <Input
                            type="number"
                            value={backupHours}
                            onChange={(e) => setBackupHours(e.target.value)}
                            className="pr-12"
                            min="1"
                            max="24"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                            Hrs
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-center">
                  <Button 
                    onClick={handleLetsPlan}
                    className="bg-blue-600 hover:bg-blue-700 px-8"
                    disabled={!averageRunningLoad}
                  >
                    Let's Plan
                  </Button>
                </div>

                {showRecommendations && (
                  <Card className="mt-6 bg-gray-50">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">⚡</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Inverter VA Rating</h4>
                            <p className="text-blue-600 font-bold">
                              {recommendations.vaRating} VA | Recommended: {recommendations.recommendedVA} VA
                            </p>
                            <p className="text-xs text-gray-600 mt-1">*Assumed Efficiency of inverter is 0.7</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">🔋</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">Battery Capacity</h4>
                            <p className="text-blue-600 font-bold">
                              {recommendations.batteryCapacity} AH | Recommended: {recommendations.recommendedBattery} AH
                            </p>
                            <p className="text-xs text-gray-600 mt-1">*Assumed efficiency of Battery is 0.8</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InverterCalculator;
