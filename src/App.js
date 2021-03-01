import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import LandscapeBreakpoint from './responsive_utilities/landscape_breakpoint'
import DesktopBreakpoint from './responsive_utilities/desktop_breakpoint'
import PhoneBreakpoint from './responsive_utilities/phone_breakpoint'
import Table from './components/helperComponents/Table'
import CropsTable from './components/helperComponents/CropsTable'
import Header from './components/navigationComponents/Header'
import Sidebar from './components/navigationComponents/Sidebar'
import { Formik, Field, Form, ErrorMessage } from 'formik';

const DesktopContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
`
const Tables = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`
const RowForm = styled.form`
  
`
const RowFormButton = styled.button `
  margin-top: 380px;
`


/* Mocked data */
const rows = [
	{ id: 1, field_id: 1, crop_type_id: 1, genetics: "Auburn Super", in_row_spacing: 12, row_length: 500, tree_count: 42 },
	{ id: 2, field_id: 1, crop_type_id: 1, genetics: "Sleeping Giant", in_row_spacing: 12, row_length: 500, tree_count: 42 },
	{ id: 3, field_id: 1, crop_type_id: 2, genetics: "Blackcomb", in_row_spacing: 6, row_length: 300, tree_count: 50 },
	{ id: 4, field_id: 1, crop_type_id: 2, genetics: "Cheakamus", in_row_spacing: 6, row_length: 300, tree_count: 50 }
]



const crops = [
	{ id: 1, name: "Chinese Chestnut", genetics: ["Auburn Super", "Sleeping Giant"] },
	{ id: 2, name: "Blackcurrent", genetics: ["Blackcomb", "Cheakamus"] }
]
/* Find the keys of crops data */
const uniqueValuesCrops = crops[0] ? Object.keys(crops[0]) : []


function App() {
  const [scrollToValue, setScrollToValue] = useState(0)
  const [scrollToCropsValue, setScrollToCropsValue] = useState(0)
  const [showRow, showRowForm] = useState(false)
  const [newRows, setRows] = useState([])
  const [uniqueValuesRows, setUniqueValuesRows] = useState([])
  /* Set the name of the spreadsheet */
  let dataName = "Rows"
  let cropsDataName = "Crops"

  useEffect(() => {
     /* Create a new array combining the two jsons to get a better array */
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
    console.log('new', newTable)
    setRows(newTable)
    /* Find the keys of rows data */
    setUniqueValuesRows(newTable[0] ? Object.keys(newTable[0]) : [])
    
  }, [])
  
  
/* return the content specific to mobile */
  const mobileContent = (isMobile) => <div><Header isMobile={isMobile}/><Table list={newRows} 
  uniqueValues={uniqueValuesRows} isMobile={isMobile} scrollToValue={scrollToValue}
            dataName={dataName} scrollTo={(e) => setScrollToValue(e)}/></div>
  /* return the content specific to Desktop and Landscape 
    Returns a table, and also a form where the user can add new rows to the table
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
        inRowSpacing: '',
        treeCount: '',
        rowLength: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          /* Find the tree count and round up */
          values.treeCount = Math.ceil(values.rowLength/values.inRowSpacing)
          setRows(newRows.concat(values))
          setSubmitting(false);
        }, 400);
      }}
    ><Form>
    <label htmlFor="cropType">Crop Type</label>
    <Field name="cropType" as="select" className="my-select-cropType">
    <option value="chinese_chestnut">Chinese Chestnut</option>
    <option value="blackCurrent">Black current</option>
    </Field>

    <label htmlFor="genetics">Genetics</label>
    <Field name="genetics" as="select" className="my-select-genetics">
    <option value="auburn_Super">Auburn Super</option>
    <option value="sleeping_Giant">Sleeping Giant</option>
    <option value="blackcomb">Blackcomb</option>
    <option value="cheakamus">Cheakamus</option>
    </Field>

    <label htmlFor="inRowSpacing">Row Spacing</label>
    <Field name="inRowSpacing" type="text" />
    <ErrorMessage name="inRowSpacing" />
    <label htmlFor="rowLength">Tree Count</label>
    <Field name="rowLength" type="text" />
    <ErrorMessage name="rowLength" />

    <button type="submit">Submit</button>
  </Form>
  
  </Formik> : <div></div>}</div>
  {/* Returns the crops table*/}
            <CropsTable list={crops} 
              uniqueValues={uniqueValuesCrops} isMobile={isMobile} scrollToValue={scrollToCropsValue}
              dataName={cropsDataName} scrollTo={(e) => setScrollToCropsValue(e)}/>
          </Tables>
        </DesktopContent>

  if(uniqueValuesRows.length<1) return <h1>Loading...</h1>
  return (
    <div> 
      <PhoneBreakpoint>{mobileContent(true)}</PhoneBreakpoint>
      <LandscapeBreakpoint>{desktopContent(false)}</LandscapeBreakpoint>
      <DesktopBreakpoint>{desktopContent(false)}</DesktopBreakpoint>
    </div>
  )
}

export default App;
