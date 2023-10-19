import styled from "styled-components";

import { v } from "../../styles/variables";

export const SLayout = styled.div`
    display: flex;
    width:100vw;
    height:100vh;
    background-color:#f4f5f8;
`;

export const SMain = styled.main`
    padding: calc(${v.smSpacing} * 2);
    width: calc(100% - 110px);
`;
