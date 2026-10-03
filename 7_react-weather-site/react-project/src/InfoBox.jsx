import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./InfoBox.css";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';




export default function InfoBox({ info }) {
    const INIT_URL =
  'https://images.unsplash.com/photo-1680352267694-a7fd4c33d4e1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const HOT_URL = 'https://images.unsplash.com/photo-1524594081293-190a2fe0baae?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const COLD_URL = 'https://plus.unsplash.com/premium_photo-1670493556860-13e006e6faa4?q=80&w=697&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const RAIN_URL = 'https://images.unsplash.com/photo-1692362385851-cf68a6d9604b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
 

  return (
    <div className="InfoBox">
      
      <div className="cardContainer">
      <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      sx={{ height: 140 }}
      image={
  info.humidity > 80
    ? RAIN_URL
    : info.temp > 15
      ? HOT_URL
      : COLD_URL
}
      title="green iguana"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {info.city} {
            info.humidity > 80
  ? <ThunderstormIcon />
  : info.temp > 15
    ? <WbSunnyIcon />
    : <AcUnitIcon />
        }
      </Typography>
      <Typography variant="body2" color="text.secondary" component="span">
  <p>Temperature = {info.temp}&deg;C</p>
  <p>Humidity = {info.humidity}</p>
  <p>Min Temp = {info.tempMin}&deg;C</p>
  <p>Max Temp = {info.tempMax}&deg;C</p>
  <p>
    The weather can be described as <b>{info.weather}</b> and feels like{' '}
    {info.feelsLike}&deg;C
  </p>
</Typography>
    </CardContent>
    
  </Card>
  </div>
    </div>
  );
}