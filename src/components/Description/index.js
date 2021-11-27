import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
        <button
          className="backBtn"
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
        <img className="displayImg" src={info.Img} alt={info.name} />
        <h3 className="longDesc">{info.longDesc}</h3>
        <div className="descSlideDiv">
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
