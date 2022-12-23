import { Grid, Card, Container, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UploadedImage from './UploadedImage';

const TeamHirer = () => {
  const navigate = useNavigate();
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
                  <b>Date and Time </b>{' '}
                </p>
                <p>21/01/2022 21:22</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Team Hirer Name</b>{' '}
                </p>
                <p>Jagadish Kumar</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Event Type </b>{' '}
                </p>
                <p>Birthday Function</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Gears List </b>{' '}
                </p>
                <p>Nikon</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Location </b>{' '}
                </p>
                <p>Chennai</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>No of Application </b>{' '}
                </p>
                <p>20</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>No of Checkout </b>{' '}
                </p>
                <p>5</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Event Type </b>{' '}
                </p>
                <p>Open</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Payment Status </b>{' '}
                </p>
                <p>Paid</p>
              </div>
              <div className="team-hirer">
                <p>
                  <b>Event Price </b>{' '}
                </p>
                <p>30,000</p>
              </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ p: 2 }}>
              <p>
                <b>Uplaoded Item</b>
              </p>
              <UploadedImage />
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};

export default TeamHirer;
