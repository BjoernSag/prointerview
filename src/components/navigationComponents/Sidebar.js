import React from 'react'
import styled from 'styled-components'
import Navbar from './Navbar'




const DivDesktop = styled.div`
padding: 0 5px;
background: #E1E1E1;
height: 100vh;
`

/* Return the header. Use a imported menu component
Use the navbar as child of that 
Check if we are on a mobile or not and return the burger menu if we are.*/
function Sidebar({isMobile}) {
	return  <DivDesktop>
		<h4>Business name</h4>
		<Navbar isMobile={isMobile}/>
	</DivDesktop>
}

export default Sidebar
