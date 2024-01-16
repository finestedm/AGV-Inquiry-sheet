import { Card, CardContent, CardHeader } from "@mui/material";
import { ReactNode } from "react";

export default function InputGroupCard({ title, content }: {title: string, content: ReactNode }) {
    return (
        <Card className="input-group-card">
            <CardHeader title={title} sx={{ textAlign: 'left' }}/>
            <CardContent>
                {content}
            </CardContent>
        </Card>
    )
}