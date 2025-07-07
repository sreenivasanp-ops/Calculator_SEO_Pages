
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollDetection } from '@/hooks/useScrollDetection';

const InverterBatteryRelatedCategories = () => {
  const { elementRef, isScrolling } = useScrollDetection();
  
  const categories = [
    {
      title: "Inverter Battery",
      image: "/lovable-uploads/ac335986-dd6c-4882-95ed-1b273b934844.png",
      buttonText: "Get Quotes",
      url: "https://m.indiamart.com/impcat/hair-clips.html"
    },
    {
      title: "Luminous Inverter Battery",
      image: "/lovable-uploads/ac335986-dd6c-4882-95ed-1b273b934844.png",
      buttonText: "Get Quotes",
      url: "https://m.indiamart.com/impcat/luminous-inverter-batteries.html"
    },
    {
      title: "Concrete Reinforcement Bars",
      image: "/lovable-uploads/e2eadd8f-1522-4511-a638-bbc5e2f9e248.png",
      buttonText: "Get Quotes",
      url: "https://m.indiamart.com/impcat/concrete-reinforcing-bars.html"
    }
  ];

  const handleCategoryClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Card className="mb-4 sm:mb-6 border border-gray-200">
      <CardHeader className="p-3 sm:p-6">
        <CardTitle className="text-lg sm:text-xl text-gray-800">Explore Related Categories</CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6 pt-0">
        <div 
          ref={elementRef}
          className={`flex space-x-3 overflow-x-auto scrollbar-subtle ${isScrolling ? 'scrolling' : ''}`}
        >
          {categories.map((category, index) => (
            <div key={index} className="flex-shrink-0 w-36">
              <div 
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleCategoryClick(category.url)}
              >
                <div className="w-full h-20 bg-gray-100 rounded mb-2 flex items-center justify-center overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xs font-medium text-gray-800 mb-2 text-center min-h-[32px] flex items-center justify-center">{category.title}</h3>
                <button className="w-full bg-indiamart-teal text-white text-xs py-1.5 rounded-md font-medium hover:bg-teal-600 transition-colors">
                  {category.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InverterBatteryRelatedCategories;
