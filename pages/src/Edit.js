// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Typography, CssBaseline, AppBar, Box, Paper, Avatar, Grid, Stack, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
// import { Pagination } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import DrawerList from './components/DrawerList';
// import Alert from '@mui/material/Alert';
// const Edit = () => {
//   const location = useLocation();
//   const csvData = location.state && location.state.data;
//   console.log(csvData);// checking data passed to the page
//   const navigate = useNavigate();
//   //State Management
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // Function to handle data change in the table
//   const handleCellChange = (event, rowIndex, columnName) => {
//     const newData = [...csvData];
//     newData[rowIndex][columnName] = event.target.value;
//     console.log(newData); // You can see the updated data in the console
//   };


//   //Table Header Management
//   const renderTableHeader = () => {
//     // Assuming the first row of your CSV contains headers
//     const headers = Object.keys(csvData[0]);
//     return headers.map((header, index) => (
//       <TableCell key={index} style={{ backgroundColor: 'black', color: 'white', textTransform: "uppercase" }}>
//         {header}
//       </TableCell>
//     ));
//   };

//   //Table data Management
//   const renderTableData = () => {
//     const startIndex = (page - 1) * rowsPerPage;
//     const endIndex = startIndex + rowsPerPage;

//     return csvData.slice(startIndex, endIndex).map((row, rowIndex) => {
//       return (
//         <TableRow key={startIndex + rowIndex}>
//           {Object.entries(row).map(([columnName, cellData], cellIndex) => (
//             <TableCell key={cellIndex}>
//               <input
//                 type="text"
//                 value={cellData}
//                 onChange={(event) => handleCellChange(event, startIndex + rowIndex, columnName)}
//               />
//             </TableCell>
//           ))}
//         </TableRow>
//       );
//     });
//   };

//   //Pagination page change
//   const handlePageChange = (event, newPage) => {
//     setPage(newPage);
//   };

//   //Submit button 
//   const handleSubmit = () => {
//     setIsSubmitted(true);
//   };


//   const handleBackClick = () => {
//     navigate('/'); // Navigate to the Upload page when the "Back" button is clicked
//   };

//   return (
//     <div style={{ backgroundColor: '#f0f0f0' }}>
//       <div>
//         <DrawerList />
//         <Paper sx={{ width: '70%', margin: '2% auto' }}>
//           <TableContainer sx={{ maxHeight: 400 }}>
//             <Table stickyHeader>

//               <TableHead>

//                 <TableRow>{renderTableHeader()}</TableRow>

//               </TableHead>

//               <TableBody>

//                 {renderTableData()}

//               </TableBody>

//             </Table>
//           </TableContainer>


//           {/* pagination purpose */}
//           <Stack spacing={3}>
//             <Typography>Page: {page}</Typography>
//             <Pagination count={Math.ceil(csvData.length / rowsPerPage)} page={page} onChange={handlePageChange} />
//           </Stack>
//         </Paper>

//         {/* Submit button */}

//         <Grid align="center" display="flex" justifyContent="space-around" >

//           <Button variant="contained" size="large" color="primary" onClick={handleBackClick}>
//             Back
//           </Button>
//           <Button onClick={handleSubmit} disabled={!csvData} variant="contained" size="large" color="primary">
//             Submit
//           </Button>

//         </Grid>
//         {isSubmitted && <Stack sx={{ width: '20%', align: 'center', ml: 40, mt: 5 }}>
//           <Alert onClose={() => { }}>File Submitted!</Alert>

//         </Stack>}
//       </div>
//     </div>

//   );
// };

// export default Edit;


import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, CssBaseline, AppBar, Box, Paper, Avatar, Grid, Stack, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import { Pagination } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DrawerList from './components/DrawerList';
import Alert from '@mui/material/Alert';

const Edit = () => {
  const location = useLocation();
  const csvData = location.state && location.state.data;
  console.log(csvData); // checking data passed to the page
  const navigate = useNavigate();

  // State Management
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState(csvData); // State to store filtered data

  // Function to generate a unique id for each row
  const getRowId = (row) => {
    return filteredData.indexOf(row); // Using the index of the row as a unique id
  };

  // Function to handle data change in the table
  const handleCellChange = (event, rowIndex, columnName) => {
    const newData = [...filteredData]; // Use filtered data for changes
    newData[rowIndex][columnName] = event.target.value;
    console.log(newData); // You can see the updated data in the console
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
        <TableRow key={getRowId(row)}>
          {Object.entries(row).map(([columnName, cellData], cellIndex) => (
            <TableCell key={cellIndex}>
              <input
                type="text"
                value={cellData}
                onChange={(event) => handleCellChange(event, rowIndex + startIndex, columnName)}
              />
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
  );
};

export default Edit;
























