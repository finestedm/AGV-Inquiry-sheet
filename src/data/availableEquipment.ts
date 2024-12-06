import DoorSlidingIcon from '@mui/icons-material/DoorSliding';
import BusinessIcon from '@mui/icons-material/Business';
import FenceIcon from '@mui/icons-material/Fence';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import EvStationIcon from '@mui/icons-material/EvStation';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import ArchiveIcon from '@mui/icons-material/Archive';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

const availableEquipment = [
    'dock', 'wall', 'gate', 'storage area', 'racking area', 'charging stations', 'pickup station', 'unload station'
]

type TEqIcons = {
    [K in typeof availableEquipment[number]]: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
};

export const eqIcons: TEqIcons = { dock: DoorSlidingIcon, wall: BusinessIcon, gate: FenceIcon, 'storage area': ViewModuleIcon, 'racking area': StackedBarChartIcon, 'charging stations': EvStationIcon, 'pickup station': UnarchiveIcon, 'unload station': ArchiveIcon }

export default availableEquipment