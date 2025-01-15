import React from "react";
import HeroSection from "./HomeCom/Hero";
import HowItWorks from "./HomeCom/Work";
import Features from "./HomeCom/Features";
import TaskCategories from "./HomeCom/TaskCategory";
import FAQs from "./HomeCom/Faq";
import CallToAction from "./HomeCom/CallToAction";
import Footer from "./HomeCom/Footer";
import Navbar from "./HomeCom/HomeNav";
const HomePage: React.FC = () => {
  return (
    <>
    <Navbar/>
      <HeroSection />
      <HowItWorks />
      <Features/>
      <TaskCategories/>
      <FAQs/>
      <CallToAction/>
      <Footer/>
    </>
  );
};

export default HomePage;
