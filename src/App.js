import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import LandscapeBreakpoint from './responsive_utilities/landscape_breakpoint'
import DesktopBreakpoint from './responsive_utilities/desktop_breakpoint'
import PhoneBreakpoint from './responsive_utilities/phone_breakpoint'
import Table from './components/helperComponents/Table'
import CropsTable from './components/helperComponents/CropsTable'
import Header from './components/navigationComponents/Header'
import Sidebar from './components/navigationComponents/Sidebar'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const DesktopContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
`
const Tables = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`
const RowFormButton = styled.button `
  margin-top: 420px;
`


/* Mocked data */
const rows = [
	{ id: 1, field_id: 1, crop_type_id: 1, genetics: 'Auburn Super', in_row_spacing: 12, row_length: 500, tree_count: 42 },
	{ id: 2, field_id: 1, crop_type_id: 1, genetics: 'Sleeping Giant', in_row_spacing: 12, row_length: 500, tree_count: 42 },
	{ id: 3, field_id: 1, crop_type_id: 2, genetics: 'Blackcomb', in_row_spacing: 6, row_length: 300, tree_count: 50 },
	{ id: 4, field_id: 1, crop_type_id: 2, genetics: 'Cheakamus', in_row_spacing: 6, row_length: 300, tree_count: 50 }
]

const crops = [
	{ id: 1, name: 'Chinese Chestnut', genetics: ['Auburn Super', 'Sleeping Giant'] },
	{ id: 2, name: 'Blackcurrent', genetics: ['Blackcomb', 'Cheakamus'] }
]




function App() {
	const [scrollToValue, setScrollToValue] = useState(0)
	const [scrollToCropsValue, setScrollToCropsValue] = useState(0)
	const [showRow, showRowForm] = useState(false)
	const [newRows, setRows] = useState([])
	const [uniqueValuesRows, setUniqueValuesRows] = useState([])
	const [newGenetics, setGenetics] = useState([])
	const [uniqueValuesGenetics, setUniqueValuesGenetics] = useState([])
	/* Set the name of the spreadsheets */
	let dataName = 'Rows'
	let cropsDataName = 'Genetics'

	/* On mount create the arrays */
	useEffect(() => {
		/* On mount create the rows array */
		const newTable = []
		for(let i = 0; i<rows.length; i++) {
			let newObject = {row:i, field: 1, cropType:'', genetics: '',
				inRowSpacing:rows[i].in_row_spacing,
				rowLength:rows[i].row_length, treeCount:rows[i].tree_count}
			newObject.row = i
			newObject.genetics = rows[i].genetics
			/* Find the id  of crops that corresponds to crop type id and find the name*/
			newObject.cropType =  crops.find(o => o.id === rows[i].crop_type_id).name
			newTable.push(newObject)
		}
		console.log('ewrows', newTable)
		setRows(newTable)
		/* Find the keys of rows data */
		setUniqueValuesRows(newTable[0] ? Object.keys(newTable[0]) : [])

		/* Create Genetics array */
		const newTableGenetics = []
		for(let i = 0; i<newTable.length; i++) {
			let newObject = {}
			/* Check if the genetics still exists and if it does then just add the rowLength and treeCount values */
			if(newGenetics.find(o => o.genetics === newTable[i].genetics)) {
				newObject = newGenetics.find(o => o.genetics === newTable[i].genetics)
				newObject.rowLength += newTable[i].rowLength
				newObject.treeCount += newTable[i].treeCount
			} else {
				newObject.genetics = newTable[i].genetics
				newObject.field = newTable[i].field
				newObject.cropType = newTable[i].cropType
				newObject.rowLength = newTable[i].rowLength
				newObject.treeCount = newTable[i].treeCount
			}
			newTableGenetics.push(newObject)
		}
		setGenetics(newTableGenetics)
		/* Find the keys of rows data */
		setUniqueValuesGenetics(newTableGenetics[0] ? Object.keys(newTableGenetics[0]) : [])
		
	}, [])


	/* Update the genetics table at the same time as we update the rows table, using the new row
  First we check if we already have the genetics, and if we do, then we just update the rowLength and treeLength
  If we don't we make a new array with the old genetics table and concatenate the new row to that
  Returns the new array with the data.
  
  */
	const updateGenetics = ( inputRow ) => {
		let newObject = {}
		let index = 0
		if(newGenetics.find(o => o.genetics === inputRow.genetics)) {
			newObject = newGenetics
			index = newObject.findIndex(o => o.genetics === inputRow.genetics)
			console.log('aaaa', newObject[index].rowLength, inputRow.rowLength)

			newObject[index].rowLength += inputRow.rowLength
			newObject[index].treeCount += inputRow.treeCount
			return newObject
      
		} else {
			newObject.genetics = inputRow.genetics
			newObject.field = inputRow.field
			newObject.cropType = inputRow.cropType
			newObject.rowLength = inputRow.rowLength
			newObject.treeCount = inputRow.treeCount
			return (newGenetics.concat(newObject))
		}
	}
  
	/* return the content specific to mobile */
	const mobileContent = (isMobile) => <div><Header isMobile={isMobile}/><Table list={newRows} 
		uniqueValues={uniqueValuesRows} isMobile={isMobile} scrollToValue={scrollToValue}
		dataName={dataName} scrollTo={(e) => setScrollToValue(e)}/></div>
	/* return the content specific to Desktop and Landscape 
    Returns a table, and also a form where the user can add new rows to the table

    Set new rows table from what we write in the add new row

    We use the formik form and do basic validation to ensure that the numbers are greater than 1.
    We don't want negative integers

    Onsubmit update both the tables with new values
  */
	const desktopContent = (isMobile) => <DesktopContent><Sidebar isMobile={isMobile}/>
		<Tables>
			<div><Table list={newRows} 
				uniqueValues={uniqueValuesRows} isMobil e={isMobile} scrollToValue={scrollToValue}
				dataName={dataName} scrollTo={(e) => setScrollToValue(e)}/>
			<RowFormButton onClick={() => showRowForm(!showRow)}> New Row +</RowFormButton>
			{showRow ? <Formik initialValues={{
				row: newRows.length+1,
				field: 1,
				cropType: '',
				genetics: '',
				inRowSpacing: 0,
				treeCount: 0,
				rowLength: 0,
			}}
			validationSchema={Yup.object({
				inRowSpacing: Yup.number().min(1),
				rowLength: Yup.number().min(1)
			})}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					/* TODO integrate this better, we add the next two lines as default for the select */
					if(values.cropType === '') values.cropType = 'Chinese Chestnut'
					if(values.genetics === '') values.genetics = 'Auburn Super'
					/* Find the tree count and round up */
					values.treeCount = Math.ceil(values.rowLength/values.inRowSpacing)
					setGenetics(updateGenetics(values))
					setRows(newRows.concat(values))
          
					setSubmitting(false)
				}, 400)
			}}
			>{({ values, setFieldValue }) =><Form>
					<label htmlFor="cropType">Crop Type</label>
					<Field name="cropType" as="select" className="my-select-cropType">
						<option value="Chinese Chestnut">Chinese Chestnut</option>
						<option value="Blackcurrent">Black current</option>
					</Field>

					<label htmlFor="genetics">Genetics</label>
          {values.cropType === 'Chinese Chestnut' ? 
            	<Field name="genetics" as="select" className="my-select-genetics">
              <option value="Auburn Super">Auburn Super</option>
              <option value="Sleeping Giant">Sleeping Giant</option>
            </Field> : <Field name="genetics" as="select" className="my-select-genetics">
						<option value="Blackcomb">Blackcomb</option>
						<option value="Cheakamus">Cheakamus</option>
					</Field>
          }
					

					<label htmlFor="inRowSpacing">Row Spacing</label>
					<Field name="inRowSpacing" type="number" />
					<ErrorMessage name="inRowSpacing" />
					<label htmlFor="rowLength">Tree Count</label>
					<Field name="rowLength" type="number" />
					<ErrorMessage name="rowLength" />

					<button type="submit">Submit</button>
				</Form>}
  
			</Formik> : <div></div>}</div>
			{/* Returns the crops table*/}
			<CropsTable list={newGenetics} 
				uniqueValues={uniqueValuesGenetics} isMobile={isMobile} scrollToValue={scrollToCropsValue}
				dataName={cropsDataName} scrollTo={(e) => setScrollToCropsValue(e)}/>
		</Tables>
	</DesktopContent>

	if(uniqueValuesRows.length<1 || uniqueValuesGenetics.length <1) return <h1>Loading...</h1>
	return (
		<div> 
			<PhoneBreakpoint>{mobileContent(true)}</PhoneBreakpoint>
			<LandscapeBreakpoint>{desktopContent(false)}</LandscapeBreakpoint>
			<DesktopBreakpoint>{desktopContent(false)}</DesktopBreakpoint>
		</div>
	)
}

export default App
