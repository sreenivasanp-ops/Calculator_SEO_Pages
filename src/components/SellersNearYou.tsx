
const SellersNearYou = () => {
  const sellers = [
    {
      id: 1,
      title: "0.40MM WALL PANELS",
      price: "₹ 1,000/Square Meter",
      rating: "★ Arealfirma",
      location: "9 Gujarat",
      image: "/lovable-uploads/58f7d244-6de6-42f9-b1ee-c45193ebdc77.png"
    },
    {
      id: 2,
      title: "920mm PIR Sandwich Roof Panel",
      price: "₹ 1,850/Square Meter",
      rating: "★ Mount Roofing And Structures...",
      location: "Bengaluru",
      image: "/lovable-uploads/58f7d244-6de6-42f9-b1ee-c45193ebdc77.png"
    },
    {
      id: 3,
      title: "80mm PUF Insulated Roofing Panel",
      price: "₹ 1,250/Square Meter",
      rating: "★ Delta Infrastructures",
      location: "Bengaluru",
      image: "/lovable-uploads/58f7d244-6de6-42f9-b1ee-c45193ebdc77.png"
    },
    {
      id: 4,
      title: "PUF Insulated Roof Wall Panels",
      price: "₹ 92/sq ft",
      rating: "★ Roofing Goa Solution",
      location: "",
      image: "/lovable-uploads/58f7d244-6de6-42f9-b1ee-c45193ebdc77.png"
    }
  ];

  return (
    <div className="px-4 py-4 bg-white">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-gray-800 font-medium">More Sellers Near You For</h3>
          <span className="text-indiamart-teal text-sm font-medium underline">Insulated Roofing Panels</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {sellers.map((seller) => (
          <div key={seller.id} className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="flex items-start space-x-3">
              <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                <img 
                  src={seller.image} 
                  alt={seller.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-800 mb-1">{seller.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{seller.price}</p>
                <div className="flex items-center space-x-1 mb-1">
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">{seller.rating}</span>
                </div>
                {seller.location && <p className="text-xs text-gray-500">{seller.location}</p>}
              </div>
            </div>
            <div className="flex space-x-2 mt-3">
              <button className="flex-1 bg-indiamart-teal text-white text-sm py-2 px-4 rounded-md font-medium flex items-center justify-center">
                📞 Call Now
              </button>
              <button className="flex-1 border border-indiamart-teal text-indiamart-teal text-sm py-2 px-4 rounded-md font-medium flex items-center justify-center">
                💬 Get Best Price
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellersNearYou;
