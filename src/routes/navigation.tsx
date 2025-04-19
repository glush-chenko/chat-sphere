import { type Navigation } from '@toolpad/core/AppProvider';
import PersonIcon from '@mui/icons-material/Person';

export const NAVIGATION: Navigation = [
  {
    segment: 'person-info',
    title: 'Person',
    icon: <PersonIcon />,
  },
];