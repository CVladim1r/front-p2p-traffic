import { Navigate } from "react-router-dom";
import { Button } from "../../shared/ui";
import DonePage from "./DonePage";
import { RoutePaths } from "../../app/providers/router";
import { useState } from "react";

export default function AddAdDonePage() {
    // const navigate = useNavigate()
    const [navigate, setNavigate] = useState(false)
    
    if (navigate)
        return <Navigate to={RoutePaths.profile} replace />

    return <DonePage
        mainMessage="Ваше объявление опубликовано"
        secondaryMessage="Теперь оно есть в списке всех объявлений."
        button={
            <Button
                onClick={() => setNavigate(true)}
            >
                Ок
            </Button>
        }
    />
}