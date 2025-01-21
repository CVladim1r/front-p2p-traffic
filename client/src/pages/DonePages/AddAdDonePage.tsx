import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/ui";
import DonePage from "./DonePage";
import { RoutePaths } from "../../app/providers/router";

export default function AddAdDonePage() {
    const navigate = useNavigate()
    
    return <DonePage
        mainMessage="Ваше объявление опубликовано"
        secondaryMessage="Теперь оно есть в списке всех объявлений."
        button={
            <Button
                onClick={() => {
                    navigate(RoutePaths.profile)
                }}
            >
                Ок
            </Button>
        }
    />
}