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
const Profile = styled.div`
    width: 100%;
    height: 100px;
`;
const Button = styled.div`
    width: 100%;
    padding: 50px 20px;
    border-bottom: 1px solid ${(props) => props.theme.borderGrayColor};
    border-top: 1px solid ${(props) => props.theme.borderGrayColor};
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;

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
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const logoutFun = () => {
        localStorage.clear("guestToken");
    };

    return (
        <Container>
            <Header back="/guest/restaurantList" title={"마이 페이지"} />
            <Buttons>
                <Profile>프로필</Profile>
                {/* TODO : 프로필 정보 뿌리기 (myInfo) */}
                <Link style={{ textDecoration: "none", color: "inherit" }} to={"/guest/login"}>
                    <Button onClick={logoutFun}>로그아웃</Button>
                </Link>
            </Buttons>
            <Footer></Footer>
        </Container>
    );
};

export default MyPageHome;
