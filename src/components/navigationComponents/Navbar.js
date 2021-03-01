import React from 'react'
import styled from 'styled-components'



/* Using styled components to fully make these items modular
Don't have to delete any function specific css, just have to exhange
imports if we want to quickly change  */
const ContainerDivMobile = styled.div`

    font-size: 18px;
`
const ContainerDiv = styled.div`
`
const LinkDiv = styled.div`
border-bottom: 0.2px solid black; 
height: 25px;
`
const StyledLink = styled.a`
    text-decoration: none;
    color: black;
    &:hover {
        color:red;
        cursor:pointer;
    }
    `
/* A function to render the navbar. Use the react router to navigate in the app
use styled components to add some style and css to it 

The moonIcon is for a future night mode feature and doesn't have any functionality now*/
function Navbar({isMobile}) {
	return isMobile ? 
		<ContainerDivMobile>
			<h4>Business Name</h4>
			<LinkDiv className="menu-item"><StyledLink >Analysis</StyledLink></LinkDiv>
			<LinkDiv className="menu-item"><StyledLink >Development</StyledLink></LinkDiv>
			<LinkDiv className="menu-item"><StyledLink >Financing</StyledLink></LinkDiv>
			<LinkDiv className="menu-item"><StyledLink >Settings and admin</StyledLink></LinkDiv>
		</ContainerDivMobile> : <ContainerDiv>
			<LinkDiv className="menu-item"><StyledLink>Analysis</StyledLink></LinkDiv>
			<LinkDiv className="menu-item"><StyledLink>Development</StyledLink></LinkDiv>
			<LinkDiv className="menu-item"><StyledLink >Financing</StyledLink></LinkDiv>
			<LinkDiv className="menu-item"><StyledLink>Settings and admin</StyledLink></LinkDiv>
		</ContainerDiv>
}

export default Navbar
