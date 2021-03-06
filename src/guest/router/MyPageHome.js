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
      if (one === "KOREAN") result = "??????";
      else if (one === "JAPANESE") result = "??????";
      else if (one === "CHINESE") result = "??????";
      else if (one === "WESTERN") result = "??????";
      else if (one === "VIETNAM") result = "?????????";
      else if (one === "TAIWAN") result = "??????";
      else if (one === "SNACK") result = "??????";
      else if (one === "NOODLE") result = "?????????";
      else if (one === "BBQ") result = "?????????";
      else if (one === "PORK") result = "????????????";
      else if (one === "BEEF") result = "?????????";
      else if (one === "CHICKEN") result = "?????????";
      else if (one === "LAMB") result = "?????????";
      else if (one === "CAFE") result = "??????";
      else if (one === "DESSERT") result = "?????????";
      else if (one === "BAR") result = "???";
      else if (one === "PUB") result = "??????";
      changeFavor.push(result);
    });
    console.log("changeFavor", changeFavor);
    setChangeFavor(changeFavor);
  };
  return (
    <Container>
      <Header back="/guest/restaurantList" title={"?????? ?????????"} />
      <Buttons>
        <ProfileContainer>
          <Profile>
            <div
              className="infoContainer"
              style={{ borderBottom: "solid 3px #FF7B54" }}
            >
              <div style={{ color: "#FF7B54", fontWeight: "bold" }}>
                ????????????{" "}
              </div>
            </div>

            <div className="infoContainer">
              <div className="title">????????? </div>
              <div>{myInfo?.nickName}</div>
            </div>
            <div className="infoContainer">
              <div className="title">?????? </div>
              <div>{myInfo?.name}</div>
            </div>
            <div className="infoContainer">
              <div className="title">?????? </div>
              <div className="favorContainer">
                {changeFavor?.map((info, index) => {
                  return <div className="info">{info}</div>;
                })}
              </div>
            </div>
            <div className="infoContainer">
              <div className="title">?????? </div>
              <div>{myInfo?.sex ? "??????" : "??????"}</div>
            </div>
          </Profile>
        </ProfileContainer>
        {/* TODO : ????????? ?????? ????????? (myInfo) */}

        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/guest/login"}
        >
          <Button onClick={logoutFun}>????????????</Button>
        </Link>
      </Buttons>
      <Footer></Footer>
    </Container>
  );
};

export default MyPageHome;
