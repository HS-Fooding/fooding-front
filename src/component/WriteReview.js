import React, { useState } from "react";
const WriteReview = () => {
  const [reviewContent,setReviewContent] = useState("");
  const onChangeReview = (e) =>{
    setReviewContent(e.target.value);
  }
  const submit=(e)=>{
    e.preventDefault();
    var axios = require('axios');
    var data = JSON.stringify({
      "name": "Friday",
      "star": 3.9,
      "password": "testpw",
      "content": "today is Friday",
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
      setReviewContent(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }




  return( <div>
    <form>
      <input type="text"  onChange={onChangeReview} value={reviewContent}  />
      <button onClick={submit}>전송</button></form>
      <div>{reviewContent}</div>
  </div>);
};

export default WriteReview;
