import styled from "styled-components";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
    return (
        <DashboardWrapper>
            <Navbar />
        </DashboardWrapper>
    )
}

const DashboardWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    font-family: 'Manrope', sans-serif;
`