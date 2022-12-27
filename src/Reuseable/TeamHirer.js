import { Grid, Card, Container, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import {db} from '../Firebase/fbconfig'
import UploadedImage from './UploadedImage';

const TeamHirer = () => {
  const navigate = useNavigate();
  const id=useParams().id
  console.log(id)
  const [data,setData]=useState();
  useEffect(()=>{
    const getData=async()=>{
      const docRef = doc(db, "team_hire_post", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data())
      } else {
        // doc.data() will be undefined in this case
        alert("No such document!");
      }
    }
    getData()
  },[])
  console.log(data)
  return (
    <>
      <Stack>
        <Stack sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            onClick={() => {
              navigate('/dashboard/app');
            }}
            className="back"
          >
            Team Hire <i className="fas fa-chevron-right" /> <span className="team-heading"> Team Details</span>
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ p: 2 }}>
              <div className="team-hirer">
                <p>
                  <b>Start Date and Time </b>{' '}
                </p>
                <p>{data?.start_date} {data?.start_time}</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>End Date and Time </b>{' '}
                </p>
                <p>{data?.end_date} {data?.end_time}</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Team Hirer Name</b>{' '}
                </p>
                <p>{data?.title}</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Event Type </b>{' '}
                </p>
                <p>{data?.event_type}</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Posted on </b>{' '}
                </p>
                <p>{data?.posted_on_date}</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Description </b>{' '}
                </p>
                <p>{data?.description}</p>
              </div>
             {data?.camera_gear && <div className="team-hirer">
                <p>
                  <b>Camera Gears List </b>{' '}
                </p>
                <p>{data?.camera_gear ? data?.camera_gear.map((gs, index) => 
                <ul>
                {gs.Name} Rs-{gs.Price}  
                </ul> 
                        )  : ""}</p>
              </div>}
              <div className="team-hirer">
                <p>
                  <b>Video Gears List </b>{' '}
                </p>
                <p>{data?.video_gear ? data?.video_gear.map((gs, index) => 
                <ul>
                {gs.Name} Rs-{gs.Price}  
                </ul> 
                        )  : ""}</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Location </b>{' '}
                </p>
                <p>{data?.event_loc_link}</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Event status </b>{' '}
                </p>
                <p>{data?.event_status}</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Experience </b>{' '}
                </p>
                <p>{data?.experience}</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b> Price </b>{' '}
                </p>
                <p>{data?.price}</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Section </b>{' '}
                </p>
                <p>{data?.section}</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Service </b>{' '}
                </p>
                <p>{data?.service  }</p>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ p: 2 }}>
              <p>
                <b>Uplaoded Item</b>
              </p>
              {data?.invitation_url &&
              <UploadedImage url={data.invitation_url}/>}
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default TeamHirer;
