
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

const BuyerAssistant = () => {
  const handleTMTBarClick = () => {
    window.open('https://buyer-guide-rebuild.lovable.app/tmt-bar', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <Header />
      
      {/* TMT Bar Button Section */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            onClick={handleTMTBarClick}
            className="bg-indiamart-teal hover:bg-indiamart-teal/90 text-white px-6 py-2"
          >
            TMT Bar
          </Button>
        </div>
      </div>
      
      {/* Main iframe content */}
      <div className="h-[calc(100vh-120px)] overflow-hidden relative">
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
