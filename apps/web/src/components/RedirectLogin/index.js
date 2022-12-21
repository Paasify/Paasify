import { useEffect } from "react";

export default function RedirectToLogin() {
    useEffect(() => {
        window.location.href = "/dashboard";
    });
    return <h1>Loading...</h1>;
}