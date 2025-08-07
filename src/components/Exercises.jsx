import React,{useState,useEffect} from 'react';
import { Box,Stack,Typography,Pagination } from '@mui/material';
import { exerciseOptions,fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';

const Exercises = ({exercises,setExercises,bodyPart}) => {
    const[currentPage,setCurrentPage]=useState(1);
    const exercisesPerPage = 3;
    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise=indexOfLastExercise-exercisesPerPage;
    const currentExercises =exercises.slice(indexOfFirstExercise,indexOfLastExercise)
    const Paginate =(e,value)=>{
        setCurrentPage(value);
        window.scrollTo({top:1800,behaviour:'smooth'})
    }
    useEffect(()=>{
        const fetchExerciseData=async()=>{
            let exercisesData=[];

            if(bodyPart==='all'){
                exercisesData=await fetchData(
                        'https://exercisedb.p.rapidapi.com/exercises',
                        exerciseOptions
                      )
            }
            else{
                 exercisesData=await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
                        exerciseOptions);
            }
            setExercises(exercisesData);
        }
        fetchExerciseData();
    },[bodyPart])
    return (
        <div>
            <Box id="exercises"
            sx={{mt:{lg:'11opx'}}}
            mt="50px"
            p="20px"
            >
                <Typography variant='h3' mb="46px">
                    Showing Results
                </Typography>
                <Stack direction="row" sx={{gap:{lg:'110px',xs:'50px'}}}
                flexWrap="wrap" justifyContent="center">
                    {currentExercises.map((exercise,index)=>(
                    <ExerciseCard key={index} exercise={exercise}/>
                    ))}

                </Stack>
                <Stack mt="100px" alignItems="center">
                  {exercises.length>3&& (
                    <Pagination color='standard'
                    shape="rounded"
                    defaultPage={1}
                    count={Math.ceil(exercises.length/exercisesPerPage)}
                    page={currentPage}
                    onChange={Paginate}
                    size='large'
                    >

                    </Pagination>
                  )}
                </Stack>
            </Box>
        </div>
    );
}

export default Exercises;
