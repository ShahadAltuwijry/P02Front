import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./../Footer";
import Nav from "./../Nav";
import "./style.css";

const UserPage = () => {
  const [logged, setLogged] = useState([]);
  const [spots, setSpots] = useState([{}]);
  // const [newName, setNewName] = useState("");
  // const [newPass, setNewPass] = useState("");
  // const [newEmail, setNewEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userLogged = localStorage.getItem("user");
    setLogged(JSON.parse(userLogged));
  }, []);

  // const [spotInfo, setSpotInfo] = useState();
  const [addVisit, setAddVisit] = useState([]);

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   const res2 = await axios.get(
  //     "https://visitsaudia-backend.herokuapp.com/spot"
  //   );

  //   setSpots(res2.data);
  // };

  const visits = async (obejectId) => {
    try {
      const vis = await axios.put(
        `http://localhost:5000/add/${logged._id}/${obejectId}`
      );

      console.log(vis.data);

      localStorage.setItem("visits", JSON.stringify(vis.data.visits));

      setAddVisit(vis.data.visits);
      console.log(vis);
    } catch (error) {
      console.log("visits error", error);
    }
  };

  console.log(addVisit);

  useEffect(() => {
    const visitsAdded = JSON.parse(localStorage.getItem("visits"));
    setAddVisit(visitsAdded);
    // spotDetails(visitsAdded);
  }, []);

  // for (let i = 0; i < addVisit.length; i++) {
  //   console.log(addVisit[i]);
  // }

  // const spotDetails = async (array) => {
  //   for (let i = 0; i < array.length; i++) {
  //     console.log(array, "addvisit");
  //     // eslint-disable-next-line
  //     const vis = await axios.get(
  //       `https://visitsaudia-backend.herokuapp.com/spot/${array[i]}`
  //     );
  //     setSpots(...spots, vis);

  //     // console.log(vis);
  //   }
  // };
  // console.log(spots);

  // const spotDetails = async () => {
  //   for (let i = 0; i < addVisit.length; i++) {
  //     console.log(addVisit[i]);

  //     const details = await axios.get(
  //       `https://visitsaudia-backend.herokuapp.com/spot/${addVisit[i]}`
  //     );
  //     setSpots(details);
  //     console.log(spots);
  //   }
  // };
  // console.log(spots);

  const logOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
    navigate("./");
  };

  // const updateInfo = async () => {
  //   const res = await axios.put(`https://visitsaudia-backend.herokuapp.com/user/${logged._id}`, {
  //     newName: logged.userName,
  //     newEmail: logged.email,
  //     newPass: logged.password,
  //   });
  //   // console.log(res.data);

  //   localStorage.setItem("userEdit", JSON.stringify(res.data));
  // };

  return (
    <div className="userMainDiv">
      {/* <img src="./account-hero.png" alt="header" className="userHead" /> */}
      <Nav />
      {!logged ? (
        <div className="guestDiv">
          <h2 className="guestHead">
            :( ضيفنا الغالي، لا نملك معلومات كافية عنك لاظهار هذه الصفحة لك
          </h2>
          <br />
          <h3> !ابدأ رحلتك الممتعة معنا في السعودية عن طريق التسجيل </h3>
          <br />
          <a href="./signUp" className="anchorg">
            سجل الأن
          </a>
          <br />
          <h3>او اذا كان عندك حساب </h3>
          <br />
          <a href="./signin" className="anchorg">
            سجل دخولك
          </a>
        </div>
      ) : (
        <div className="userDiv">
          <div className="visitsDiv">
            <img src="./topvis.png" alt="user" className="userImg" />
            <h2 className="visitHead">زياراتي</h2>
            {spots ? (
              <div className="emptyVis">
                <h2>لا يوجد زيارات بعد</h2>
              </div>
            ) : (
              spots.map((item, i) => (
                <div key={i} className="spotCard">
                  <div className="spotImg">
                    <img
                      // key={`img-${i}`}
                      src={item.img}
                      alt={`spot=${i}`}
                      className="spotImg2"
                    />
                  </div>
                  <div className="spotCont">
                    <h3 className="spotName" key={i}>
                      {item.name}
                    </h3>
                    <div className="sideSpotDiv">
                      <p className="spotP">{item.description}</p>
                      <br />
                      <br />
                      <br />
                      <div className="spotBtns">
                        <button
                          className="spotBtn"
                          onClick={() => {
                            navigate(`/description/${item._id}`);
                          }}
                        >
                          المزيد من التفاصيل
                        </button>
                        {logged ? (
                          <button
                            className="addBtn"
                            onClick={() => visits(item._id)}
                          >
                            <img
                              className="addIcon"
                              src="https://img.icons8.com/ios-glyphs/60/000000/plus-math.png"
                              alt="button"
                            />
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="userInfo">
            <img src="./top.png" alt="user" className="userImg" />

            <div className="userNameDiv">
              <img src="./user.png" alt="userPhoto" className="userPhoto" />
              <h2 className="nameHead">{logged.userName}</h2>
              <h3 className="mailHead">{logged.email}</h3>
              <br />
              <div className="userBtnDiv">
                {/* <button className="editBtn">تعديل البيانات</button> */}
                <button className="outBtn" onClick={logOut}>
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserPage;
