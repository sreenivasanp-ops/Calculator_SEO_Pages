
const Categories = () => {
  const categories = [
    {
      title: "Cold Storage Ro...",
      image: "/lovable-uploads/cb0af07e-c5b7-4086-b4ca-a1627c7fcf72.png",
      buttonText: "Get Quotes"
    },
    {
      title: "Puf Sheets",
      image: "/lovable-uploads/cb0af07e-c5b7-4086-b4ca-a1627c7fcf72.png",
      buttonText: "Get Quotes"
    },
    {
      title: "UPVC",
      image: "/lovable-uploads/cb0af07e-c5b7-4086-b4ca-a1627c7fcf72.png",
      buttonText: "Get Quotes"
    }
  ];

  return (
    <div className="px-4 py-4">
      <h2 className="text-gray-800 font-medium mb-3">Categories of Your Interest</h2>
      <div className="flex space-x-3 overflow-x-auto">
        {categories.map((category, index) => (
          <div key={index} className="flex-shrink-0 w-32">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
              <div className="w-full h-16 bg-gray-100 rounded mb-2 flex items-center justify-center overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xs font-medium text-gray-800 mb-2 text-center">{category.title}</h3>
              <button className="w-full bg-indiamart-teal text-white text-xs py-1.5 rounded-md font-medium">
                {category.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
