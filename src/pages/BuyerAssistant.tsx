
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
          style={{
            marginTop: '-50px',
            height: 'calc(100% + 50px)'
          }}
        />
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
          iframe {
            clip-path: inset(50px 0 0 0);
          }
        `
      }} />
    </div>
  );
};

export default BuyerAssistant;
