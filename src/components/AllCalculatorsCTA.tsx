import { Calculator, TrendingUp, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AllCalculatorsCTA = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/buyer-assistant');
  };

  return (
    <div className="mb-1">
      <div className="container mx-auto px-4">
        <div 
          onClick={handleClick}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white py-1 px-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer hover:shadow-xl"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-yellow-300" />
              <TrendingUp className="w-3 h-3 text-green-300" />
              <Zap className="w-3 h-3 text-orange-300" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold">
              Explore All Calculators & Buying Guides →
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCalculatorsCTA;
