import React from 'react';
import {useRouter} from 'next/router'
import db from '../../db.json';
import Head from 'next/head'
import BackLinkArrow from '../../src/components/BackLinkArrow'
import Widget from '../../src/components/Widget';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import Button from '../../src/components/Button';
import CorrectButton from '../../src/components/CorrectButton'
import AlternativesForm from '../../src/components/AlternativesForm'



function ResultWidget({results}) {
    const quizResults = results.filter((x) => x).length
    const router = useRouter();
    const {name} = router.query;
    return(
        <Widget>
          <Widget.Header>
              <BackLinkArrow href={'/'}/>
            Tela de Resultado </Widget.Header>
          <Widget.Content>
              <h3>
                  <b>{`${name.trim()}`}</b>{', '}
                  você acertou
                  {' '}
                  {/*results.reduce((somatoriaAtual, resultAtual) => {
                  const isAcerto = resultAtual === true;
                  if (isAcerto) {
                        return somatoriaAtual + 1
                        
                  }
                  return somatoriaAtual
                  console.log(results.somatoriaAtual) 
                }, 0)*/}
                {' '}  {quizResults === 1 ? `apenas ${quizResults} pergunta! Tente novamente.` : `${quizResults} perguntas! You rock! :D`}</h3>
              <ul>
                  {results.map((result, index) => (
                      <Widget.Topic key={`result__${result}`} 
                      style={{background: result === true ? `${db.theme.colors.success}`: `${db.theme.colors.wrong}`}}>
                        Pergunta{' '}{index < 9 ? `0${index + 1}` : `${index + 1}`}:{' '}
                        {result === true ? "Acertou" : "Errou"}
                      </Widget.Topic>
                  ))}
              </ul>
          </Widget.Content>
        </Widget>
    )
}

function LoadingWidget() {
    return(
        <Widget>
          <Widget.Header>Carregando...</Widget.Header>
          <Widget.Content style={{textAlign: 'center'}}>
              Did you feel that?
          </Widget.Content>
          <img 
          style={{width: '100%', padding: '0px 20px 20px', borderRadius: '1.2rem', }} 
          src={"https://media.giphy.com/media/t49DdnoviCLrG/giphy.gif"}/>
        </Widget>
    )
}



//QuestionWidget vai receber a question: QuestionWidget({question})
function QuestionWidget ({question, totalQuestions, questionIndex, onSubmit, addResult}) {
    const router = useRouter()
    console.log(router)
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
    const questionId = `question__${questionIndex}`;
    const isCorrect = selectedAlternative === question.answer;
    const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
    const hasAlternativeSelected = selectedAlternative !== undefined;
    return(
            <>
            <Head> 
                <title>Jurassic Quiz</title>
            </Head>
            <Widget>
                <Widget.Header>
                    <BackLinkArrow href={'/'}/>
                    <img 
                    alt="Descrição"
                    style={{
                    width: '40px',
                    objectFit: 'cover',
                    }}
                    src="https://cdn-icons-png.flaticon.com/512/1031/1031366.png"
                    />
                    <h3>
                        {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
                    </h3>
                    <img 
                    alt="Descrição"
                    style={{
                    width: '40px',
                    objectFit: 'cover',
                    }}
                    src="https://cdn-icons-png.flaticon.com/512/1031/1031366.png"
                    />
                </Widget.Header>

                <img 
                alt="Descrição"
                style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                }}
                src={question.image}
                />


                <Widget.Content>
                    <h2>{question.title}</h2>
                    <p>
                        {question.description}
                    </p>




                    <AlternativesForm onSubmit={(infosDoEvento) => {
                        infosDoEvento.preventDefault()
                        setIsQuestionSubmited(true)
                        setTimeout(() => {
                            addResult(isCorrect)
                            setIsQuestionSubmited(false)
                            setSelectedAlternative(undefined)
                            onSubmit()
                        }, 2000)

                    }}>
                        {question.alternatives.map((alternative, alternativeIndex) => {
                            const alternativeId = `alternative__${alternativeIndex}`
                            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
                            const isSelected = selectedAlternative === alternativeIndex;

                            return (
                                <Widget.Topic as="label" key={alternativeId} htmlFor={alternativeId} data-selected={isSelected} data-status={isQuestionSubmited && alternativeStatus}>
                                    {alternative}
                                    <input name={questionId} id={alternativeId} disabled={isQuestionSubmited} onChange={() => setSelectedAlternative(alternativeIndex)} type="radio"/>                     
                                </Widget.Topic>
                            )
                        })}
                        <Button style={{marginBottom: '14px'}} type="submit" disabled={!hasAlternativeSelected}>Confirmar</Button>

                        {isQuestionSubmited && isCorrect && <CorrectButton
                        style={{background: `${db.theme.colors.success}`, textAlign: "center"}} 
                        >Você acertou!
                        </CorrectButton>}

                        {isQuestionSubmited && !isCorrect && <CorrectButton
                        style={{background: `${db.theme.colors.wrong}`, textAlign: "center"}}
                        >Você errou!</CorrectButton>}

                    </AlternativesForm>
                </Widget.Content>
            </Widget>
            </>
    )
}


const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
}

export default function QuizPage() {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const [results, setResults] = React.useState([]);
    const totalQuestions = db.questions.length;
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];

    function addResult(result) {
        setResults([
            ...results,
            result,
        ]);
    }

    React.useEffect(() => {
        // fetch() ...
        setTimeout(() => {
        setScreenState(screenStates.QUIZ);
        }, 1 * 4000);
      // nasce === didMount
      }, []);

    //[React chama de: Efeitos // Efects]
    //React.useEffect
    //nasce === didMount
    //atualizado === willUpdate
    //morre === willUnmount


    function handleSubmitQuiz() {
        const nextQuestion = questionIndex + 1;
        if (nextQuestion < totalQuestions) {
            setCurrentQuestion(nextQuestion);
        } else {
            setScreenState(screenStates.RESULT);
        }
    } 

    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuizLogo />

                {screenState === screenStates.QUIZ && (
                    <QuestionWidget question={question} 
                    questionIndex={questionIndex}
                    totalQuestions={totalQuestions}
                    onSubmit={handleSubmitQuiz}
                    addResult={addResult}/>
                )}
               

                {screenState === screenStates.LOADING && <LoadingWidget />}

                {screenState === screenStates.RESULT && <ResultWidget results={results}/>}
                
            </QuizContainer>
        </QuizBackground>
    )
}