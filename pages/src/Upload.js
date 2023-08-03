import React, { useState , useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Paper, Stack, Button, Box } from '@mui/material';
import FileUploadSharpIcon from '@mui/icons-material/FileUploadSharp';
import DrawerList from './components/DrawerList';
import Alert from '@mui/material/Alert';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Upload = () => {

  // State Management 
  let [csvData, setCsvData] = useState(null);
  let [uploaded, setUploaded] = useState(false);
  let [nextClicked, setNextClicked] = useState(false);
  let [file, setFile] = useState(null);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const [dragging, setDragging] = useState(false);  // 1
  //Navigation
  const navigate = useNavigate();


  //Styling part
  const avatarStyle = { backgroundColor: '#063970', align: "center" };
  const paperStyle = { padding: 50, height: '45vh', width: 700, margin: "70px auto" };


  //File upload management
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    readFileContents(file);

  };
  const readFileContents = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileContents = event.target.result;
      console.log(fileContents); // Here, you have access to the CSV file contents
      const csvData = parseCSV(fileContents);
      setCsvData(csvData);
    };

    reader.readAsText(file); // Read the file as text (CSV is plain text)
  };

  //Parsing the CSV
  const parseCSV = (csvText) => {
    // Assuming your CSV is comma-separated and the first row contains headers
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');

    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',');
      if (row.length === headers.length) {
        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header] = row[index];
        });
        data.push(rowData);
      }
    }
    return data;
  };
  //Next button action to edit page routing path defined
  const handleNextClick = (e) => {
    setUploaded(true); // Set uploaded to true when the "Next" button is clicked
    setNextClicked(true); // Set nextClicked to true when the "Next" button is clicked
    e.preventDefault();
    if (csvData === null) {
      setShowErrorAlert(true);
      return;
    }

    if (nextClicked && csvData !== null) {
      navigate("/edit", { state: { data: csvData } });
    }
    // setUploaded(true); // Set uploaded to true when the "Next" button is clicked
    // setNextClicked(true); // Set nextClicked to true when the "Next" button is clicked
    // if (nextClicked && csvData !== null) {
    //   navigate("/edit", { state: { data: csvData } });
    // }

  };
   // Drag and drop event handlers
   const handleDragEnter = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const files = event.dataTransfer.files;
    // Uncomment the code for handling valid files and invalid file types
  };

  return (



    <div className="bgcolor" style={{ backgroundColor: '#f0f0f0' }}>
    <Box height={90} />
    <Box sx={{ display: 'flex' }}>
    <DrawerList />
      <Grid container justifyContent="center">
        <Paper elevation={6} style={paperStyle} className="file-container">
          <Stack direction="column" spacing={5}>
            {/* The file upload and drag and drop area */}
            <div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                width: '620px',
                minHeight: '200px',
                fontFamily: 'sans-serif',
                backgroundColor: dragging ? '#e0e0e0' : 'transparent', // Change background color when dragging
                border: dragging ? '2px dashed #1e88e5' : 'none', // Add dashed border when dragging
              }}
            >
              <FontAwesomeIcon
                icon={faCloudArrowUp}
                fade
                size="2x"
                style={{ color: '#21b6ae', height: '90px' }}
              />
              <br />
              <div style={{ fontWeight: 'bold' }}>Drag & drop a file here or</div>
              <Button
                variant="text"
                //color="primary"
                style={{color:"#21b6ae"}}
                component="label"
                sx={{ mr: 2, display: 'flex' }}
              >
                Browse
                <input type="file" style={{ display: 'none' }} onChange={handleFileChange} />
              </Button>
              <div style={{ color: 'gray' }}>
                <p>Supported formats: XLSX, CSV</p>
              </div>
            </div>
            {/* End of file upload and drag and drop area */}
            <Button
              variant="contained"
              component="label"
              color="primary"
              style={{ height: '60px', backgroundColor:"#21b6ae" }}
              onClick={handleNextClick}
            >
              <Typography variant="h5" align="center" fontWeight={'medium'}>
                Next
              </Typography>
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Box>
    {showErrorAlert && (
      <Stack sx={{ width: '30%', ml: 20 }} spacing={3}>
        <Alert onClose={() => setShowErrorAlert(false)} variant="filled" severity="error">
          Please upload a file!
        </Alert>
      </Stack>
    )}
  </div>

   );
}
export default Upload;





//     <div className='container' style={{ backgroundColor: '#f0f0f0', height:1000+'px' }}>
// <NavBar />
// <Box height={200+'px'}  />
// <Box sx={{ display: "relative" ,width:1000 ,backgroundColor:'red',marginLeft:63, height:500}}>
//   <SideBar />
//   <Box component="main" sx={{ flexGrow: 1, p: 4 }} >
//     <Grid container spacing={2} justifyContent='center'>
//       <Grid item xs={8} justifyContent='center'>

//         <Card sx={{height:60+"vh"}}>

//           <CardContent>

//             <Button variant="contained"
//               component="label"
//               color='primary'
//               style={{ height: '60px' }}>
//               {" "}
//               <FileUploadSharpIcon />
//               <Typography variant='h5' align='center' fontWeight={'medium'}>
//                 Upload file
//               </Typography>

//               <input type="file" onChange={handleFileChange} hidden />
//             </Button>
//           </CardContent>

//         </Card>
//         <Button variant="contained"
//               component="label"
//               color='primary'
//               style={{ height: '60px'}}
//               onClick={handleNextClick}>
//               <Typography variant="h5"
//                 align="center"
//                 fontWeight={'medium'}>
//                 Next
//               </Typography>
//             </Button> 
//       </Grid>
//     </Grid>
//   </Box>
// </Box>
// </div>



    // <div className='bgcolor' style={{ backgroundColor: '#f0f0f0' }} >
    //   <Box height={70} />
    //   <Box sx={{ display: 'flex', mt: 15, mr: 15, height: 700 }}>
    //     <DrawerList />
    //     <Grid container justifyContent="center">
    //       <Paper elevation={5} style={paperStyle} className='file-container'>
    //         <Stack direction="column" spacing={4}>

           
    //           <Button variant="contained"
    //             component="label"
                
    //             sx={{ mr: 2, display: 'flex' }}
    //             style={{ height: '60px',  backgroundColor:"#21b6ae" }}>
    //             {" "}
    //             <FileUploadSharpIcon />
    //             <Typography variant='h5' align='center' fontWeight={'medium'}>
    //               Upload file
    //             </Typography>

    //             <input type="file" onChange={handleFileChange} hidden />
    //           </Button>


    //           <Button variant="contained"
    //             component="label"
               
    //             style={{ height: '60px' ,  backgroundColor:"#21b6ae"}}
    //             onClick={handleNextClick}>
    //             <Typography variant="h5"
    //               align="center"
    //               fontWeight={'medium'}>
    //               Next
    //             </Typography>

    //           </Button>
    //         </Stack>
    //       </Paper>
    //     </Grid>
    //   </Box>

    //   {showErrorAlert && (
    //     <Stack sx={{ width: '30%', ml: 20 }} spacing={3}>
    //       <Alert onClose={() => { }} variant="filled" severity="error">
    //         Please upload a file!
    //       </Alert>
    //     </Stack>
    //   )}
    // </div>



// <div className='container' style={{ backgroundColor: '#f0f0f0', height: 600 }}>
// <NavBar />
// <Box height={150} />
// <Box sx={{ display: "flex" }}>
//   <SideBar />
//   <Box component="main" sx={{ flexGrow: 1, p: 4 }} >
//     <Grid container spacing={4} justifyContent='center'>
//       <Grid item xs={10} justifyContent='center'>

//         <Card sx={{ minWidth: 500, maxWidth: 900, maxHeight: 700, minHeight: 300 }}>

//           <CardContent>

//             <Button variant="contained"
//               component="label"
//               color='primary'
//               style={{ height: '60px' }}>
//               {" "}
//               <FileUploadSharpIcon />
//               <Typography variant='h5' align='center' fontWeight={'medium'}>
//                 Upload file
//               </Typography>

//               <input type="file" onChange={handleFileChange} hidden />
//             </Button>
//           </CardContent>

//         </Card>
//         <Button variant="contained"
//               component="label"
//               color='primary'
//               style={{ height: '60px'}}
//               onClick={handleNextClick}>
//               <Typography variant="h5"
//                 align="center"
//                 fontWeight={'medium'}>
//                 Next
//               </Typography>
//             </Button>
//       </Grid>
//     </Grid>
//   </Box>
// </Box>
// </div>








