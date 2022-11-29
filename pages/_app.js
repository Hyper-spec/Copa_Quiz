import { createGlobalStyle, ThemeProvider } from 'styled-components'
import db from '../db.json'
import Head from 'next/head';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* New styles */
  display: flex;
  flex-direction: column;
  font-family: 'Lato', sans-serif;
  // Deixa branco no começo
  color: ${({ theme }) => theme.colors.contrastText};
}
html, body {
  min-height: 100vh;
}
#__next {
  flex: 1;
  display: flex;
  flex-direction: column;
}
`

const theme = db.theme

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="shortcut icon" href="https://th.bing.com/th/id/Rcb9ffb7ba5e9ae87f25ce917074dd430?rik=EG0Srv34OGZwpQ&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f3101%2f3620%2fproducts%2f1_Jurassic_Park_logo_negro_editado_1200x1200.png%3fv%3d1519644932&ehk=mZlReGk%2bhxSYyZmbahkUpgw82VHu0He0lc02f0KM%2fx8%3d&risl=&pid=ImgRaw" type="image/x-icon"/>
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
