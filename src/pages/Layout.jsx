import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";


export const Layout = () => {
    return (
        <ScrollToTop>
            
            <div className="container mt-3" style={{ minHeight: "80vh" }}>
                <Outlet />
            </div>
            
        </ScrollToTop>
    );
};