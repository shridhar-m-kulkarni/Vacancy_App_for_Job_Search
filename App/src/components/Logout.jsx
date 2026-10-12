    import axios from "axios";
    import { useNavigate } from "react-router-dom";

    const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
        const response = await axios.post(
            "http://localhost:3000/logout",
            {},
            {
            withCredentials: true,
            }
        );

        if (response.data === true) {
            navigate("/");
        }
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <button className="LogoutBtn" onClick={handleLogout}>
        Logout
        </button>
    );
    };

    export default Logout;