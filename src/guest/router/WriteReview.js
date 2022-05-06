import React, { useEffect, useState } from "react";
import Container from "./Review";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Navigate } from "react-router";
import GlobalStyle from "../../GlobalStyle";

import "@fortawesome/fontawesome-free/js/all.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import { faCamera, faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as FaStarRegular } from "@fortawesome/free-regular-svg-icons";
import { url } from "../../Api";
// border: 1px solid black;
const token = localStorage.getItem("token");
const WriteReviewContainer = styled.div`
  width: 410px;
  height: 770px;
  position: relative;
  display: flex;
  flex-direction: column;
`;
const SubmitButton = styled.button`
  border: none;
  width: 410px;
  height: 80px;
  font-size: 15px;
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
  border-bottom: 1px solid ${(props) => props.theme.borderGrayColor};
  width: 220px;
  font-size: 18px;
  padding-top: 15px;
  padding-bottom: 15px;
  &:focus {
    outline: none;
  }
  display: flex;
  align-items: center;
`;
const ContentTextArea = styled.textarea`
  line-height: 25px;
  width: 220px;
  height: 200px;
  font-size: 14px;
  resize: none;
  border: none;
  //border-bottom: 1px solid ${(props) => props.theme.borderGrayColor};

  font-family: "Source Sans Pro", sans-serif;
  &:focus {
    outline: none;
  }
`;
const FormContainer = styled.div`
  padding-top: 40px;
  width: 100%;
  height: 90%;
  flex-direction: column;
  display: flex;
  align-items: center;
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
  width: 87%;
  height: 110px;
  //background-color: #ecf0f1;
  border-top: 1px solid ${(props) => props.theme.borderGrayColor};
  border-bottom: 1px solid ${(props) => props.theme.borderGrayColor};
  display: flex;
  overflow: auto;
  align-items: start;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  img {
    width: 70px;
    height: 70px;
    margin-left: 10px;
  }
`;
const Stars = styled.div`
  width: 60%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
  margin-bottom: 10px;
`;
const Star = styled.span`
  font-size: 25px;
  cursor: pointer;

  color: #fbc531;
`;
const FileIconContainer = styled.div`
  margin-left: 10px;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  cursor: pointer;

  background-color: rgba(0, 0, 0, 0.1);
  color: white;
`;
const File = styled.div`
  margin-left: 10px;
  display: flex;
  padding-top: 20px;
  width: 70px;
  height: 70px;

  img {
    width: 70px;
    height: 70px;
    box-sizing: border-box;
  }
`;
const FileIcon = styled.label`
  font-size: 20px;
  cursor: pointer;
`;
const ContentForm = styled.form`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & input,
  textarea {
    width: 90%;
  }
  height: 300px;
  color: ${(props) => props.theme.fontGrayColor};
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: white;
  color: black;
  padding: 5px 15px;
  font-size: 15px;
  border: 1px solid ${(props) => props.theme.borderGrayColor};
  /* /* position: absolute; */
  position: sticky;
  top: 0;
  font-weight: bold;
  z-index: 3;
  .icon {
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.manColor};
    }
    color: ${(props) => props.theme.mainColor};
  }
`;
const WriteReview = () => {
  const location = useLocation();
  const [reviewName, setReviewName] = useState("");
  const [reviewStar, setReviewStar] = useState("");
  const [reviewPw, setReviewPw] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [imgs, setImg] = useState([]);

  const [file, setFile] = useState([]);
  const [useFile, setUseFile] = useState([]);

  const [files, setFiles] = useState([]);

  const [star, setStar] = useState(0);
  console.log("location.state.marketId", location.state.marketId);
  // const [first,setFirst]= useState("☆");
  // const [second,setSecond]= useState("☆");
  // const [third,setThird]= useState("☆");
  // const [fourth,setFourth]= useState("☆");
  // const [fifth,setFifth]= useState("☆");
  const [session, setSession] = useState();
  const [stars, setStars] = useState([
    <FontAwesomeIcon icon="fa-regular fa-star" />,
    <FontAwesomeIcon icon="fa-regular fa-star" />,
    <FontAwesomeIcon icon="fa-regular fa-star" />,
    <FontAwesomeIcon icon="fa-regular fa-star" />,
    <FontAwesomeIcon icon="fa-regular fa-star" />,
  ]);
  let navigate = useNavigate();
  const onChangeReviewName = (e) => setReviewName(e.target.value);

  const onChangeReviewContent = (e) => setReviewContent(e.target.value);

  const starsToggle = (num) => {
    setReviewStar(num);
    switch (num) {
      case 1:
        setStars([
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon="fa-regular fa-star " />,
          <FontAwesomeIcon icon="fa-regular fa-star" />,
          <FontAwesomeIcon icon="fa-regular fa-star" />,
          <FontAwesomeIcon icon="fa-regular fa-star" />,
        ]);
        break;
      case 2:
        setStars([
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon="fa-regular fa-star" />,
          <FontAwesomeIcon icon="fa-regular fa-star" />,
          <FontAwesomeIcon icon="fa-regular fa-star" />,
        ]);
        break;
      case 3:
        setStars([
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon="fa-regular fa-star" />,
          <FontAwesomeIcon icon="fa-regular fa-star" />,
        ]);

        break;
      case 4:
        setStars([
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon="fa-regular fa-star" />,
        ]);

        break;
      case 5:
        setStars([
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
        ]);
        break;
    }
  };
  useEffect(() => {
    //console.log("getCookie", getCookie("JSESSIONID"));
    // console.log("documentcookie", document.cookie);
    //console.log("token", token);
    const getToken = localStorage.getItem("token");
    console.log(getToken);
  }, []);
  const countStar = () => {
    let temp = star + 1;
    setStar(star + 1);
  };
  const onChangeImage = (e) => {
    e.preventDefault();
    const img = e.target.files[0];

    const tempArr = [...imgs, img];
    setImg(tempArr);
    console.log("tempArr", tempArr);
    const prevFile = URL.createObjectURL(e.target.files[0]);
    setFile([...file, prevFile]);
    console.log("imgs: ", file);
    console.log("prevFile:", prevFile);
    e.target.value = "";
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("imgs", imgs);
    var axios = require("axios");

    const data = new FormData();
    const getToken = localStorage.getItem("token");

    console.log(
      "type",
      typeof reviewName,
      typeof parseFloat(reviewStar),
      typeof reviewContent
    );
    let content = {
      title: reviewName,
      star: parseFloat(reviewStar),
      content: reviewContent,
    };

    console.log(content);

    data.append(
      "review",
      new Blob([JSON.stringify(content)], { type: "application/json" })
    );

    imgs.map((img) => {
      data.append("image", img);
    });
    axios
      .post(
        url + `/fooding/restaurant/${location.state.marketId}/review`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            //"Content-Type": "application/json",
            Authorization: "Bearer " + getToken,
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setUseFile(file);
  }, [file]);
  return (
    <WriteReviewContainer>
      <Header>
        <div
          onClick={() => {
            navigate(-1);
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} className="icon" size="lg" />
        </div>
      </Header>

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
          <Star
            onClick={() => {
              starsToggle(1);
            }}
          >
            {stars[0]}
          </Star>
          <Star
            onClick={() => {
              starsToggle(2);
            }}
          >
            {stars[1]}
          </Star>
          <Star
            onClick={() => {
              starsToggle(3);
            }}
          >
            {stars[2]}
          </Star>
          <Star
            onClick={() => {
              starsToggle(4);
            }}
          >
            {stars[3]}
          </Star>
          <Star
            onClick={() => {
              starsToggle(5);
            }}
          >
            {stars[4]}
          </Star>
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
              <FileIcon htmlFor="image_input">
                {" "}
                <FontAwesomeIcon style={{ color: "white" }} icon={faCamera} />
              </FileIcon>
            </FileIconContainer>
          </ImageForm>

          <File>
            {useFile === undefined
              ? null
              : useFile.map((one) => (
                  <img style={{ objectFit: "cover" }} src={one} alt={one} />
                ))}
          </File>
        </ImageContainer>
        <ContentForm>
          <TypeInput
            type="text"
            placeholder="제목을 입력하세요"
            onChange={onChangeReviewName}
          />
          <br />

          <br />
          <ContentTextArea
            placeholder="내용을 입력하세요"
            onChange={onChangeReviewContent}
          />
          <br />
        </ContentForm>
      </FormContainer>

      <SubmitButton formEncType="multipart/form-data" onClick={submit}>
        입력
      </SubmitButton>
    </WriteReviewContainer>
  );
};

export default WriteReview;
