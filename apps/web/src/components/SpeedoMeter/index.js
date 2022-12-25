import { useEffect, useState } from "react";
import styled from "styled-components";

export default function SpeedoMeter({ percent, current, total, type, arch}) {
    return (
        <SpeedoMeterWrapper>
            <h1>{type}</h1>
            <Percent>{percent}<span>%</span></Percent>
            {type === "CPU" ? (<h1>{total} cores ({arch})</h1>) : (<h1>{current} of {total} MB (~{Math.round(total*100/1024)/100} GB)</h1>)}
        </SpeedoMeterWrapper>
    )
}

const SpeedoMeterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    border: 1px solid black;
    padding: 2rem;
    h1 {
        font-size: 1.5rem;
        text-decoration: underline;
    }
`

const Percent = styled.div`
    font-size: 8rem;
    span {
        position: absolute;
        font-size: 2rem;
    }
`