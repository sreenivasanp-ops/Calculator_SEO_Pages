
import { MessageCircle, FileText, ShoppingBag } from 'lucide-react';

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex items-center justify-around py-2">
        <button className="flex flex-col items-center py-2 px-4">
          <MessageCircle className="w-5 h-5 text-gray-600 mb-1" />
          <span className="text-xs text-gray-600">Messages</span>
        </button>
        <button className="flex flex-col items-center py-2 px-4">
          <FileText className="w-5 h-5 text-gray-600 mb-1" />
          <span className="text-xs text-gray-600">Post Requirement</span>
        </button>
        <button className="flex flex-col items-center py-2 px-4">
          <ShoppingBag className="w-5 h-5 text-gray-600 mb-1" />
          <span className="text-xs text-gray-600">Shopping</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;
