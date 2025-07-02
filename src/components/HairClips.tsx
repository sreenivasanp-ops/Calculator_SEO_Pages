
const HairClips = () => {
  return (
    <div className="px-4 py-4 bg-white relative">
      {/* Top left triangle */}
      <div className="absolute top-0 left-0 w-0 h-0 border-l-[20px] border-l-blue-600 border-b-[20px] border-b-transparent"></div>
      
      {/* Bottom right triangle */}
      <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[20px] border-r-blue-600 border-t-[20px] border-t-transparent"></div>
      
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
          <img 
            src="/lovable-uploads/d3170d74-7fff-4b4d-95be-6f4a1ff06ace.png" 
            alt="Hair Clips"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-gray-800 font-medium mb-2">Looking for Hair Clips?</h3>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter Quantity"
              className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm min-w-0"
            />
            <select className="px-3 py-1.5 border border-gray-300 rounded text-sm bg-white flex-shrink-0">
              <option>Dozen</option>
              <option>Pieces</option>
              <option>Kg</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HairClips;
