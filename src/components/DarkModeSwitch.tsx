import { useDispatch, useSelector } from 'react-redux';
import Switch from '@mui/material/Switch';
import { toggleDarkMode } from '../features/redux/reducers/darkModeSlice';
import { RootState } from '../features/redux/store';
import { $CombinedState } from 'redux';


export default function DarkModeSwitch(): JSX.Element {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode);

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <Switch
      checked={darkMode}
      onChange={handleDarkModeToggle}
      color="primary"
    />
  );
}
