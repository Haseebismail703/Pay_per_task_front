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
  let user = JSON.parse(localStorage.getItem('user') || '{}');
  const isEmptyUser = Object.keys(user).length === 0;

  return (
    <>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Features />
      <TaskCategories />
      <FAQs />
      {isEmptyUser && <CallToAction />}
      <Footer />
    </>
  );
};

export default HomePage;
