
import Header from '@/components/Header';

const BuyerAssistant = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />
      <div className="h-[calc(100vh-60px)] overflow-hidden">
        <iframe
          src="https://buyer-guide-rebuild.lovable.app/buyer-tools"
          className="w-full h-full border-0"
          title="Buyer Assistant Tools"
          style={{
            marginTop: '-80px',
            height: 'calc(100% + 80px)'
          }}
        />
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
          iframe {
            clip-path: inset(80px 0 0 0);
          }
        `
      }} />
    </div>
  );
};

export default BuyerAssistant;
