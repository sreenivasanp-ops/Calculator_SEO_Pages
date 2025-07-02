
import Header from '@/components/Header';

const BuyerAssistant = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="h-[calc(100vh-60px)]">
        <iframe
          src="https://buyer-guide-rebuild.lovable.app/buyer-tools"
          className="w-full h-full border-0"
          title="Buyer Assistant Tools"
        />
      </div>
    </div>
  );
};

export default BuyerAssistant;
