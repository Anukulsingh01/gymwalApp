import React,{useContext} from 'react';
import { Box,Typography } from '@mui/material';
import BodyPart from './BodyPart';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import RightArrowIcon from '../assets/icons/right-arrow.png';
import LeftArrowIcon from '../assets/icons/left-arrow.png';
import ExerciseCard from './ExerciseCard';

const LeftArrow=()=>{
    const{scrollPrev}=useContext(VisibilityContext);
    
    return(
        <Typography onClick={()=>scrollPrev()} className='right-arrow'>
          <img src={LeftArrowIcon} alt="Left-arrow" />
        </Typography>
    );
};
const RightArrow=()=>{
    const{scrollNext}=useContext(VisibilityContext);
    
    return(
        <Typography onClick={()=>scrollNext()} className='left-arrow'>
          <img src={RightArrowIcon} alt="Right-arrow" />
        </Typography>
    );
};

const HorizontalScrollbar = ({ data, bodyPart, setBodyPart,isBodyParts}) => {
  return (
    <Box sx={{ width: '100%', overflowX: 'auto', whiteSpace: 'nowrap' }}>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {data.map((item) => (
          <Box
            key={item.id || item}
            itemID={item.id || item}
            title={item.id || item}
            sx={{
              mx: 2, 
              display: 'inline-block',
              minWidth: '150px', 
              scrollSnapAlign: 'start',
            }}
          >
            {isBodyParts ?
            <BodyPart
              item={item}
              bodyPart={bodyPart}
              setBodyPart={setBodyPart}
            />: <ExerciseCard exercise={item}/>}
          </Box>
        ))}
      </ScrollMenu>
    </Box>
  );
};

export default HorizontalScrollbar;
