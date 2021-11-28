import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./style.css";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [logged, setLogged] = useState([]);
  const navigate = useNavigate();

  const getUsers = async () => {
    const user = await axios.get(
      "https://visitsaudia-backend.herokuapp.com/users"
    );
    setAllUsers(user.data);
    // console.log(user.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const signUp = async (e) => {
    e.preventDefault();
    let exist = false;

    // eslint-disable-next-line
    allUsers.filter((user) => {
      if (user.userName === userName || user.email === email) {
        exist = true;
      }
    });

    if (exist) {
      Swal.fire({
        title: "اسم المستخدم او البريد مسجل مسبقاً، الرجاء تسجيل الدخول",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      navigate("/signin");
    }
    if (!exist) {
      const regData = {
        userName: userName,
        email: email,
        password: password,
      };
      // eslint-disable-next-line
      const res = await axios
        .post(`https://visitsaudia-backend.herokuapp.com/user`, regData)
        .then((res) => console.log(res));

      localStorage.setItem("user", JSON.stringify(regData));
      navigate("/");
    }
  };

  useEffect(() => {
    const userLogged = localStorage.getItem("user");
    setLogged(JSON.parse(userLogged));
  }, []);

  // this didnt work fix it!
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
          <div className="showSignUp">
            <form onSubmit={signUp}>
              <input
                required
                type="text"
                name="userName"
                value={userName}
                placeholder="ادخل اسم المستخدم "
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                required
                type="text"
                name="email"
                value={email}
                placeholder="ادخل الايميل"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                required
                type="password"
                name="password"
                value={password}
                placeholder="ادخل كلمة المرور"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="loginBtn" type="submit">
                تسجيل
              </button>
              <br />
              <br />
              <a className="anchor" href="./SignIn">
                هل تملك حسابًا بالفعل؟
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

export default SignUp;

/*const login = async () => {
    const res = await axios.post("http://localhost:5000/user", {
      useName: useName,
      password: password,
    });
    console.log(res);
    if (typeof res.data.user === "object") {
      localStorage.setItem("user", JSON.stringify({ user: res.data.user }));
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
                navigate("/signin");

      console.log(res.data.message);
      setMessage(res.data.message);
    }
  }; */
