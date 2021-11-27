import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Nav = () => {
  const [navbar, setNavbar] = useState(false);
  const [logged, setLogged] = useState([]);

  const navigate = useNavigate();

  const changeColor = () => {
    // console.log(window.scrollY);
    if (window.scrollY > 15) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeColor);

  const logOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
    navigate("./");
  };

  useEffect(() => {
    const userLogged = localStorage.getItem("user");
    setLogged(JSON.parse(userLogged));
  }, []);

  return (
    <>
      <div className={navbar ? "navWrapperColor" : "navWrapper"}>
        <div className="signBtnDiv">
          {!logged ? (
            <button
              className={navbar ? "signBtnSrl" : "signBtn"}
              onClick={() => {
                navigate("/Sign");
              }}
            >
              تسجيل الدخول
            </button>
          ) : (
            <button
              className={navbar ? "signBtnSrl" : "signBtn"}
              onClick={logOut}
            >
              تسجيل الخروج
            </button>
          )}
        </div>
        <div className="logoDiv">
          <img
            src="./روح السعودية.png"
            className="logo"
            alt="logo"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="side">
          <img
            src={
              navbar
                ? "https://img.icons8.com/external-bearicons-glyph-bearicons/64/82bec5/external-User-essential-collection-bearicons-glyph-bearicons.png"
                : "https://img.icons8.com/external-bearicons-glyph-bearicons/64/ffffff/external-User-essential-collection-bearicons-glyph-bearicons.png"
            }
            className="userIcon"
            alt="sideicon"
            onClick={() => {
              navigate("/UserPage");
            }}
          />
        </div>
      </div>
    </>
  );
};
export default Nav;
