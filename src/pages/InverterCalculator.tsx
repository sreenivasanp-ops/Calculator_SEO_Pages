import Header from '@/components/Header';
import AllCalculatorsCTA from '@/components/AllCalculatorsCTA';
import InverterBatteryRelatedCategories from '@/components/InverterBatteryRelatedCategories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Fan, Laptop, Lightbulb, Home, Tv, AirVent, Settings, Zap } from 'lucide-react';

const InverterCalculator = () => {
  // Collapsible states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  
  // Appliance quantities
  const [appliances, setAppliances] = useState({
    // Fans and Coolers
    ceilingFan75W: 0,
    tableFan50W: 0,
    roomCooler250W: 0,
    
    // Laptops and Computers
    laptop100W: 0,
    
    // Lights
    ledBulb5W: 0,
    ledBulb9W: 0,
    cflLight15W: 0,
    tubelight20W: 0,
    cflHeavy30W: 0,
    tubelight40W: 0,
    incandescentBulb40W: 0,
    incandescentBulb60W: 0,
    incandescentBulb100W: 0,
    
    // Home Appliances
    juicerMixerGrinder800W: 0,
    toaster800W: 0,
    refrigerator200L300W: 0,
    refrigerator500L500W: 0,
    microwaveOven1400W: 0,
    vacuumCleaner1400W: 0,
    washingMachine1000W: 0,
    geyserWaterHeater2200W: 0,
    roomHeater2200W: 0,
    
    // TV & Other Entertainment
    televisionLED60W: 0,
    televisionCRT100W: 0,
    televisionPlasma250W: 0,
    setTopBox50W: 0,
    musicSystem300W: 0,
    gamingConsole200W: 0,
    
    // ACs
    ac1Ton1200W: 0,
    ac1_5Ton1700W: 0,
    ac2Ton2300W: 0,
    ac1TonInverter1100W: 0,
    ac1_5TonInverter1600W: 0,
    ac2TonInverter2100W: 0,
    
    // Others
    photoCopier200W: 0,
    officePrinterScanner2000W: 0,
    petrolFillingMachine1500W: 0,
    projector600W: 0,
    surveillanceSystem100W: 0,
    
    // Motors
    waterPump05HP400W: 0,
    waterPump1HP800W: 0,
  });
  
  // Change backup time to slider with default value
  const [backupTime, setBackupTime] = useState([2]); // Changed to array for slider
  const [averageRunningLoad, setAverageRunningLoad] = useState('');
  
  // Results
  const [showResults, setShowResults] = useState(false);
  const [totalWattage, setTotalWattage] = useState(0);
  const [inverterVa, setInverterVa] = useState(0);
  const [batteryAh, setBatteryAh] = useState(0);

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateAppliance = (appliance: string, value: number) => {
    setAppliances(prev => ({
      ...prev,
      [appliance]: Math.max(0, value)
    }));
  };

  const calculateTotalWattage = () => {
    const wattageMap = {
      ceilingFan75W: 75,
      tableFan50W: 50,
      roomCooler250W: 250,
      laptop100W: 100,
      ledBulb5W: 5,
      ledBulb9W: 9,
      cflLight15W: 15,
      tubelight20W: 20,
      cflHeavy30W: 30,
      tubelight40W: 40,
      incandescentBulb40W: 40,
      incandescentBulb60W: 60,
      incandescentBulb100W: 100,
      juicerMixerGrinder800W: 800,
      toaster800W: 800,
      refrigerator200L300W: 300,
      refrigerator500L500W: 500,
      microwaveOven1400W: 1400,
      vacuumCleaner1400W: 1400,
      washingMachine1000W: 1000,
      geyserWaterHeater2200W: 2200,
      roomHeater2200W: 2200,
      televisionLED60W: 60,
      televisionCRT100W: 100,
      televisionPlasma250W: 250,
      setTopBox50W: 50,
      musicSystem300W: 300,
      gamingConsole200W: 200,
      ac1Ton1200W: 1200,
      ac1_5Ton1700W: 1700,
      ac2Ton2300W: 2300,
      ac1TonInverter1100W: 1100,
      ac1_5TonInverter1600W: 1600,
      ac2TonInverter2100W: 2100,
      photoCopier200W: 200,
      officePrinterScanner2000W: 2000,
      petrolFillingMachine1500W: 1500,
      projector600W: 600,
      surveillanceSystem100W: 100,
      waterPump05HP400W: 400,
      waterPump1HP800W: 800,
    };

    let total = 0;
    Object.entries(appliances).forEach(([key, quantity]) => {
      total += quantity * (wattageMap[key as keyof typeof wattageMap] || 0);
    });

    return total;
  };

  const calculateInverter = () => {
    const calculatedWattage = calculateTotalWattage();
    const hours = backupTime[0]; // Get value from slider array
    const loadPercentage = parseFloat(averageRunningLoad) || 100;

    if (calculatedWattage === 0 || hours === 0 || !averageRunningLoad) return;

    setTotalWattage(calculatedWattage);

    // Calculate actual running load based on percentage
    const actualRunningLoad = (calculatedWattage * loadPercentage) / 100;

    // Calculate VA rating using new formula: Total Load / 0.7
    const vaRating = actualRunningLoad / 0.7;

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
    setAppliances({
      ceilingFan75W: 0,
      tableFan50W: 0,
      roomCooler250W: 0,
      laptop100W: 0,
      ledBulb5W: 0,
      ledBulb9W: 0,
      cflLight15W: 0,
      tubelight20W: 0,
      cflHeavy30W: 0,
      tubelight40W: 0,
      incandescentBulb40W: 0,
      incandescentBulb60W: 0,
      incandescentBulb100W: 0,
      juicerMixerGrinder800W: 0,
      toaster800W: 0,
      refrigerator200L300W: 0,
      refrigerator500L500W: 0,
      microwaveOven1400W: 0,
      vacuumCleaner1400W: 0,
      washingMachine1000W: 0,
      geyserWaterHeater2200W: 0,
      roomHeater2200W: 0,
      televisionLED60W: 0,
      televisionCRT100W: 0,
      televisionPlasma250W: 0,
      setTopBox50W: 0,
      musicSystem300W: 0,
      gamingConsole200W: 0,
      ac1Ton1200W: 0,
      ac1_5Ton1700W: 0,
      ac2Ton2300W: 0,
      ac1TonInverter1100W: 0,
      ac1_5TonInverter1600W: 0,
      ac2TonInverter2100W: 0,
      photoCopier200W: 0,
      officePrinterScanner2000W: 0,
      petrolFillingMachine1500W: 0,
      projector600W: 0,
      surveillanceSystem100W: 0,
      waterPump05HP400W: 0,
      waterPump1HP800W: 0,
    });
    setBackupTime([2]);
    setAverageRunningLoad('');
    setShowResults(false);
    setTotalWattage(0);
    setInverterVa(0);
    setBatteryAh(0);
    setOpenSections({});
  };

  const ApplianceCounter = ({ 
    name, 
    wattage, 
    value, 
    onChange 
  }: { 
    name: string; 
    wattage: string; 
    value: number; 
    onChange: (value: number) => void; 
  }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <span className="text-sm text-gray-700">{name} {wattage}</span>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(value - 1)}
          disabled={value <= 0}
          className="h-8 w-8 p-0"
        >
          −
        </Button>
        <span className="w-8 text-center font-medium">{value}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange(value + 1)}
          className="h-8 w-8 p-0"
        >
          +
        </Button>
      </div>
    </div>
  );

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
                Calculate Based on Your Appliances
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            {/* Appliance Categories */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Your Appliances</h3>
              <div className="space-y-2">
                
                {/* Fans and Coolers */}
                <Collapsible open={openSections.fans} onOpenChange={() => toggleSection('fans')}>
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <Fan className="h-5 w-5 text-blue-500" />
                        <span className="font-medium text-gray-700">Fans and coolers</span>
                      </div>
                      {openSections.fans ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="bg-white border-x border-b border-gray-200 rounded-b-lg px-4">
                    <ApplianceCounter 
                      name="Ceiling Fan" 
                      wattage="75W" 
                      value={appliances.ceilingFan75W} 
                      onChange={(val) => updateAppliance('ceilingFan75W', val)} 
                    />
                    <ApplianceCounter 
                      name="Table Fan" 
                      wattage="50W" 
                      value={appliances.tableFan50W} 
                      onChange={(val) => updateAppliance('tableFan50W', val)} 
                    />
                    <ApplianceCounter 
                      name="Room Cooler" 
                      wattage="250W" 
                      value={appliances.roomCooler250W} 
                      onChange={(val) => updateAppliance('roomCooler250W', val)} 
                    />
                  </CollapsibleContent>
                </Collapsible>

                {/* Laptops and Computers */}
                <Collapsible open={openSections.computers} onOpenChange={() => toggleSection('computers')}>
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <Laptop className="h-5 w-5 text-blue-500" />
                        <span className="font-medium text-gray-700">Laptops and Computers</span>
                      </div>
                      {openSections.computers ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="bg-white border-x border-b border-gray-200 rounded-b-lg px-4">
                    <ApplianceCounter 
                      name="Laptop" 
                      wattage="100W" 
                      value={appliances.laptop100W} 
                      onChange={(val) => updateAppliance('laptop100W', val)} 
                    />
                  </CollapsibleContent>
                </Collapsible>

                {/* Lights */}
                <Collapsible open={openSections.lights} onOpenChange={() => toggleSection('lights')}>
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <Lightbulb className="h-5 w-5 text-blue-500" />
                        <span className="font-medium text-gray-700">Lights</span>
                      </div>
                      {openSections.lights ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="bg-white border-x border-b border-gray-200 rounded-b-lg px-4">
                    <ApplianceCounter 
                      name="LED Bulb" 
                      wattage="5W" 
                      value={appliances.ledBulb5W} 
                      onChange={(val) => updateAppliance('ledBulb5W', val)} 
                    />
                    <ApplianceCounter 
                      name="LED Bulb" 
                      wattage="9W" 
                      value={appliances.ledBulb9W} 
                      onChange={(val) => updateAppliance('ledBulb9W', val)} 
                    />
                    <ApplianceCounter 
                      name="CFL Light" 
                      wattage="15W" 
                      value={appliances.cflLight15W} 
                      onChange={(val) => updateAppliance('cflLight15W', val)} 
                    />
                    <ApplianceCounter 
                      name="Tubelight" 
                      wattage="20W" 
                      value={appliances.tubelight20W} 
                      onChange={(val) => updateAppliance('tubelight20W', val)} 
                    />
                    <ApplianceCounter 
                      name="CFL Heavy" 
                      wattage="30W" 
                      value={appliances.cflHeavy30W} 
                      onChange={(val) => updateAppliance('cflHeavy30W', val)} 
                    />
                    <ApplianceCounter 
                      name="Tubelight" 
                      wattage="40W" 
                      value={appliances.tubelight40W} 
                      onChange={(val) => updateAppliance('tubelight40W', val)} 
                    />
                    <ApplianceCounter 
                      name="Light Bulb (Incandescent)" 
                      wattage="40W" 
                      value={appliances.incandescentBulb40W} 
                      onChange={(val) => updateAppliance('incandescentBulb40W', val)} 
                    />
                    <ApplianceCounter 
                      name="Light Bulb (Incandescent)" 
                      wattage="60W" 
                      value={appliances.incandescentBulb60W} 
                      onChange={(val) => updateAppliance('incandescentBulb60W', val)} 
                    />
                    <ApplianceCounter 
                      name="Light Bulb (Incandescent)" 
                      wattage="100W" 
                      value={appliances.incandescentBulb100W} 
                      onChange={(val) => updateAppliance('incandescentBulb100W', val)} 
                    />
                  </CollapsibleContent>
                </Collapsible>

                {/* Home Appliances */}
                <Collapsible open={openSections.home} onOpenChange={() => toggleSection('home')}>
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <Home className="h-5 w-5 text-blue-500" />
                        <span className="font-medium text-gray-700">Home Appliances</span>
                      </div>
                      {openSections.home ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="bg-white border-x border-b border-gray-200 rounded-b-lg px-4">
                    <ApplianceCounter 
                      name="Juicer Mixer Grinder" 
                      wattage="800W" 
                      value={appliances.juicerMixerGrinder800W} 
                      onChange={(val) => updateAppliance('juicerMixerGrinder800W', val)} 
                    />
                    <ApplianceCounter 
                      name="Toaster" 
                      wattage="800W" 
                      value={appliances.toaster800W} 
                      onChange={(val) => updateAppliance('toaster800W', val)} 
                    />
                    <ApplianceCounter 
                      name="Refrigerator (upto 200L)" 
                      wattage="300W" 
                      value={appliances.refrigerator200L300W} 
                      onChange={(val) => updateAppliance('refrigerator200L300W', val)} 
                    />
                    <ApplianceCounter 
                      name="Refrigerator (upto 500L)" 
                      wattage="500W" 
                      value={appliances.refrigerator500L500W} 
                      onChange={(val) => updateAppliance('refrigerator500L500W', val)} 
                    />
                    <ApplianceCounter 
                      name="Microwave Oven" 
                      wattage="1400W" 
                      value={appliances.microwaveOven1400W} 
                      onChange={(val) => updateAppliance('microwaveOven1400W', val)} 
                    />
                    <ApplianceCounter 
                      name="Vacuum Cleaner" 
                      wattage="1400W" 
                      value={appliances.vacuumCleaner1400W} 
                      onChange={(val) => updateAppliance('vacuumCleaner1400W', val)} 
                    />
                    <ApplianceCounter 
                      name="Washing Machine" 
                      wattage="1000W" 
                      value={appliances.washingMachine1000W} 
                      onChange={(val) => updateAppliance('washingMachine1000W', val)} 
                    />
                    <ApplianceCounter 
                      name="Geyser/Water Heater" 
                      wattage="2200W" 
                      value={appliances.geyserWaterHeater2200W} 
                      onChange={(val) => updateAppliance('geyserWaterHeater2200W', val)} 
                    />
                    <ApplianceCounter 
                      name="Room Heater" 
                      wattage="2200W" 
                      value={appliances.roomHeater2200W} 
                      onChange={(val) => updateAppliance('roomHeater2200W', val)} 
                    />
                  </CollapsibleContent>
                </Collapsible>

                {/* TV & Other Entertainment */}
                <Collapsible open={openSections.entertainment} onOpenChange={() => toggleSection('entertainment')}>
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <Tv className="h-5 w-5 text-blue-500" />
                        <span className="font-medium text-gray-700">TV & other entertainment</span>
                      </div>
                      {openSections.entertainment ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="bg-white border-x border-b border-gray-200 rounded-b-lg px-4">
                    <ApplianceCounter 
                      name="Television LED (upto 40'')" 
                      wattage="60W" 
                      value={appliances.televisionLED60W} 
                      onChange={(val) => updateAppliance('televisionLED60W', val)} 
                    />
                    <ApplianceCounter 
                      name="Television CRT (upto 21'')" 
                      wattage="100W" 
                      value={appliances.televisionCRT100W} 
                      onChange={(val) => updateAppliance('televisionCRT100W', val)} 
                    />
                    <ApplianceCounter 
                      name="Television Plasma" 
                      wattage="250W" 
                      value={appliances.televisionPlasma250W} 
                      onChange={(val) => updateAppliance('televisionPlasma250W', val)} 
                    />
                    <ApplianceCounter 
                      name="Set Top Box (DTH)" 
                      wattage="50W" 
                      value={appliances.setTopBox50W} 
                      onChange={(val) => updateAppliance('setTopBox50W', val)} 
                    />
                    <ApplianceCounter 
                      name="Music System" 
                      wattage="300W" 
                      value={appliances.musicSystem300W} 
                      onChange={(val) => updateAppliance('musicSystem300W', val)} 
                    />
                    <ApplianceCounter 
                      name="Gaming Console" 
                      wattage="200W" 
                      value={appliances.gamingConsole200W} 
                      onChange={(val) => updateAppliance('gamingConsole200W', val)} 
                    />
                  </CollapsibleContent>
                </Collapsible>

                {/* ACs */}
                <Collapsible open={openSections.acs} onOpenChange={() => toggleSection('acs')}>
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <AirVent className="h-5 w-5 text-blue-500" />
                        <span className="font-medium text-gray-700">ACs</span>
                      </div>
                      {openSections.acs ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="bg-white border-x border-b border-gray-200 rounded-b-lg px-4">
                    <ApplianceCounter 
                      name="Air Conditioner (1 Ton, 3 star)" 
                      wattage="1200W" 
                      value={appliances.ac1Ton1200W} 
                      onChange={(val) => updateAppliance('ac1Ton1200W', val)} 
                    />
                    <ApplianceCounter 
                      name="Air Conditioner (1.5 Ton, 3 star)" 
                      wattage="1700W" 
                      value={appliances.ac1_5Ton1700W} 
                      onChange={(val) => updateAppliance('ac1_5Ton1700W', val)} 
                    />
                    <ApplianceCounter 
                      name="Air Conditioner (2 Ton, 3 star)" 
                      wattage="2300W" 
                      value={appliances.ac2Ton2300W} 
                      onChange={(val) => updateAppliance('ac2Ton2300W', val)} 
                    />
                    <ApplianceCounter 
                      name="Air Conditioner (1 Ton, Inverter)" 
                      wattage="1100W" 
                      value={appliances.ac1TonInverter1100W} 
                      onChange={(val) => updateAppliance('ac1TonInverter1100W', val)} 
                    />
                    <ApplianceCounter 
                      name="Air Conditioner (1.5 Ton, Inverter)" 
                      wattage="1600W" 
                      value={appliances.ac1_5TonInverter1600W} 
                      onChange={(val) => updateAppliance('ac1_5TonInverter1600W', val)} 
                    />
                    <ApplianceCounter 
                      name="Air Conditioner (2 Ton, Inverter)" 
                      wattage="2100W" 
                      value={appliances.ac2TonInverter2100W} 
                      onChange={(val) => updateAppliance('ac2TonInverter2100W', val)} 
                    />
                  </CollapsibleContent>
                </Collapsible>

                {/* Others */}
                <Collapsible open={openSections.others} onOpenChange={() => toggleSection('others')}>
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <Settings className="h-5 w-5 text-blue-500" />
                        <span className="font-medium text-gray-700">Others</span>
                      </div>
                      {openSections.others ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="bg-white border-x border-b border-gray-200 rounded-b-lg px-4">
                    <ApplianceCounter 
                      name="Photo Copier" 
                      wattage="200W" 
                      value={appliances.photoCopier200W} 
                      onChange={(val) => updateAppliance('photoCopier200W', val)} 
                    />
                    <ApplianceCounter 
                      name="Office Printer/Scanner" 
                      wattage="2000W" 
                      value={appliances.officePrinterScanner2000W} 
                      onChange={(val) => updateAppliance('officePrinterScanner2000W', val)} 
                    />
                    <ApplianceCounter 
                      name="Petrol Filling Machine" 
                      wattage="1500W" 
                      value={appliances.petrolFillingMachine1500W} 
                      onChange={(val) => updateAppliance('petrolFillingMachine1500W', val)} 
                    />
                    <ApplianceCounter 
                      name="Projector" 
                      wattage="600W" 
                      value={appliances.projector600W} 
                      onChange={(val) => updateAppliance('projector600W', val)} 
                    />
                    <ApplianceCounter 
                      name="Surveillance System" 
                      wattage="100W" 
                      value={appliances.surveillanceSystem100W} 
                      onChange={(val) => updateAppliance('surveillanceSystem100W', val)} 
                    />
                  </CollapsibleContent>
                </Collapsible>

                {/* Motors */}
                <Collapsible open={openSections.motors} onOpenChange={() => toggleSection('motors')}>
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <Zap className="h-5 w-5 text-blue-500" />
                        <span className="font-medium text-gray-700">Motors</span>
                      </div>
                      {openSections.motors ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="bg-white border-x border-b border-gray-200 rounded-b-lg px-4">
                    <ApplianceCounter 
                      name="Water Pump (0.5 HP)" 
                      wattage="400W" 
                      value={appliances.waterPump05HP400W} 
                      onChange={(val) => updateAppliance('waterPump05HP400W', val)} 
                    />
                    <ApplianceCounter 
                      name="Water Pump (1 HP)" 
                      wattage="800W" 
                      value={appliances.waterPump1HP800W} 
                      onChange={(val) => updateAppliance('waterPump1HP800W', val)} 
                    />
                  </CollapsibleContent>
                </Collapsible>

              </div>
            </div>

            {/* Current Total Wattage Display */}
            <div className="bg-gray-100 p-4 rounded-md">
              <h4 className="font-semibold text-gray-700">Current Total Load: {calculateTotalWattage()} Watts</h4>
            </div>

            {/* Average Running Load Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average Running Load (%) *
              </label>
              <Select value={averageRunningLoad} onValueChange={setAverageRunningLoad}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select average running load" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25%</SelectItem>
                  <SelectItem value="50">50%</SelectItem>
                  <SelectItem value="75">75%</SelectItem>
                  <SelectItem value="100">100%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Backup Time Slider - Changed from Input to Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Required Backup Time: {backupTime[0]} hr
              </label>
              <div className="px-4">
                <Slider
                  value={backupTime}
                  onValueChange={setBackupTime}
                  max={10}
                  min={0.5}
                  step={0.5}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>0.5 hr</span>
                  <span>10 hr</span>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="flex justify-center">
              <Button
                onClick={calculateInverter}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg font-semibold"
                disabled={calculateTotalWattage() === 0 || backupTime[0] === 0 || !averageRunningLoad}
              >
                CALCULATE
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section - Improved Design */}
        {showResults && (
          <>
            {/* Combined Inverter & Battery Specifications - Enhanced Design */}
            <Card className="mb-6 border-2 border-gradient-to-r from-green-200 to-teal-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 p-6">
                <CardTitle className="text-center text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
                  ⚡ Inverter & Battery Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                      🔋 Inverter Specifications
                    </h3>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700">VA Rating:</h4>
                      <p className="text-3xl font-bold text-green-600">{inverterVa} VA</p>
                    </div>
                  </div>
                  <div className="space-y-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
                      🔋 Battery Specifications
                    </h3>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-700">Capacity:</h4>
                      <p className="text-3xl font-bold text-orange-600">{batteryAh} AH</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Breakdown - Enhanced Design */}
            <Card className="mb-6 border-2 border-gradient-to-r from-purple-200 to-pink-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                <CardTitle className="text-center text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
                  💰 Cost Breakdown (Estimated)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h3 className="text-lg font-semibold text-purple-700 mb-2">Inverter Cost:</h3>
                    <p className="text-2xl font-bold text-purple-600">₹{inverterCost}</p>
                  </div>
                  <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                    <h3 className="text-lg font-semibold text-pink-700 mb-2">Battery Cost:</h3>
                    <p className="text-2xl font-bold text-pink-600">₹{batteryCost}</p>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-300 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Estimated Cost:</h3>
                  <p className="text-4xl font-bold text-purple-700">₹{totalCost}</p>
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

        {/* Combined Inverter & Battery Buying Guide Section */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl text-gray-800">Inverter & Battery Buying Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6 pt-0">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">Essential factors to consider when buying an inverter and battery system</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Load Requirement & Power Calculation:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Calculate the total power consumption (in watts) of all appliances you intend to run. This determines the appropriate VA rating of the inverter. Consider both starting and running power requirements for motor-based appliances.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Backup Time & Battery Capacity:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Determine your required backup duration during power outages. Battery capacity (measured in AH - Ampere Hours) directly affects backup time. Higher AH ratings provide longer backup periods but increase cost and space requirements.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">System Compatibility & Voltage:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Ensure inverter and battery voltage compatibility (typically 12V, 24V, or 48V systems). Match the system voltage for optimal performance and safety. Consider expandability for future power needs.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Inverter Type & Wave Form:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Choose between modified sine wave (basic applications) and pure sine wave inverters (sensitive electronics, motors). Pure sine wave is recommended for computers, medical equipment, and efficient motor operation.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Battery Technology & Maintenance:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Select appropriate battery type: Tubular (long-lasting, requires maintenance), Flat plate (cost-effective, moderate lifespan), Lithium-ion (compact, maintenance-free, expensive), or Gel batteries (sealed, moderate cost). Consider maintenance requirements, lifespan, and environmental conditions.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm sm:text-base">Efficiency & Features:</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Look for high-efficiency inverters (85-95%) to minimize energy loss. Consider features like overload protection, low battery alarms, LCD displays, and smart charging capabilities for optimal performance and safety.
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 text-xs sm:text-sm mt-3 sm:mt-4">
                Selecting the right inverter and battery system requires balancing power requirements, backup time, budget, and space constraints. Consult with certified technicians for installation and consider warranty terms from reputable manufacturers for long-term reliability.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InverterCalculator;
