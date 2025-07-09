
import Header from '@/components/Header';
import AllCalculatorsCTA from '@/components/AllCalculatorsCTA';

const CementCalculator = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AllCalculatorsCTA />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Cement Calculator - Coming Soon
        </h1>
        
        <div className="text-center text-gray-600">
          <p>This page is under development. Please check back later.</p>
        </div>
      </div>
    </div>
  );
};

export default CementCalculator;
