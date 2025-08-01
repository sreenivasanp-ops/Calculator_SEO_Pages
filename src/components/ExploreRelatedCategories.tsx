
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollDetection } from '@/hooks/useScrollDetection';
import { useLocation } from 'react-router-dom';

const ExploreRelatedCategories = () => {
  const { elementRef, isScrolling } = useScrollDetection();
  const location = useLocation();
  
  const getCategories = () => {
    if (location.pathname === '/brickwork-calculator') {
      return [
        {
          title: "Red Brick",
          image: "/lovable-uploads/061626f9-ad7e-42f6-83dd-3d9f28e1c0bd.png",
          buttonText: "Get Quotes",
          url: "https://m.indiamart.com/impcat/red-brick.html"
        },
        {
          title: "Bricks",
          image: "/lovable-uploads/1de26ed0-5eec-4a69-9fb8-0a70aeab3e17.png",
          buttonText: "Get Quotes",
          url: "https://m.indiamart.com/impcat/bricks.html"
        },
        {
          title: "Fly Ash Bricks",
          image: "/lovable-uploads/85366bfe-0191-4eb6-b966-3330a82b1eb1.png",
          buttonText: "Get Quotes",
          url: "https://m.indiamart.com/impcat/fly-ash-bricks.html"
        }
      ];
    } else if (location.pathname === '/concrete-calculator') {
      return [
        {
          title: "Ready Mixed Concrete",
          image: "/lovable-uploads/6a246506-481e-4bab-9628-8c14c0ac74f5.png",
          buttonText: "Get Quotes",
          url: "https://m.indiamart.com/impcat/ready-mixed-concrete.html"
        },
        {
          title: "Construction Aggregates",
          image: "/lovable-uploads/e2fc0659-5e57-4988-b333-b9ef19ee1e81.png",
          buttonText: "Get Quotes",
          url: "https://m.indiamart.com/impcat/construction-aggregates.html"
        },
        {
          title: "Cement",
          image: "/lovable-uploads/0475ad09-e258-4692-8f23-7e8f2b4fa656.png",
          buttonText: "Get Quotes",
          url: "https://m.indiamart.com/impcat/construction-cement.html"
        }
      ];
    } else {
      // Default categories for TMT Bars page and others
      return [
        {
          title: "TMT Bars",
          image: "/lovable-uploads/4b338d1f-d0d2-473f-8d19-14cbcd900038.png",
          buttonText: "Get Quotes",
          url: "https://m.indiamart.com/impcat/tmt-bars.html"
        },
        {
          title: "Ribbed Bar",
          image: "/lovable-uploads/9b331f35-ecb3-45a1-8420-25f6cc8424b4.png",
          buttonText: "Get Quotes",
          url: "https://m.indiamart.com/impcat/ribbed-bar.html"
        },
        {
          title: "Concrete Reinforcing Bars",
          image: "/lovable-uploads/3f8d76fb-2e77-4139-ba12-42a28b13012c.png",
          buttonText: "Get Quotes",
          url: "https://dir.indiamart.com/impcat/concrete-reinforcing-bars.html"
        },
        {
          title: "Rebars",
          image: "/lovable-uploads/2b4ebf76-2a2a-4785-8fcb-d3914e5c373a.png",
          buttonText: "Get Quotes",
          url: "https://dir.indiamart.com/impcat/rebars.html"
        },
        {
          title: "Iron TMT Bar",
          image: "/lovable-uploads/1da684e3-1d0f-4fba-809b-28224d228d64.png",
          buttonText: "Get Quotes",
          url: "https://dir.indiamart.com/impcat/iron-tmt-bar.html"
        },
        {
          title: "Mild Steel TMT Bars",
          image: "/lovable-uploads/01fdc602-3041-465e-b2cb-1383330b7534.png",
          buttonText: "Get Quotes",
          url: "https://dir.indiamart.com/impcat/mild-steel-tmt-bars.html"
        },
        {
          title: "TMT Steel Bars",
          image: "/lovable-uploads/0a8d1f9d-6c9e-4627-8c70-385f1783f516.png",
          buttonText: "Get Quotes",
          url: "https://dir.indiamart.com/impcat/tmt-steel-bars.html"
        },
        {
          title: "SS TMT Bar",
          image: "/lovable-uploads/5461527b-0809-4d7b-9d8e-8e1a1e5ad761.png",
          buttonText: "Get Quotes",
          url: "https://dir.indiamart.com/impcat/ss-tmt-bar.html"
        }
      ];
    }
  };

  const categories = getCategories();

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

export default ExploreRelatedCategories;
