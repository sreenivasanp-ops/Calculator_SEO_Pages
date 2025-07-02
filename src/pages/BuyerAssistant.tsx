
import Header from '@/components/Header';

const BuyerAssistant = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <Header />
      
      {/* Main iframe content */}
      <div className="h-[calc(100vh-60px)] overflow-hidden relative">
        <div className="w-full h-full overflow-hidden relative">
          <iframe
            src="https://buyer-guide-rebuild.lovable.app/buyer-tools"
            className="w-full h-full border-0"
            title="Buyer Assistant Tools"
            scrolling="no"
            style={{
              marginTop: '-80px',
              height: 'calc(100% + 80px)',
              transform: 'scale(0.75)',
              transformOrigin: 'top left',
              width: '133.33%'
            }}
          />
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          html, body {
            overflow-x: hidden;
          }
          iframe {
            clip-path: inset(80px 0 0 0);
            max-width: none !important;
          }
        `
      }} />
    </div>
  );
};

export default BuyerAssistant;
