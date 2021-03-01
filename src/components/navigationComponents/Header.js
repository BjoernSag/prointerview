import React from 'react';
import styled from 'styled-components';
import Menu from 'react-burger-menu/lib/menus/slide';
import Navbar from './Navbar'


/* Using styled components to fully make these items modular
Don't have to delete any function specific css, just have to exhange
imports if we want to quickly change  

The bm specific css is for the burger button. We use the react-burger-menu
library for easy styling */

const HeaderDiv = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0%;
    background: #E1E1E1;
    height: 50px;
    width: 100%; 
    

    
/* Position and sizing of burger button */
.bm-burger-button {
  position: absolute;
  width: 36px;
  height: 30px;
  left: 20px;
  top: 1%;
}

/* Color/shape of burger icon bars */
.bm-burger-bars {
  background: black;
}

/* Color/shape of burger icon bars on hover*/
.bm-burger-bars-hover {
  background: #a90000;
}

/* Position and sizing of clickable cross button */
.bm-cross-button {
  height: 24px;
  width: 24px;
}

/* Color/shape of close button cross */
.bm-cross {
  background: black;
}

/*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
.bm-menu-wrap {
  position: fixed;
  height: 100%;
}

/* General sidebar styles */
.bm-menu {
  font-family: 'Sanches', serif;
  background: #E1E1E1;
  font-size: 1.15em;
}

/* Morph shape necessary with bubble or elastic */
.bm-morph-shape {
  fill: #E1E1E1;
}

/* Wrapper for item list */
.bm-item-list {
  color: black;
}

/* Individual item */
.bm-item {
  display: inline-block;
  color:black;
}

/* Styling of overlay */
.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
}
`


const RightItem = styled.div`
  color:black;
  display: flex;
  justify-content: center;
  align-items: center;
  
`

const RightItemText = styled.div`
text-align: center;
padding: 0 10px;
`


const HeaderDivDesktop = styled.div`
display: flex;
    justify-content: space-between;
    margin: 0%;
  background:#E1E1E1;
`

/* Return the header. Use a imported menu component
Use the navbar as child of that 
Check if we are on a mobile or not and return the burger menu if we are.*/
function Header({isMobile}) {
  return <HeaderDiv>
       {/* Set menu width for mobile to 50%. this is the menu that opens if you click the burger icon */}
        <Menu width= {'50%'}>
            <Navbar isMobile={isMobile}/>
        </Menu>
        <RightItem><RightItemText>Business name</RightItemText></RightItem>
      </HeaderDiv>
}

export default Header;
