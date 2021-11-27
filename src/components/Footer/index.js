import React from "react";
import "./style.css";
import footerimg from "./../روح السعودية/footer.png";

const Footer = () => {
  return (
    <div className="footerWrapper">
      <div className="staDiv">
        <a href="https://sta.gov.sa/" target="_blank" rel="noreferrer">
          <img src="./sta.png" className="sta" alt="footer" />
        </a>
      </div>
      {/* <p className="rights">
        Copyright © 2021 Saudi Tourism Authority. All rights reserved
      </p> */}

      <div className="patternDiv">
        <img src={footerimg} className="footerImg" alt="footer img" />
      </div>
    </div>
  );
};

export default Footer;
