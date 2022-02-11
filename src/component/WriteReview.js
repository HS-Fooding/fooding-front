import React, { useState } from "react";
const WriteReview = () => {
  const [reviewName,setReviewName] = useState("");
  const [reviewStar,setReviewStar] = useState("");
  const [reviewPw,setReviewPw] = useState("");
  const [reviewContent,setReviewContent] = useState("");
  
  const onChangeReviewName = (e) => setReviewName(e.target.value);
  const onChangeReviewStar = (e) =>{
    const toNum = Number(e.target.value);
    setReviewStar(toNum);
  }
  const onChangeReviewPw = (e) => setReviewPw(e.target.value);
  const onChangeReviewContent = (e) => setReviewContent(e.target.value);
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
       
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  return( <div>
    <form>
      Name<input type="text" onChange={onChangeReviewName} /><br />     
      Star<input type="text" onChange={onChangeReviewStar} /><br />     
      Password<input type="text" onChange={onChangeReviewPw} /><br /> 
      Content<textarea placeholder="내용을 입력하세요" onChange={onChangeReviewContent} /><br /> 
      <button onClick={submit}>전송</button></form>
      <div>{reviewContent}</div>
  </div>);
};

export default WriteReview;
