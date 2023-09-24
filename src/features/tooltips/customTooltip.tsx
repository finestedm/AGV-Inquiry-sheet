import { ClickAwayListener, Tooltip } from "@mui/material";
import { useState } from "react";
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

export default function CustomTooltip({ title }: { title: string }) {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <Tooltip
            title={title}
            open={open}
            onClose={handleToggle}
        >
            <span onClick={handleToggle} onMouseEnter={handleToggle} onMouseOut={handleToggle}>
                <ContactSupportIcon />
            </span>
        </Tooltip >
    );
}