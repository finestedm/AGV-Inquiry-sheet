import SvgIcon from '@mui/material/SvgIcon';

export default function ForkliftIcon({ color }: { color: "disabled" | "action" | "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning" }) {
    return (
        <SvgIcon fontSize='large' color={color}>
            <path d="M6,4v7H4a2,2,0,0,0-2,2v4a3,3,0,0,0,6,0h2a3,3,0,0,0,6,0V13L12,4H6M17,5V19h5V17.5H18.5V5H17m-9.5.5h3.7L14.5,13h-7V5.5M5,15.5A1.5,1.5,0,1,1,3.5,17,1.5,1.5,0,0,1,5,15.5m8,0A1.5,1.5,0,1,1,11.5,17,1.5,1.5,0,0,1,13,15.5Z" />
        </SvgIcon>
    )
}
