
const HairClips = () => {
  return (
    <div className="px-4 py-4 bg-white">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
          <img 
            src="/lovable-uploads/96e2545c-7f74-496c-bfc8-9d2f84cfd371.png" 
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
