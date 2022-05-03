import Header from "./component/Header";
import React, { useEffect, useState, useRef } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import { url } from "../Api";
import Menu from "./component/Menu";
import axios from "axios";
import MyCanvas from "./MyCanvas";
import NumericInput from "react-numeric-input";


const Container = styled.div`
width: 100%;
height: 1000vh;
display: flex;
flex-direction: column;
align-items: center;
margin: 70px 0px;
`;
const TableContainer = styled.div`
width:980px;
height:1000px;
background-color:red;
`;
const CurrentTableState = () =>{


    return ( 
    <Container>
        <Header />    
        <TableContainer></TableContainer>
    </Container>)
}
export default CurrentTableState;