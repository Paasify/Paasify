import { useEffect, useState } from "react";
import styled from "styled-components";
import GitLinkComponent from "../../components/GitLinkComponent";
import Navbar from "../../components/Navbar";
import { BsArrowLeft, BsGithub } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import BlurBlackImg from "../../assets/blur-black.jpg";

export default function New() {
    const navigate = useNavigate();
    const [sideImg, setSideImg] = useState(BlurBlackImg);
    useEffect(() => {
        axios
          .get("https://source.unsplash.com/collection/96625331/1080x1080")
          .then((res) => {
            setSideImg(res.request.responseURL);
          });
    }, []);

    return (
        <NewWrapper>
            <Navbar />
            <TitleWrapper>
                <div onClick={() => navigate(-1)}>
                    <BsArrowLeft />
                    <h1>Back</h1>
                </div>
                <Intro>One more step.</Intro>
            </TitleWrapper>
            <MainSectionWrapper>
                <GitLinkWrapper>
                    <GitLinkComponent />
                </GitLinkWrapper>
                <ImageWrapper img={sideImg}>
                    <h1>Passify</h1>
                    <div>
                        <a href="https://github.com/Paasify/Paasify" target="_blank" rel="noreferrer"><BsGithub /></a>
                    </div>
                </ImageWrapper>
            </MainSectionWrapper>
        </NewWrapper>
    )
}

const NewWrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
    font-family: 'Manrope', sans-serif;
`

const TitleWrapper = styled.div`
    margin: 2rem 0 0 8rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    div {
        display: flex;
        gap: 0.25rem;
        align-items: center;
        font-size: 1rem;
        cursor: pointer;
        h1 {
            font-weight: 600;
        }
        svg {
            font-size: 1rem;
            cursor: pointer;
        }
    }
`

const Intro = styled.h1`
    font-size: 2.5rem;
    font-weight: 800;
`

const MainSectionWrapper = styled.div`
    display: flex;
    gap: 4rem;
    margin-top: 2rem;
    padding: 0 8rem;
`

const GitLinkWrapper = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: column;
    flex-grow: 1;
    flex-basis: 0;
`

const ImageWrapper = styled.div`
    background: url(${(props) => props.img}) no-repeat center center;
    width: 100%;
    height: 100%;
    min-height: 50vh;
    flex-grow: 1;
    flex-basis: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    h1 {
        font-size: 6rem;
        font-weight: 800;
        color: #fff;
        mix-blend-mode: difference;
    }
    svg {
        color: #fff;
        mix-blend-mode: difference;
        font-size: 3rem;
    }
`
