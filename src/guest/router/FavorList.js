import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/js/all.js";
import { url } from "../../Api";
import axios from "axios";
import Restaurant from "../component/Restaurant";
import Footer from "../component/Footer";

const Container = styled.div`
  width: 410px;
  height: 100vh; 
  /* 770px */
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;

  overflow: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Bookmarks = styled.div`
  display: flex;

  height: 85vh;
  /* 635px; */
  padding: 0px 10px;
`;

const CancelBtnBox = styled.div`
  display: flex;
  align-items: center;

  button {
    background: none;
    border: none;
    /* border: 1px solid red; */
    color: ${(props) => props.theme.fontGrayColor};
    padding: 5px 6px;
    font-size: 19px;
    cursor: pointer;
  }
`;
const ListContainer = styled.div`
  width: 390px;
  /* 410,770 */
  /* height: 645px; */
  /* background-color:red; */
  height: 85vh;
  /* display:flex; */

  overflow: auto;
  /* display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(120px, 1fr));
  grid-template-rows: masonry; */
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
const BoomarkContainer = styled.div`
  height: 300px;
`;
const CloseBtnContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex-end;

  position: relative;
  .btn {
    position: absolute;
    right: 10px;
  }
`;
const FavorList = () => {
  const [bookmarks, setBookmarks] = useState();
  const getToken = localStorage.getItem("guestToken");

  useEffect(() => {
    var config = {
      method: "get",
      url: url + `/fooding/mypage/bookmark`,
      headers: {
        Authorization: "Bearer " + getToken,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setBookmarks(response.data.content);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Header back="/guest/myPage" title={"즐겨찾기"} />
      <Bookmarks>
        <ListContainer>
          {bookmarks?.map((content, index) => {
            return (
              <Link
                to={`/guest/${content.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
                key={index}
              >
                <Restaurant content={content} bookmark={true} />
              </Link>
            );
          })}{" "}
        </ListContainer>
      </Bookmarks>
      <Footer></Footer>
    </Container>
  );
};

export default FavorList;
