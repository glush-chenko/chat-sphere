import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import userStore, { UserData } from '../../../stores/user-store/user-store.ts';
import { observer } from 'mobx-react-lite';

interface personInfoCardProps {
  headers: string;
  keys: keyof UserData;
}

export const PersonInfoCard = observer((props: personInfoCardProps) => {
  const { headers, keys } = props;

  return (
    <Card sx={{
      minWidth: {
        xs: '18rem',
        sm: '24rem',
        md: '20rem;',
        lg: "21.6rem",
      },
    }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {headers}
        </Typography>
        {userStore.userData && (
          <Typography gutterBottom sx={{ color: 'text.main', fontSize: 16 }}>
            {userStore.userData[keys]}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
});