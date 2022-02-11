import React, { useState } from "react";
import Container from "./Review";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { Navigate } from "react-router";
import GlobalStyle from "../GlobalStyle";

const WriteReviewContainer = styled.div`
  border: 1px solid black;
  width: 350px;
  height: 600px;
  position: relative;
  display:flex;
`;
const SubmitButton = styled.button`
  border:none;
  width:350px;
  height:80px;
  position:absolute;
  bottom:0px;
  background-color: ${(props) => props.theme.mainColor};
  font-family: 'Source Sans Pro', sans-serif;
  font-size:25px;
  color:white;
  &:hover{
    cursor:pointer;
  }
`;
const TypeInput = styled.input`
  border:none;
  border-bottom:1px solid gray;
  width:220px;
  font-size:25px;
  padding-top:15px;
  &:focus{
    outline:none;
  }
`;
const ContentTextArea = styled.textarea`
  width:220px;
  height:200px;
  font-size:20px;
  resize:none;
  border:none;
  border-bottom:1px solid gray;
  padding-top:15px;
  font-family: 'Source Sans Pro', sans-serif;
  &:focus{
    outline:none;
  }
`;
const FormContainer = styled.div`
  padding-top:70px;
  width:90%;
  height:80%;
  display:flex;
  justify-content:center;
`;
const WriteReview = () => {
  const [reviewName,setReviewName] = useState("");
  const [reviewStar,setReviewStar] = useState("");
  const [reviewPw,setReviewPw] = useState("");
  const [reviewContent,setReviewContent] = useState("");
  let navigate = useNavigate();
  const onChangeReviewName = (e) => setReviewName(e.target.value);
  const onChangeReviewStar = (e) =>{
    const toNum = Number(e.target.value);
    setReviewStar(toNum);
  }
  const onChangeReviewPw = (e) => setReviewPw(e.target.value);
  const onChangeReviewContent = (e) => setReviewContent(e.target.value);
  // const popup=(e)=>{
  //   let setPassword = prompt("비밀번호 입력","");
  //   setReviewPw(setPassword);
  //   submit(e);
  //   navigate("/review");
  // }
  const submit=(e)=>{
    e.preventDefault();

    var axios = require('axios');
    var data = JSON.stringify({
      "name": reviewName,
      "star": reviewStar,
      "password": reviewPw,
      "content":reviewContent,
      "image": "a;slkdfjas;lkdjf;laskdjf;laksjdf;laksjdf;lkj//asdfalsdk"
    });
    var config = {
      method: 'post',
      url: 'http://13.124.207.219:8080/sample_project/members',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
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
          console.log("리뷰 get",JSON.stringify(response.data));
          navigate("/review");
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  return( <WriteReviewContainer>
    <FormContainer>
      <form>
        <TypeInput type="text" placeholder="이름" onChange={onChangeReviewName} /><br />     
        <TypeInput type="text" placeholder="별점" onChange={onChangeReviewStar} /><br />     
        <TypeInput type="text" placeholder="비밀번호" onChange={onChangeReviewPw} /><br />     
       <ContentTextArea placeholder="내용을 입력하세요" onChange={onChangeReviewContent} /><br /> 
      </form>
    </FormContainer> 
    <SubmitButton onClick={submit}>전송</SubmitButton>
  </WriteReviewContainer>);
};

export default WriteReview;
