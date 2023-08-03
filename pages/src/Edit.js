import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, CssBaseline, AppBar, Box, Paper, Avatar, Grid, Stack, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import { Pagination } from '@mui/material';
import {GridToolbar } from '@mui/x-data-grid';
import DrawerList from './components/DrawerList';
import Alert from '@mui/material/Alert';
import './edit.css';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';

const Edit = () => {
  const location = useLocation();

  const csvData = location.state && location.state.data;
  console.log(location.state, location.state.data);
  
  console.log(csvData); // checking data passed to the page
  const navigate = useNavigate();

  // State Management
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState(csvData); // State to store filtered data

  //Function to generate a unique id for each row
  const getRowIds = (row) => {
    return filteredData.indexOf(row); // Using the index of the row as a unique id
  };


  // Function to handle data change in the table
  const handleCellChange = (event, rowIndex, columnName) => {
    const newData = [...filteredData]; // Use filtered data for changes
    newData[rowIndex][columnName] = event.target.value;
    //console.log(newData); // You can see the updated data in the console
    setFilteredData(newData);
  };

  const columns = csvData
    ? Object.keys(csvData[0]).map((header) => ({
        field: header,
        headerName: header,
        flex: 1,
        sortable: true,
        editable: true,
        renderCell: (params) => (
          <div style={{ fontWeight: params.rowIndex % 2 === 0 ? 'bold' : 'normal', fontStyle: 'italic' }}>
            {params.value}
          </div>
        ),
      }))
    : [];
  // Table Header Management

  const renderTableHeader = () => {
    // Assuming the first row of your CSV contains headers
    const headers = Object.keys(csvData[0]);
    return headers.map((header, index) => (
      <TableCell key={index} style={{ backgroundColor: 'grey', color: 'white', textTransform: "uppercase" }}>
        {header}
      </TableCell>
    ));
  };

  // Table data Management
  const renderTableData = () => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return filteredData.slice(startIndex, endIndex).map((row, rowIndex) => {
      return (
        <TableRow key={getRowIds(row)}>
          {Object.entries(row).map(([columnName, cellData], cellIndex) => (
            <TableCell key={cellIndex} style={{border:'none'}}   onChange={(event) => handleCellChange(event, rowIndex + startIndex, columnName)}>
              
                {cellData}
              
              
            </TableCell>
          ))}
        </TableRow>
      );
    });
  };

  // Pagination page change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Submit button
  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleBackClick = () => {
    navigate('/'); // Navigate to the Upload page when the "Back" button is clicked
  };

 

  const column = [
  
    { field: 'name', headerName: 'Name', width: 180, editable: true },
  
    {
  
      field: 'age',
  
      headerName: 'Age',
  
      type: 'number',
  
      editable: true,
  
      align: 'left',
  
      headerAlign: 'left',
  
    },
  
    {
  
      field: 'dateCreated',
  
      headerName: 'Date Created',
  
      type: 'date',
  
      width: 180,
  
      editable: true,
  
    },
  
    {
  
      field: 'lastLogin',
  
      headerName: 'Last Login',
  
      type: 'dateTime',
  
      width: 220,
  
      editable: true,
  
    },
  
  ];
  
   
  
  const row = [
  
    {
  
      id: 1,
  
      name: randomTraderName(),
  
      age: 25,
  
      dateCreated: randomCreatedDate(),
  
      lastLogin: randomUpdatedDate(),
  
    },
  
    {
  
      id: 2,
  
      name: randomTraderName(),
  
      age: 36,
  
      dateCreated: randomCreatedDate(),
  
      lastLogin: randomUpdatedDate(),
  
    },
  
    {
  
      id: 3,
  
      name: randomTraderName(),
  
      age: 19,
  
      dateCreated: randomCreatedDate(),
  
      lastLogin: randomUpdatedDate(),
  
    },
  
    {
  
      id: 4,
  
      name: randomTraderName(),
  
      age: 28,
  
      dateCreated: randomCreatedDate(),
  
      lastLogin: randomUpdatedDate(),
  
    },
  
    {
  
      id: 5,
  
      name: randomTraderName(),
  
      age: 23,
  
      dateCreated: randomCreatedDate(),
  
      lastLogin: randomUpdatedDate(),
  
    },
  
  ];
  
  return (
    <div style={{ backgroundColor: '#f0f0f0' }}>
      <div>
        <DrawerList />
        <Paper sx={{ width: '60%', margin: '3% auto' }}>
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>{renderTableHeader()}</TableRow>
              </TableHead>
              <TableBody>
                {renderTableData()}
              </TableBody>
            </Table>
          </TableContainer>
          {/* pagination purpose */}
          <Stack spacing={4}>
            <Typography align='center'>Page: {page}</Typography>
            <Pagination count={Math.ceil(filteredData.length / rowsPerPage)} page={page} onChange={handlePageChange} align='right' />
          </Stack>
        </Paper>
      </div>
      <Grid align="center" display="flex" justifyContent="space-around">
        <Button variant="contained" size="larger" color="primary" style={{ height: '60px', width:'180px',backgroundColor:"#21b6ae" }} onClick={handleBackClick}>
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={!csvData} variant="contained"style={{ height: '60px', width:'180px', backgroundColor:"#21b6ae" }} size="large" color="primary">
          Submit
        </Button>
        
      </Grid>
      {isSubmitted && (
        <Stack sx={{ width: '20%', align: 'center', ml: 40, mt: 5 }}>
          <Alert onClose={() => { }}>File Submitted!</Alert>
        </Stack>
      
      )}
      
    </div>
//     <div style={{height:300,width: '100%' }}>


// {
// headers.map((header, index) => (
//   <div key={index}>
  
//   <DataGrid rows={header} columns={column} getRowId={index}/>  
//   </div>  
// ))
// }
// </div>
  );
};

export default Edit;
























