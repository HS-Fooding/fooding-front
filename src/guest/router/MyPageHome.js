import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import { Link } from "react-router-dom";
import { url } from "../../Api";

import "@fortawesome/fontawesome-free/js/all.js";
import Footer from "../component/Footer";
import axios from "axios";

const Container = styled.div`
  width: 410px;
  height: 100vh;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  justify-content: center;
`;

const Buttons = styled.div`
  display: flex;
  height: 85vh;
  flex-direction: column;
  justify-content: space-between;
  border-top: 1px solid ${(props) => props.theme.borderGrayColor};
  margin-left: 10px;
  margin-right: 10px;
`;
const ProfileContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
const Profile = styled.div`
  width: 95%;
  height: 300px;
  display: flex;
  flex-direction: column;

  .infoContainer {
    display: flex;

    height: 30px;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    justify-content: space-between;
    margin-bottom: 30px;
    .title {
      color: #ff7b54;
    }
    div {
      margin-right: 3px;
      height: 30px;
    }
    .favorContainer {
      height: 30px;
      font-size: 11px;
      display: flex;
      .info {
        display: inline;
        margin-right: 5px;
      }
    }
  }
`;
const Button = styled.div`
  width: 100%;
  padding: 50px 20px;
  /* border-bottom: 1px solid ${(props) => props.theme.borderGrayColor}; */
  border-top: 1px solid ${(props) => props.theme.borderGrayColor};
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
  color: ${(props) => props.theme.mainColor};

  div {
    svg {
      color: ${(props) => props.theme.fontGrayColor};
      margin-right: 7px;
    }
  }

  .icon {
    color: ${(props) => props.theme.borderGrayColor};
  }
`;

const MyPageHome = () => {
  const [myInfo, setMyInfo] = useState();
  const [changeFavor, setChangeFavor] = useState();
  useEffect(() => {
    const getToken = localStorage.getItem("guestToken");
    const config = {
      method: "get",
      url: url + `/fooding/mypage/myInfo`,
      headers: {
        Authorization: "Bearer " + getToken,
      },
    };
    axios(config)
      .then((res) => {
        console.log("data!!", res.data);
        setMyInfo(res.data);
        bringFavor(res.data.favor);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const logoutFun = () => {
    localStorage.clear("guestToken");
  };
  const bringFavor = (favorList) => {
    let changeFavor = [];
    let result;
    favorList.map((one, index) => {
      if (one === "KOREAN") result = "한식";
      else if (one === "JAPANESE") result = "일식";
      else if (one === "CHINESE") result = "중식";
      else if (one === "WESTERN") result = "양식";
      else if (one === "VIETNAM") result = "베트남";
      else if (one === "TAIWAN") result = "태국";
      else if (one === "SNACK") result = "분식";
      else if (one === "NOODLE") result = "면요리";
      else if (one === "BBQ") result = "바베큐";
      else if (one === "PORK") result = "돼지고기";
      else if (one === "BEEF") result = "소고기";
      else if (one === "CHICKEN") result = "닭고기";
      else if (one === "LAMB") result = "양고기";
      else if (one === "CAFE") result = "카페";
      else if (one === "DESSERT") result = "디저트";
      else if (one === "BAR") result = "바";
      else if (one === "PUB") result = "술집";
      changeFavor.push(result);
    });
    console.log("changeFavor", changeFavor);
    setChangeFavor(changeFavor);
  };
  return (
    <Container>
      <Header back="/guest/restaurantList" title={"마이 페이지"} />
      <Buttons>
        <ProfileContainer>
          <Profile>
            <div
              className="infoContainer"
              style={{ borderBottom: "solid 3px #FF7B54" }}
            >
              <div style={{ color: "#FF7B54", fontWeight: "bold" }}>
                개인정보{" "}
              </div>
            </div>

            <div className="infoContainer">
              <div className="title">닉네임 </div>
              <div>{myInfo?.nickName}</div>
            </div>
            <div className="infoContainer">
              <div className="title">이름 </div>
              <div>{myInfo?.name}</div>
            </div>
            <div className="infoContainer">
              <div className="title">취향 </div>
              <div className="favorContainer">
                {changeFavor?.map((info, index) => {
                  return <div className="info">{info}</div>;
                })}
              </div>
            </div>
            <div className="infoContainer">
              <div className="title">성별 </div>
              <div>{myInfo?.sex ? "남자" : "여자"}</div>
            </div>
          </Profile>
        </ProfileContainer>
        {/* TODO : 프로필 정보 뿌리기 (myInfo) */}

        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/guest/login"}
        >
          <Button onClick={logoutFun}>로그아웃</Button>
        </Link>
      </Buttons>
      <Footer></Footer>
    </Container>
  );
};

export default MyPageHome;
