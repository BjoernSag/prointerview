import React, { useState, useEffect} from 'react'
import sortBy from 'lodash/sortBy'
import { Column, Table, AutoSizer, SortDirection} from 'react-virtualized'
import '../../reactVirtualisedStyles.css'
import Swipe from 'react-easy-swipe'
import styled from 'styled-components'
import Arrowleft from '../../icons/LeftArrowVector.svg'
import Arrowright from '../../icons/RightArrowThickerVector.svg'
import MobileOnIcon from '../../icons/clarity_mobile-phone-solid.svg'
import MobileOffIcon from '../../icons/DesktopIcon.svg'
// Table data as an array of objects

const Body = styled.div`
margin: 0 5px; 
padding-top: 100px;
`

const StyledContainer = styled.div`
  width:100%;
  
  max-width: 100%;
`

const StyledViewImg = styled.img`
  padding:8px;
  position: fixed;
  right: 10px;
  top: 30px;
  z-index:1000;
`

const StyledNavigationButtonRight = styled.img`
  position:fixed;
  right:0;
  margin-top:50%;
  z-index:1000;
`
const StyledNavigationButtonLeft = styled.img`
  position:fixed;
  left:0;
  margin-top:50%;
  z-index:1000;
`

const  TableView = ({isMobile, list, dataName, scrollToValue, scrollTo, uniqueValues}) => {
	const [sortByState, setsortByState] = useState('cropType')
	const [sortDirection, setSortDirection] = useState('ASC')
	const [sortedList, setSortedList] = useState(list)
	const [activeColumn, setActiveColumn] = useState('genetics')
	const [prevColumn, setPrevColumn] = useState(null)
	const [mobileView, setMobileView] = useState(isMobile)
	const [allColumns, setAllColumns] = useState(uniqueValues)

	/* The first sort. Sorts for Genetics if there exists any true values, as that is the most important variable */
	useEffect(() => {
		if(list.find(i => i['genetics'] === true)){
			const tempList = sortBy(list, item => item['genetics'])
			const sortedLists = tempList.reverse()
			setSortedList(sortedLists)
			setActiveColumn('genetics')
		}else {
			const tempList = sortBy(list, item => item[sortByState])
			const sortedLists = tempList.reverse()
			setSortedList(sortedLists)
		}
    
	}, [list])


	const StyledTable = styled.div`
  display:relative;
  padding-top: ${isMobile ? '20px' : '0'}
`

	const headerStyle = {
		textAlign: 'center',
		fontSize: '1rem',
		textTransform: 'uppercase',
		letterSpacing: '1px',
		padding: '30px 0',
	}

	const tableStyle={
		borderRadius: '10px',
		fontSize: '1rem',
		fontWeight: 'normal',
		border: 'none',
		borderCollapse: 'collapse',
		width: '100%',
		maxWidth: '100%',
		whiteSpace: 'nowrap',
		textAlign: 'center',
	}

	//Variables that changes during scrolling. Set it here instead of state to avoid reload 
	let prevScroll = null
	/* Detect when the user is scrolling */
	const userScrolls = (scrollFromTop) => {
		if(scrollFromTop === 0) {
			return null
		}
		if(scrollFromTop === scrollToValue) {
			return null
		}
		prevScroll = scrollFromTop

		var timer = null
		if(timer !== null){
			clearTimeout(timer)
		}
		timer = setTimeout(function() {
			setPrevColumn(prevScroll)
		}, 275)
    
	}

	/* Let the user swipe to change the active column */
	const swipeColumn = (input) => {
		let index = 0
		for(let i = 0; i<allColumns.length; i++){
			if(allColumns[i] === activeColumn){
				index = i
			}
		}
		/* On input change the active column(the column that is shown) and also set the scrollto
    scrollTo is a method from app.js, we set it here so we can remember where we have scrolled to as 
    the app reloads */
		if(input==='right') {
			if(index===allColumns.length-1) index=-1
			setActiveColumn(allColumns[index+1])
			scrollTo(prevScroll)
     
		}
		if(input==='left') {
			if(index===0) index=allColumns.length
			setActiveColumn(allColumns[index-1])
			scrollTo(prevScroll)
		}

	}

	/* Gets the variable e from the method in the table, and extracts the sortByState variable
  this is to allow us to sort on all the different variables. We can set variables to not sortable by editing the 
  values in "column"
  We update the different states as to the current values */
	const sort = (e) => {
		setsortByState(e.sortBy)
		const tempList = sortBy(list, item => item[sortByState])
		const sortedList = sortDirection===SortDirection.DESC ? tempList.reverse() : tempList
		setSortedList(sortedList)
		if(sortDirection === 'DESC') {
			setSortDirection('ASC')
		} else {
			setSortDirection('DESC')
		}
	} 

	/* Get the selected option from the select box and set the active column to that 
  option through updating state, therby updating the component and the site, so that it
  happens live */
	const selectedColumn = (e) => {
		let element = document.getElementById('selectBox')
		let activeElement = element.options[element.selectedIndex]
		setActiveColumn(activeElement.value)
	}


  

	// Render your table
	return(
		<Body>
			<StyledContainer>
				{/*Checks if it is mobile phone*/}
				{isMobile ?  
				/*Checks if it is mobile view(swipe) or the standard view (desktop)*/
					mobileView ? 
						<div>
							<StyledNavigationButtonRight onClick={() => swipeColumn('right')} width="30px" height="30px" src={Arrowright}/>
							<StyledNavigationButtonLeft onClick={() => swipeColumn('left')} width="30px" height="30px" src={Arrowleft}/>
							<select id='selectBox'>
								<option value='Field_1'>Field 1</option>
								<option value='Field_2'>Field 2</option>
							</select>
							<StyledViewImg color="white" height="70px" width="70px" src={MobileOnIcon} onClick={() => setMobileView(!mobileView)}/>
							<AutoSizer>
								{({ height, width }) => (
									<Swipe
										onSwipeLeft={() => swipeColumn('left')}
										onSwipeRight={() => swipeColumn('right')}
										//Tolereance to avoid oversensitivity
										tolerance = { 100 }>
										{/*the table here has only 2 columns and is swipable for ease of use for mobile phones*/}
              
										<StyledTable>
											<fieldset>
												<legend>{dataName}</legend>
												<Table id="table"
													width={width-35}
													height={allColumns.length*60}
													headerHeight={70}
													rowHeight={50}
													rowCount={sortedList.length}
													rowGetter={({ index }) => sortedList[index]}
													headerStyle={headerStyle}
													style={tableStyle}
													sort={(e) => sort(e)}
													sortBy={sortByState}
													sortDirection={sortDirection}
													//scroll and swipe, makes sure to remember the scroll position on swipe left or right
													onScroll={(e) => {
														if(e.scrollTop === scrollToValue) {
															return
														}else if(scrollToValue!==0 && e.scrollTop === 0) {
															return 
														}else {
															userScrolls(e.scrollTop)
														}
													}
													}
													scrollTop={prevColumn!==null ? prevColumn : scrollToValue}
												>
													<Column
														label='genetics'
														dataKey='genetics'
														width={200}
            
													/>
													<Column
														width={200}
														label={activeColumn}
														dataKey={activeColumn}
													/>
												</Table>
												<h2>Hei</h2>
											</fieldset>
										</StyledTable>
									</Swipe> 
								)}
							</AutoSizer>
						</div>
					//If it's not mobileView then no need to show the "choose column box" and instead we show
					//the desktop view with all columns. We don't use Autosizer here and instead just count the 
					//amount of columns * the size and use that as width, since we want to be able to scroll sideways
						: 
						<div>
							<StyledViewImg height="30px" width="30px" src={MobileOffIcon} onClick={() => setMobileView(!mobileView)}/>
							<StyledTable>
								<fieldset>
									<legend>{dataName}</legend>
									<Table
										width={allColumns.length*150}
										height={allColumns.length*60}
										headerHeight={70}
										rowHeight={50}
										rowCount={sortedList.length}
										rowGetter={({ index }) => sortedList[index]}
										headerStyle={headerStyle}
										style={tableStyle}
										sort={(e) => sort(e)}
										sortBy={sortByState}
										sortDirection={sortDirection}
										//map through all the columns to show them all
									>
										{allColumns.map(i => 
											<Column label={i}
												dataKey={i}
												width={(150)}
											/>)}
									</Table>
								</fieldset>
							</StyledTable>
						</div>

          
				//If it's not "isMobile" then do show the desktop version(difference is AutoSizer, so is
				// always 100% width)
					: ''}
				{!isMobile ? <AutoSizer>
					{({ height, width }) => (
						<StyledTable>
							<fieldset>
								<legend>{dataName}</legend>
								<Table
									width={(window.screen.width*0.8)-50}
									height={allColumns.length * 60}
									headerHeight={70}
									rowHeight={50}
									rowCount={sortedList.length}
									rowGetter={({ index }) => sortedList[index]}
									headerStyle={headerStyle}
									style={tableStyle}
									sort={(e) => sort(e)}
									sortBy={sortByState}
									sortDirection={sortDirection}
									//map through all the columns to show them all
								>
									{allColumns.map(i => 
										<Column label={i}
											dataKey={i}
											width={(window.screen.width/allColumns.length)}
										/>)}
								</Table>
							</fieldset>
						</StyledTable>
					)}
				</AutoSizer>
					: '' }
			</StyledContainer>
		</Body>
	)
}

export default TableView