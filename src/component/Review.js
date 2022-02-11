import React, { useEffect, useState } from "react";

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

  return <div>{content}ddd</div>;
};

export default Review;
