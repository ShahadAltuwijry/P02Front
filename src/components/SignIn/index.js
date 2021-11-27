import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./style.css";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState([]);

  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    console.log(userName);
    console.log(password);
    const res = await axios.post(
      "https://visitsaudia-backend.herokuapp.com/login",
      {
        userName: userName,
        password: password,
      }
    );

    console.log(res);

    // const signIn = (e) => {
    //   e.preventDefault();
    if (typeof res.data.user === "object") {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/UserPage");
    } else {
      Swal.fire({
        title:
          "اسم المستخدم او كلمة المرور خاطئة، الرجاء التأكد من المعلومات المدخلة",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      // navigate("/signin");
      // }
      // console.log(res.data.message);
      // setMessage(res.data.message);
    }
  };
  //   const user = await axios.get("http://localhost:5000/user");
  //   setAllUsers(user.data);
  //   // localStorage.setItem("users", JSON.stringify(allUsers));
  // };
  // // console.log(allUsers);

  // useEffect(() => {
  //   getUsers();
  // }, []);

  // const signin = (e) => {
  //   e.preventDefault();
  //   let exist = false;

  //   // eslint-disable-next-line
  //   allUsers.filter((user) => {
  //     if (user.userName === userName && user.password === password) {
  //       exist = true;
  //     }
  //   });
  //   if (exist) {
  //     const logData = {
  //       userName: userName,
  //       password: password,
  //     };

  //     localStorage.setItem("user", JSON.stringify(logData));
  //   }
  //   navigate("/UserPage");

  //   if (!exist) {
  //     Swal.fire({
  //       title:
  //         "اسم المستخدم او كلمة المرور خاطئة، الرجاء التأكد من المعلومات المدخلة",
  //       showClass: {
  //         popup: "animate__animated animate__fadeInDown",
  //       },
  //       hideClass: {
  //         popup: "animate__animated animate__fadeOutUp",
  //       },
  //     });
  //     navigate("/signin");
  //   }
  // };

  useEffect(() => {
    const userLogged = localStorage.getItem("user");
    setLogged(JSON.parse(userLogged));
  }, []);

  console.log(logged);
  return (
    <div className="loginWrapper">
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
      {!logged ? (
        <div className="innerDiv">
          <div className="showSignIn">
            <form>
              <input
                required
                type="text"
                name="userName"
                // value={userName}
                placeholder="ادخل اسم المستخدم"
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                required
                type="password"
                name="password"
                // value={password}
                placeholder="ادخل كلمة المرور"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="loginBtn" type="submit" onClick={signIn}>
                تسجيل الدخول
              </button>
              <br />
              <br />
              <a className="anchor" href="./SignUp">
                لا تملك حسابًا بعد؟
              </a>
            </form>
          </div>
        </div>
      ) : (
        navigate("/UserPage")
      )}
    </div>
  );
};

export default SignIn;
