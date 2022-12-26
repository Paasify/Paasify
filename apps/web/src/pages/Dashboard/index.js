import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import { io } from "socket.io-client";
import SpeedoMeter from "../../components/SpeedoMeter";

if ((typeof(window) !== "undefined") && document.cookie.match("_auth")) {
    var token = document.cookie.match("(^|;)\\s*" + "_auth" + "\\s*=\\s*([^;]+)")[2];
}
const socket = io("http://localhost:5000", {
    auth: {
        token: "Bearer " + token
    }
});

export default function Dashboard() {
    const [serverUsage, setServerUsage] = useState();
    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id);
        });
        socket.on("server usage", (usageData) => {
            setServerUsage(usageData)
        })
        return () => {
            socket.off("connect");
            socket.off("server usage")
        }
    }, [])
    console.log(serverUsage)
    return (
        <DashboardWrapper>
            <Navbar />
            <SpeedoMeterWrapper>
                <SpeedoMeterWidthWrapper>
                    {serverUsage ? (<SpeedoMeter percent={serverUsage.cpu[0]} total={serverUsage.processorCount} type="CPU" arch={serverUsage.cpuArch}>yo</SpeedoMeter>) : (<h1 style={{border: '1px solid black'}}>Loading...</h1>)}
                </SpeedoMeterWidthWrapper>
                <SpeedoMeterWidthWrapper>
                    {serverUsage ? (<SpeedoMeter percent={Math.round((serverUsage.mem.totalMem - serverUsage.mem.freeMem)*10000/serverUsage.mem.totalMem)/100} current={Math.round(serverUsage.mem.totalMem - serverUsage.mem.freeMem)} total={Math.round(serverUsage.mem.totalMem)} type="Memory">yo</SpeedoMeter>) : (<h1 style={{border: '1px solid black'}}>Loading...</h1>)}
                </SpeedoMeterWidthWrapper>
            </SpeedoMeterWrapper>
            <ContainerWrapper>
                <DockerContainers>
                    <DockerTitle>Containers (Running)</DockerTitle>
                    {serverUsage ? (
                    <table>
                        <tr>
                            <th>CONTAINER ID</th>
                            <th>IMAGE</th>
                            <th>COMMAND</th>
                            <th>CREATED</th>
                            <th>STATUS</th>
                        </tr>
                        {serverUsage.containersList.map((item, i) => {
                            return(
                                <>
                                    <tr key={i}>
                                        <td>{item.Id.substring(0,12)}</td>
                                        <td>{item.Image}</td>
                                        <td>{item.Command}</td>
                                        <td>{item.Created}</td>
                                        <td>{item.Status}</td>
                                    </tr>
                                </>
                            )
                        })}
                    </table>
                    ) : <h1>Loading...</h1>
                    }
                </DockerContainers>
            </ContainerWrapper>
        </DashboardWrapper>
    )
}

const DashboardWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    font-family: 'Manrope', sans-serif;
`
const SpeedoMeterWrapper = styled.div`
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex: 2 0 auto;
    justify-content: center;
`

const SpeedoMeterWidthWrapper = styled.div`
    width: 40vw;
`

const ContainerWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`
    
const DockerContainers = styled.div` 
    width: calc(80vw - 2px);
    border: 1px solid;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
    table {
        width: 90%;
        margin-bottom: 2rem;
        th {
            font-weight: 600;
        }
        td, th {
            border: 1px solid #dddddd;
            padding: 8px;
            text-align: left;
        }
        tr:nth-child(even) {
            background-color: #dddddd;
        }
    }
`

const DockerTitle = styled.div`
    margin-top: 2rem;
    font-size: 1.5rem;
    text-decoration: underline;
`