import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Logos from '../components/Logos';
import Search from "./Search";

function HomePage() {
  return (
    
     <div className="px-32">
     
      <Navbar />
     	  
      <Search />
  
      <Footer />

      <Logos />

    </div>

  );

}

export default HomePage;