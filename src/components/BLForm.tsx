import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X, ArrowRight } from 'lucide-react';

interface BLFormProps {
  children: React.ReactNode;
  productType: 'tmt' | 'concrete' | 'brick' | 'resistor' | 'inverter';
}

const BLForm = ({ children, productType }: BLFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');

  const productConfig = {
    tmt: {
      title: 'TMT Bars',
      image: '/lovable-uploads/60c963e8-9134-4b52-912b-c08abe4408aa.png',
      question: 'How many tonne you need?',
      units: ['Tonne', 'Kg', 'Quintal', 'Piece']
    },
    concrete: {
      title: 'Ready Mixed Concrete',
      image: '/lovable-uploads/6b418998-7a36-4e05-bd0e-4d4803858381.png',
      question: 'How many cubic meter you need?',
      units: ['Cubic Meter']
    },
    brick: {
      title: 'Red Brick',
      image: '/lovable-uploads/c9314498-f538-4bbf-b881-91ff1d37748d.png',
      question: 'How many piece you need?',
      units: ['Piece', 'sq ft']
    },
    resistor: {
      title: 'Resistors',
      image: '/lovable-uploads/a94dd2cc-4c3b-4546-a608-91d722ae9cce.png',
      question: 'How many piece you need?',
      units: ['Piece']
    },
    inverter: {
      title: 'Inverter Battery',
      image: '/lovable-uploads/e666326a-6492-41bb-a176-5128caeb82c9.png',
      question: 'How many piece you need?',
      units: ['Piece']
    }
  };

  const config = productConfig[productType];

  const handleSubmit = () => {
    if (quantity && selectedUnit) {
      // Here you would handle the form submission
      console.log('Form submitted:', { productType, quantity, unit: selectedUnit });
      setIsOpen(false);
    }
  };

  const handleExit = () => {
    setIsOpen(false);
  };

  // Set default unit when modal opens
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && config.units.length > 0) {
      setSelectedUnit(config.units[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-full w-full h-full p-0 bg-white overflow-hidden m-0 rounded-none">
        <div className="relative">
          {/* Header */}
          <div className="bg-white p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Get Verified Seller</h2>
          </div>

          {/* Product Section */}
          <div className="p-6 bg-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={config.image} 
                  alt={config.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">{config.title}</h3>
              </div>
            </div>

            {/* Question */}
            <div className="mb-6">
              <h4 className="text-base font-medium text-gray-800 mb-4">{config.question}</h4>
              
              {/* Quantity Input */}
              <div className="relative mb-4">
                <Input
                  type="number"
                  placeholder="Enter Quantity Here"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full h-12 text-base border-2 border-gray-300 rounded-lg focus:border-blue-500"
                />
                <Button
                  onClick={handleSubmit}
                  disabled={!quantity || !selectedUnit}
                  className="absolute right-2 top-2 h-8 w-8 rounded-full bg-indiamart-teal hover:bg-indiamart-teal-dark disabled:bg-gray-300 p-0"
                >
                  <ArrowRight className="h-4 w-4 text-white" />
                </Button>
              </div>

              {/* Unit Selection */}
              <div className="flex flex-wrap gap-2">
                {config.units.map((unit) => (
                  <Badge
                    key={unit}
                    variant={selectedUnit === unit ? "default" : "outline"}
                    className={`cursor-pointer px-4 py-2 text-sm ${
                      selectedUnit === unit 
                        ? 'bg-indiamart-teal text-white hover:bg-indiamart-teal-dark' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedUnit(unit)}
                  >
                    {unit}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Exit Button */}
            <div className="flex justify-center pt-4 border-t border-gray-200">
              <button
                onClick={handleExit}
                className="text-gray-600 hover:text-gray-800 underline text-sm"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BLForm;