import { useEffect } from "react";

export default function RedirectToLogin() {
    useEffect(() => {
        window.location.href = "/login";
    });
    return <h1>Loading...</h1>;
}