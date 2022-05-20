import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../component/Header";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/js/all.js";
import { url } from "../../Api";
import axios from "axios";
import Restaurant from "../component/Restaurant";

const Container = styled.div`
  width: 410px;
  height: 770px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid black;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Bookmarks = styled.div`
  display: flex;
 
  height: 800px;
  padding: 50px 10px;
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
  height: 670px;
  /* background-color:red; */
  margin-top: 45px;
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
  .Target-Element {
    width: 100vw;
    height: 120px;
    display: flex;
    justify-content: center;
    text-align: center;
   
  }
`;
const BoomarkContainer = styled.div`
 height:300px;
`;
const CloseBtnContainer = styled.div`
width:100%;
height:30px;
display:flex-end;

position:relative;
  .btn{
    position:absolute;
    right:10px;
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
      <Header back="/guest/myPage" title={"즐겨찾기 리스트"} />
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
})
        }  </ListContainer>
      </Bookmarks>
      
    </Container>
  );
};

export default FavorList;
