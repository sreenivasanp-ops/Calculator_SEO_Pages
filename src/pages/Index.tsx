
import Header from '@/components/Header';
import Categories from '@/components/Categories';
import HairClips from '@/components/HairClips';
import VerifiedSellers from '@/components/VerifiedSellers';
import SellersNearYou from '@/components/SellersNearYou';
import CoinDCXBanner from '@/components/CoinDCXBanner';
import BottomNavigation from '@/components/BottomNavigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      <Categories />
      <HairClips />
      <VerifiedSellers />
      <SellersNearYou />
      <CoinDCXBanner />
      <BottomNavigation />
    </div>
  );
};

export default Index;
