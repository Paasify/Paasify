import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function GitLinkComponent() {
    const [appName, setAppName] = useState();
    // const [gitLink, setGitLink] = useState();
    const [projectName, setProjectName] = useState();
    const [gitRepoLink, setGitRepoLink] = useState();
    const [error, setError] = useState();
    const createUrl = "http://localhost:5000/api/apps/test";

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(createUrl, {
            projectName,
            gitRepoLink,
          }, {
            withCredentials: true,
          });
          console.log('response', response);
        } catch (err) {
          if (err.response.data.message) {
            setError(err.response.data.message);
          } else {
            setError("Something went wrong");
          }
          console.log(err.response.data.message);
        }
    };

    return (
        <GitLinkWrapper method="post" onSubmit={onSubmit}>
            <div style={{display: "flex", flexDirection: "column", gap: "0.6rem"}}>
                <GitLinkTitle>Project Name</GitLinkTitle>
                <GitLinkInput type="text" placeholder="eg: Paasify" onChange={(e) => setProjectName(e.target.value)} />
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "0.6rem"}}>
                <GitLinkTitle>Public Git Repository Link</GitLinkTitle>
                <GitLinkInput type="text" placeholder="eg: https://github.com/Paasify/Paasify" />
            </div>
            <Button>Ship it! 🚀</Button>
        </GitLinkWrapper>
    )
}

const GitLinkWrapper = styled.form`
    font-family: 'Manrope', sans-serif;
    width: 100%;
    display: flex;
    gap: 1.5rem;
    flex-direction: column;
`

const GitLinkTitle = styled.h1`
    font-size: 1rem;
    font-weight: 500;
`

const GitLinkInput = styled.input`
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 500;
    padding: 0.6rem;
    width: 80%;
    border-radius: 5px;
    border: 1px solid #e0e0e0;
    :focus {
        border: 1px solid #e1e1e1;
    }
`

const Button = styled.button`
    padding: 0.6rem 4rem;
    width: calc(80% + 1.35rem);
    border-radius: 5px;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    background-color: #0066ff;
    border: none;
    cursor: pointer;
`