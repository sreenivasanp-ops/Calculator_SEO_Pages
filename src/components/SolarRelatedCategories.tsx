
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollDetection } from '@/hooks/useScrollDetection';

const SolarRelatedCategories = () => {
  const { elementRef, isScrolling } = useScrollDetection();
  
  const categories = [
    {
      title: "Solar Rooftops",
      image: "/lovable-uploads/bc56c2ca-56e8-42b1-b2af-83ed2e1c9d4d.png",
      buttonText: "Get Quotes",
      url: "https://m.indiamart.com/impcat/solar-rooftops.html"
    },
    {
      title: "Solar Power Systems",
      image: "/lovable-uploads/6a5b844d-9c3c-465e-90db-eccb1677f992.png",
      buttonText: "Get Quotes",
      url: "https://m.indiamart.com/impcat/solar-power-systems.html"
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

export default SolarRelatedCategories;
