import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "./../Nav";
import Header from "./../Header";
import Footer from "./../Footer";
import "./style.css";

const Home = () => {
  const [program, setProgram] = useState([]);
  const [spots, setSpots] = useState([]);
  const [spotInfo, setSpotInfo] = useState([{}]);
  const [logged, setLogged] = useState([]);
  const [addVisit, setAddVisit] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get(
      "https://visitsaudia-backend.herokuapp.com/programs"
    );
    const res2 = await axios.get(
      "https://visitsaudia-backend.herokuapp.com/spot"
    );

    setProgram(res.data);
    setSpots(res2.data);
  };
  //console.log(spots);

  const spotDetails = async () => {
    const det = await axios.get(
      `https://visitsaudia-backend.herokuapp.com/spot/${spots._id}`
    );
    setSpotInfo(det);
    
  };

  const visits = async (obejectId) => {
    try {
      const vis = await axios.put(
        `http://localhost:5000/add/${logged._id}/${obejectId}`
      );

      console.log(vis.data);

      localStorage.setItem("visits", JSON.stringify(vis.data.visits));

      setAddVisit(vis.data.visits);
    } catch (error) {
      console.log("visits error", error);
    }
  };

  // console.log(spotDetails);
  // console.log(spotInfo);

  useEffect(() => {
    const userLogged = localStorage.getItem("user");
    setLogged(JSON.parse(userLogged));
  }, []);

  return (
    <div className="homeWrapper">
      <Nav />
      <Header />
      <div className="contDiv">
        <div className="about">
          <div className="content">
            <div className="youtubeBg">
              <iframe
                width="510"
                height="330"
                src="https://www.youtube.com/embed/WNzYGeBbOUA"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <p className="Paragraph">
              <h1 className="homeHead">الشتاء_حولك#</h1>
              استكشف مجموعة مثيرة للاهتمام من الأنشطة والوجهات المناسبة لأشهر
              السنة الأكثر برودة. استمتع بمناخ البحر الأحمر مع شمس الشتاء
              والرمال، أو استكشف المنتزهات الوطنية في المملكة التي تمنحك الفرصة
              للاختباء من البرد قرب نيران المخيم الموقدة تحت نجوم الصحراء
              المتألقة
              <br />
              <br /> كما يمكنك التوجّه لزيارة المناطق الأكثر بردًا في جبال
              المملكة الشمالية للاستمتاع برؤية الثلوج البيضاء تفترش رمال
              الصحراء. مهما كان الخيار الذي تفضله لقضاء فصل الشتاء، توفّر لك
              المملكة العربية السعودية تجربة ممتعة بانتظارك.
            </p>
          </div>
        </div>
      </div>
      <div className="interiorDiv">
        <div className="interWordDiv">
          <h1 className="interiorHead"> هنا_السعودية#</h1>
          <p className="interP">
            استكشف أروع الأنشطة والوجهات لأكثر أشهر السنة برودة. عيش حماس موسم
            الرياض الأضخم من نوعه والمميز بفعالياته الترفيهية المناسبة للجميع.
            استمتع ما بين دفء البحر الأحمر ومغامراته المائية وما بين منتزهات
            المملكة <b>وكشتاتها الدافئة تحت النجوم. </b> ولمحبي التسلق، جبال
            المملكة بانتظاركم في الشمال مع أروع المناظر على صحاري الشاسعة
            المكسوة بالثلج. مهما كان خيارك المفضل في الشتاء، المملكة هي وجهتك.
          </p>

          <div className="spotCards">
            {spots.map((item, i) => (
              <div key={i} className="spotCard">
                <div className="spotImg">
                  <img
                    key={`img-${i}`}
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
            ))}
          </div>
        </div>
        <div className="interImgDiv">
          <img src="./الرياض.jpg" alt="rih" className="interImg" />
        </div>
      </div>
      <div className="saudiaVid">
        <h1 className="progHead">السعودية بعين سائح</h1>
        <iframe
          width="1195"
          height="515"
          src="https://www.youtube.com/embed/54XNkKUQkW8?controls=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="programsDiv">
        <h1 className="progHead">برامج الطيران</h1>
        <div className="cardsDiv">
          {program.map((item, i) => (
            <a
              key={i}
              href={item.origLink}
              target="_blank"
              className="exNavigateLink"
              rel="noreferrer"
            >
              <div key={i} className="card">
                <div className="imgWrapper">
                  <img
                    key={`img-${i}`}
                    src={item.img}
                    alt={`alula=${i}`}
                    className="cardImg"
                  />
                </div>
                <div className="progCont">
                  <h3 key={`prog name-${i}`}>{item.name}</h3>
                  <p className="cardParagraph" key={`desc-${i}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      {/* <div className="packagesDiv">
        <h1>packages</h1>
      </div>
      <div className="touristDiv">
        <h1>tourist spots</h1>
      </div> */}
      <Footer />
    </div>
  );
};

export default Home;
