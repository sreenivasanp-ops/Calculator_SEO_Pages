
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AllCalculatorsCTA = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/buyer-assistant');
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white py-4 px-4 mb-6">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-6 h-6 text-yellow-300" />
              <TrendingUp className="w-5 h-5 text-green-300" />
              <Zap className="w-5 h-5 text-orange-300" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">All Calculators & Buying Guides</h3>
              <p className="text-sm text-blue-100">Get expert advice and tools for all your needs</p>
            </div>
          </div>
          <Button
            onClick={handleClick}
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Explore All Tools →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllCalculatorsCTA;
