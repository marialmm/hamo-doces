import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
 /* Reset Css */
    /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
    */
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
        margin: 0;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    /* Global styles */
    :root{
        --primary-color: #FFE3A9;
        --secondary-color: #FFC3C3;
        --button-color: #FF8C8C;
        --accent-color: #FF5D5D;
        --error-color: #FF0000;

        --font-color: #000000;
        --font-color-button: #FFFFFF;
    }

    *{
        box-sizing: border-box;
    }

    main{
        min-height: calc(100vh - 70px);
        height: 100%;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding-bottom: 10px;
        margin-top: 70px;
        background-color: var(--primary-color);
    }

    a:visited{
        color: var(--font-color);
    }

    button{
        cursor: pointer;
    }
`;
