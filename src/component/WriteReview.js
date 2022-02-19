import React, { useEffect, useState } from "react";
import Container from "./Review";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { Navigate } from "react-router";
import GlobalStyle from "../GlobalStyle";
import Header from "./Header";

const WriteReviewContainer = styled.div`
  border: 1px solid black;
  width: 350px;
  height: 600px;
  position: relative;
  display: flex;
`;
const SubmitButton = styled.button`
  border: none;
  width: 350px;
  height: 80px;
  position: absolute;
  bottom: 0px;
  background-color: ${(props) => props.theme.mainColor};
  font-family: "Source Sans Pro", sans-serif;

  color: white;
  &:hover {
    cursor: pointer;
  }
`;
const TypeInput = styled.input`
  border: none;
  border-bottom: 1px solid gray;
  width: 220px;
  font-size: 25px;
  padding-top: 15px;
  &:focus {
    outline: none;
  }
`;
const ContentTextArea = styled.textarea`
  width: 220px;
  height: 200px;
  font-size: 20px;
  resize: none;
  border: none;
  border-bottom: 1px solid gray;
  padding-top: 15px;
  font-family: "Source Sans Pro", sans-serif;
  &:focus {
    outline: none;
  }
`;
const FormContainer = styled.div`
  padding-top: 40px;
  width: 100%;
  height: 90%;
  flex-direction:column;
  display: flex;
  align-items:center;
 
`;
const ImageForm = styled.form`
input[type="file"] {
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: none;
}

`;
const ImageContainer = styled.div`
  width:100%;
  height:110px;
  background-color: ${(props) => props.theme.mainColor};
  display:flex;
  align-items:start;
  img {
    width:70px;
    height:70px;
    margin-left:10px;
    
  }
 
`;
const Stars = styled.div`
  width:100%;
  height:50px;
   display:flex;
 
  justify-content:space-evenly;
  margin-bottom:10px;
  border-bottom:solid 1px gray;
  `;
const Star = styled.span`
  font-size:30px;
  cursor:pointer;
`;
const FileIconContainer = styled.div` 
margin-left:10px;
  width:70px;
  height:70px;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:white; 
  cursor:pointer;
`;
const File = styled.div`
  margin-left:10px;
  
  padding-top:20px;
  width:70px;
  height:70px;
 img{
  width:70px;
  height:70px;
 }
`;
const FileIcon = styled.label`
  font-size:20px;
  cursor:pointer;
`;
const WriteReview = () => {
  const [reviewName, setReviewName] = useState("");
  const [reviewStar, setReviewStar] = useState("");
  const [reviewPw, setReviewPw] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [img, setImg] = useState();
  const [file, setFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  
  const [star,setStar] = useState(0);

  // const [first,setFirst]= useState("☆");
  // const [second,setSecond]= useState("☆");
  // const [third,setThird]= useState("☆");
  // const [fourth,setFourth]= useState("☆");
  // const [fifth,setFifth]= useState("☆");
 
  const [stars,setStars] = useState(["☆","☆","☆","☆","☆"]);
  let navigate = useNavigate();
  const onChangeReviewName = (e) => setReviewName(e.target.value);
  
  const onChangeReviewPw = (e) => setReviewPw(e.target.value);
  const onChangeReviewContent = (e) => setReviewContent(e.target.value);
  // const popup=(e)=>{
  //   let setPassword = prompt("비밀번호 입력","");
  //   setReviewPw(setPassword);
  //   submit(e);
  //   navigate("/review");
    // }
//     const star1Toggle = (e) =>{
//       e.preventDefault();
//       setFirst("★");
//       countStar();
      
//     }
//     const star2Toggle = (e) =>{
//       e.preventDefault();
//       setSecond("★");
//       countStar();
//     }
//     const star3Toggle = (e) =>{
//       e.preventDefault();
//       setThird("★");
//       countStar();
//     }
//     const star4Toggle = (e) =>{
//       e.preventDefault();
//       setFourth("★");
//       countStar();
//     }
//     const star5Toggle = (e) =>{
//       e.preventDefault();
//       setFifth("★");
//       countStar();
// }
const starsToggle = (num)=>{

  setReviewStar(num);
  switch(num){
    case 1:
      setStars(["★","☆","☆","☆","☆"]);
    break;
    case 2:
      setStars(["★","★","☆","☆","☆"]);
      break;
    case 3:
      setStars(["★","★","★","☆","☆"]);
    
      break;
    case 4:
      setStars(["★","★","★","★","☆"]);
    
    break;
    case 5:
      setStars(["★","★","★","★","★"]);
      break;
  }
}

    const countStar = ()=>{
      let temp = star+1;
      setStar(star+1);
    }
  const onChangeImage = (e) => {
    e.preventDefault();
    const img = e.target.files[0];
    console.log("img: ", img);
    setImg(img);
    const prevFile = URL.createObjectURL(e.target.files[0]);
    setFile(prevFile);
    console.log("prevFile:", prevFile);
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(img);
    var axios = require("axios");
    /*   var data = JSON.stringify({
      name: reviewName,
      star: reviewStar,
      password: reviewPw,
      content: reviewContent,
      image: "a;slkdfjas;lkdjf;laskdjf;laksjdf;laksjdf;lkj//asdfalsdk",
    }); */

    const data = new FormData();

    let content = {
      content: reviewContent,
      star: reviewStar,
      password: reviewPw,
      name: reviewName,
    };
    data.append(
      "request",
      new Blob([JSON.stringify(content)], { type: "application/json" })
    );

    data.append("image", img);
    axios
      .post("http://13.124.207.219:8080/sample_project/members", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    
  };

  return (
    <WriteReviewContainer>
      <Header title={"리뷰 쓰기"} />
      <FormContainer>
      
          {/* <TypeInput
            type="text"
            placeholder="별점"
            onChange={onChangeReviewStar}
          /> */}
          <Stars>
          {/* <Star onClick={star1Toggle}>{first}</Star> 
          <Star onClick={star2Toggle}>{second}</Star>
          <Star onClick={star3Toggle}>{third}</Star>
          <Star onClick={star4Toggle}>{fourth}</Star>
          <Star onClick={star5Toggle}>{fifth}</Star>
           */}
          <Star onClick={()=>{starsToggle(1)}}>{stars[0]}</Star> 
          <Star onClick={()=>{starsToggle(2)}}>{stars[1]}</Star>
          <Star onClick={()=>{starsToggle(3)}}>{stars[2]}</Star>
          <Star onClick={()=>{starsToggle(4)}}>{stars[3]}</Star>
          <Star onClick={()=>{starsToggle(5)}}>{stars[4]}</Star>
          
          </Stars>
        
      <ImageContainer>

        <ImageForm>
            <input
              id="image_input"
              type="file"
              accept="image/jpg,image/png,image/jpeg,image/gif"
              name="photo"
              onChange={onChangeImage}
            />
             <FileIconContainer>
               <FileIcon for="image_input">📸</FileIcon>             
             </FileIconContainer> 
          </ImageForm>
        
          <File>
         {(file===undefined) ?  null :<img src={file} alt="image" />}
        </File> 
      </ImageContainer>
        <form>
          <TypeInput
            type="text"
            placeholder="이름"
            onChange={onChangeReviewName}
          />
        
          
          <br />
          <TypeInput
            type="text"
            placeholder="비밀번호"
            onChange={onChangeReviewPw}
          />
          <br />
          <ContentTextArea
            placeholder="내용을 입력하세요"
            onChange={onChangeReviewContent}
          />
          <br />
         
        </form>
       
      </FormContainer>

      <SubmitButton formEncType="multipart/form-data" onClick={submit}>
        전송
      </SubmitButton>
    </WriteReviewContainer>
  );
};

export default WriteReview;