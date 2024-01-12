import { useEffect, useState } from 'react'
import './App.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Avatar, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import mountain from './assets/images/mountains.png';
import Divider from '@mui/material/Divider';
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";



function App() {

  const [task, settask] = useState("");
  const [tasksData, setTasksData] = useState([]);
  const [refresh, setrefresh] = useState(false);

  // Add Task
  const SubmitTask = async () => {

    if (task != '') {

      try {
        const taskobj = { task }
        const docRef = await addDoc(collection(db, "task"), taskobj);
        settask("")
        let txtfeild = document.getElementById('Add-New-Task')
        txtfeild.value = "";
        setrefresh(!refresh);
      } catch (error) {
        console.log("error", error);
      }
    }
    else {
      alert('Please Enater the Task')
    }
  }

  // Get All Tasks
  useEffect(() => {
    getTasks();
  }, [refresh]);

  const getTasks = async () => {
    try {
      const arr = [];
      const docSnap = await getDocs(collection(db, "task"));

      docSnap.forEach((doc) => {
        arr.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      setTasksData([...arr]);
    } catch (error) {
      console.log("error", error);
    }
  };

  // Update Task
  const editTask = async (id, task) => {
    try {
      const edittask = prompt("Edit Task", task);
      if (edittask) {
        const taskobj = {
          task: edittask,
        };
        await updateDoc(doc(db, "task", id), taskobj);
        setrefresh(!refresh);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  // Delete Task
  const deleteTask = async (id, task) => {
    try {
      const deletetask = confirm(`Are you sure you want to delete "${task}"?`);
      if (deletetask) {
        await deleteDoc(doc(db, "task", id));
        setrefresh(!refresh);
      }
    } catch (error) {
      console.log("error", error);
    }
  }


  return (
    <>
      <div className=" h-screenn text-center py-16">

        <h2 className='text-white text-5xl font-bold'>ToDo List</h2>

        <Box
          noValidate
          autoComplete="off"
          sx={{
            mt: '3rem', justifyContent: "center", alignItems: "center"
          }}
        >
          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: "center", alignItems: "center" }}>
            <TextField
              onChange={(e) => settask(e.target.value)}
              sx={{
                background: 'white',
                width: '40%',
                borderRadius: '5px',
                border: 'none',

                '& label.Mui-focused': {
                  color: '#B864F0',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#B2BAC2',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#E0E3E7',
                  },
                  '&:hover fieldset': {
                    borderColor: '#B2BAC2',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#B864F0',
                  },
                },
              }}
              focused
              id="Add-New-Task" label="Add New Task" variant="outlined" />

            <Button
              onClick={SubmitTask}
              sx={{
                backgroundColor: '#B864F0',
                // 
                fontSize: '22px',
                '&:hover': {
                  backgroundColor: '#B864F0',
                },
              }}
              startIcon={<AddIcon sx={{ fontWeight: 'bold', }} />}
              variant="contained">Add</Button>
          </Stack>

        </Box>

        <Grid item xs={12} md={6} sx={{
          background: 'white',
          width: { md: '50%', xs: "80%" },
          borderRadius: '5px',
          border: 'none',
          padding: '15px 8px',
          margin: '0 auto',
          mt: '4rem'
        }}>

          <List >

            {       

              tasksData.map((value, index) => {
                return (
                  <div key={index}>
                    <ListItem
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(value.id, value.task)}>
                          <DeleteIcon sx={{
                            color: '#B864F0',
                            '&:hover': {
                              color: '#B864F0',
                            },
                          }} />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <IconButton onClick={() => editTask(value.id, value.task)}>
                          <EditIcon
                            sx={{
                              color: '#B864F0',
                              '&:hover': {
                                color: '#B864F0',
                              },
                            }}

                          />
                        </IconButton>
                      </ListItemAvatar>
                      <ListItemText
                        primary={value.task}
                      />
                    </ListItem>
                    <Divider variant="middle" />

                   
                  </div>

                )
              })
            }

          </List>
        </Grid>

      </div>
    </>
  )
}

export default App
