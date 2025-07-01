
const HairClips = () => {
  return (
    <div className="px-4 py-4 bg-white">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
          <div className="w-8 h-8 bg-gray-400 rounded"></div>
        </div>
        <div className="flex-1">
          <h3 className="text-gray-800 font-medium mb-2">Looking for Hair Clips?</h3>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter Quantity"
              className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm"
            />
            <select className="px-3 py-1.5 border border-gray-300 rounded text-sm bg-white">
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
