import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset};
body {
    /* display: flex;
    justify-content: center; 
     align-items: center; */
    /*border: 1px solid #e4e2e1;*/
    
    /* height: 600px;   
  width:100%;
  background-color:orange;
   */
  }
* {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
