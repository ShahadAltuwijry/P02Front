import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import topvis from "./../روح السعودية/topvis.png";
import "./style.css";
// import { Zoom } from "react-slideshow-image";

const Description = () => {
  // const zoomInProperties = {
  //   indicators: true,
  //   scale: 0.5,
  // };
  // const location = useLocation();
  // const item = location.item;
  const [info, setInfo] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // const [images, setImages] = useState([]);

  useEffect(() => {
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInfo = async () => {
    const res = await axios.get(
      `https://visitsaudia-backend.herokuapp.com/spot/${id}`
    );
    setInfo(res.data);
    // setImages(res.data.slides);
  };

  console.log(info);

  return (
    <div className="descMainDiv">
      <img src={info.banner} alt={info.name} className="bannerImg" />
      <div className="descContDiv">
        <img src={topvis} alt="top" className="topImg" />
        <button
          className="backBtnDesc"
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src="https://img.icons8.com/material-rounded/24/000000/home.png"
            alt="key"
          />
        </button>

        <h1 className="descHead">{info.name}</h1>
        {/* <img className="displayImg" src={info.Img} alt={info.name} /> */}
        <h4 className="longDesc">{info.longDesc}</h4>
        <div className="descSlideDiv">
          <p className="descP">
            <b>
              لمزيد من التفاصيل:{" "}
              <a href={info.origLink} target="_blank">
                الذهاب الى الصفحة الرسمية للمنطقة
              </a>
            </b>
          </p>
          {/* <Zoom {...zoomInProperties}>
            {images.map((each, index) => (
              <div key={index} style={{ width: "100%" }}>
                <img
                  className="slider"
                  style={{ objectFit: "cover", width: "100%" }}
                  src={each}
                  alt="slider"
                />
              </div>
            ))}
          </Zoom> */}
        </div>
      </div>
    </div>
  );
};

export default Description;
