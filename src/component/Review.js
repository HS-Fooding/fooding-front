import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";

const Container = styled.div`
  border: 1px solid black;
  width: 350px;
  height: 600px;
  position: relative;
`;

const WriteReviewBtn = styled.button`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.mainColor};
`;

const Review = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: `http://13.124.207.219:8080/sample_project/members`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setContent(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Header title={"리뷰목록"} />
      <div>{content}ddd</div>
      <WriteReviewBtn>리뷰 작성</WriteReviewBtn>
    </Container>
  );
};

export default Review;
