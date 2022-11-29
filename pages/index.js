import React from 'react';
import styled from 'styled-components';
import db from '../db.json';
import { useRouter } from 'next/router';
import {motion} from 'framer-motion'
import Widget from "../src/components/Widget/index";
import Link from "../src/components/Link/index";
import Footer from "../src/components/Footer/index";
import QuizBackground from "../src/components/QuizBackground/index";
import GitHubCorner from "../src/components/GitHubCorner/index";
import QuizLogo from "../src/components/QuizLogo/index";
import Input from "../src/components/Input";
import Button from "../src/components/Button";
import Head from 'next/head';

/*const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  height: 100vh;
  width: 100vw;
  position: absolute;
  background-size: cover;
  background-position: center;
`;*/

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 25px;
  margin: auto;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;



export default function Home() {
  const router = useRouter();
  let [name, setName] = React.useState("");
  console.log("retorno do useState", name, setName)

  return (
    <>
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>World Cup Quiz</title>
        <link rel="shortcut icon" href="https://th.bing.com/th/id/Rcb9ffb7ba5e9ae87f25ce917074dd430?rik=EG0Srv34OGZwpQ&riu=http%3a%2f%2fc
        dn.shopify.com%2fs%2ffiles%2f1%2f3101%2f3620%2fproducts%2f1_Jurassic_Park_logo_negro_editado_1200x1200.png%3fv%
        3d1519644932&ehk=mZlReGk%2bhxSYyZmbahkUpgw82VHu0He0lc02f0KM%2fx8%3d&risl=&pid=ImgRaw" type="image/x-icon" />
      </Head>

      <QuizContainer>

        <QuizLogo 
        as={motion.img}
        transition={{delay: 0.5, duration: 0.5}}
        variants={{
          show: {opacity: 1},
          hidden: {opacity: 0}
        }}
        initial='hidden'
        animate='show'
        src={'https://cdn-icons-png.flaticon.com/512/1031/1031366.png'}/>
        <Widget as={motion.section}
        transition={{delay:0, duration:0.5}}
        variants={{
          show: {opacity: 1, y: '0'},
          hidden: {opacity: 0, y: '100%'},
        }}
        initial='hidden'
        animate='show'>
          <Widget.Header>
            <h1>Quiz da Copa do Mundo</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
           
              router.push(`/quiz?name=${name}`);
              console.log('Fazendo uma submissão por meio do React')
          
              //router manda para a próxima página
            }}> 

              <Input name="nomeDoUsuario" type={name} onChange={(infosDoEvento) => {
                setName(infosDoEvento.target.value);
              }} 
              
              placeholder="Preencha o seu nome aqui."/>

              <Button type="submit" disabled={name.length === 0}> 
                {`Iniciar Quiz`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Footer as={motion.footer}
        transition={{delay:1, duration:0.5}}
        variants={{
          show: {opacity: 1},
          hidden: {opacity: 0},
        }}
        initial='hidden'
        animate='show'
        />

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Hyper-spec" 
      />
    </QuizBackground>
    </>
  );
}
