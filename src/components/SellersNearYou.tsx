
const SellersNearYou = () => {
  return (
    <div className="px-4 py-4 bg-white">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-gray-800 font-medium">More Sellers Near You For</h3>
          <span className="text-indiamart-teal text-sm font-medium underline">Insulated Roofing Panels</span>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-3">
        <div className="flex items-start space-x-3">
          <div className="w-16 h-16 bg-indiamart-teal/10 rounded flex items-center justify-center">
            <div className="w-8 h-8 bg-indiamart-teal/20 rounded"></div>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-800 mb-1">0.40MM WALL PANELS</h4>
            <p className="text-sm text-gray-600 mb-2">₹ 1,000/Square Meter</p>
            <div className="flex items-center space-x-1 mb-1">
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">★ Arealfirma</span>
            </div>
            <p className="text-xs text-gray-500">9 Gujarat</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellersNearYou;
