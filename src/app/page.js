import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import HowToOrder from "@/components/HowToOrder";
import DeliverySection from "@/components/DeliverySection";
import DeliveryApps from "@/components/DeliveryApps";
import BrandStory from "@/components/BrandStory";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import MobileCartBar from "@/components/MobileCartBar";

export default function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Hero />
        <Menu />
        <HowToOrder />
        <DeliverySection />
        <DeliveryApps />
        <BrandStory />
      </main>
      <Footer />
      <MobileCartBar />
      <CartDrawer />
    </>
  );
}
