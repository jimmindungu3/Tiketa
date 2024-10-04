import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BuyTicket from "../components/BuyTicket";

const BuyTicketPage = ({events}) => {
  return (
    <div>
      <Navbar />
      <div className="-mt-36 bg-slate-50">
        <BuyTicket events={events}/>
      </div>
      <Footer />
    </div>
  );
};

export default BuyTicketPage;
