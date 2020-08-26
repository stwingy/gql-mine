import React from 'react'
import "./Footer.css"
import {IconContext} from "react-icons"
import {FaFacebook,FaTwitter,FaGithub,FaLinkedin} from "react-icons/fa"


  const StyledIcon = ({children,colour}) => {
    return (
     <IconContext.Provider value={{ style: {fontSize: '30px', color: colour, marginTop:"1em"}}}>
         <div>
         {children}
         </div>
      </IconContext.Provider>
    )
  }

function Footer() {
    return (
        <div className = "footer">
          <StyledIcon colour ="#3b5998">
          <FaFacebook />
          </StyledIcon>
          <StyledIcon colour ="rgb(0, 123, 255)">
          <FaTwitter />
          </StyledIcon>
          <StyledIcon colour ="#211F1F">
          <FaGithub />
          </StyledIcon>
          <StyledIcon colour =" #0e76a8">
          <FaLinkedin />
          </StyledIcon>
        
            
        </div>
    )
}
export default Footer