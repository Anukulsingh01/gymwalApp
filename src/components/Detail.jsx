import React,{useState,useEffect} from 'react';
import { Typography,Stack,Button } from '@mui/material';
import BodyPartImage from '../assets/icons/body-part.png';
import TargetImage from '../assets/icons/target.png';
import EquipmentImage from '../assets/icons/equipment.png';

const Detail = ({exerciseDetail,itemID}) => {
const{bodyPart,name,target,equipment}=exerciseDetail;

    
    const extraDetail=[
        {
            icon:BodyPartImage,
            name:bodyPart,
        },
         {
            icon:TargetImage,
            name:target,
        },
         {
            icon:EquipmentImage,
            name:equipment,
        }
        
    ]
    if (!exerciseDetail?.id) return;
     const [gifUrl, setGifUrl] = useState('');
    
    
      useEffect(() => {
        const fetchGif = async () => {
          try {
            const response = await fetch(`https://exercisedb.p.rapidapi.com/image?resolution=180&exerciseId=${itemID}`, {
              method: 'GET',
              headers: {
                'X-RapidAPI-Key':import.meta.env.VITE_RAPID_API_KEY,
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
              }
            });
    
            const blob = await response.blob();
            const imageObjectUrl = URL.createObjectURL(blob);
            setGifUrl(imageObjectUrl);
          } catch (error) {
            console.error('Failed to load GIF:', error);
          }
        };
    
        fetchGif();
      }, [exerciseDetail.id]);

    
    return (
        <div>
            <Stack gap='60px' sx={{flexDirection:{lg:'row'},p:'20px',alignItems:'center'}}> 
                <img src={gifUrl} alt={name} loading="lazy" className='detail-image' />
              <Stack sx={{gap:{lg:'35px',xs:'20px'}}}>
                <Typography variant='h3'>{name}</Typography>
                <Typography variant='h5'>Exercise keep you Strong. {name} {`  `}
                    is one of the best exercises to target your {target}. It will help you
                    improve your mood and gain energy.</Typography>
                    {extraDetail.map((item)=>(
                        <Stack key={item.name} direction="row" gap="24px" alignItems="center">
                           <Button sx={{background:'#fff2db',borderRadius:'50%',width:'100px',
                            height:'100px'
                           }}>
                            <img src={item.icon} alt={bodyPart} style={{width:'50px', height:'50px' }}/>
                           </Button>
                           <Typography textTransform="capitalize" variant='h5'>
                            {item.name}
                           </Typography>
                        </Stack>
                    ))}
              </Stack>
            </Stack>
        </div>
    );

}
export default Detail;
