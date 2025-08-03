import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleLinkSuccess = ({ setIsLinked }: { setIsLinked: (v: boolean) => void }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const status = params.get("status");

        if (status === "success") {
            alert("Google account linked successfully!");
            setIsLinked(true);
            // Optionally redirect user to main page or wherever
            navigate("/", { replace: true });
        } else {
            alert("Google linking failed or was cancelled.");
            setIsLinked(false);
        }
    }, [location, setIsLinked, navigate]);

    return null; // or a loading spinner
};

export default GoogleLinkSuccess;