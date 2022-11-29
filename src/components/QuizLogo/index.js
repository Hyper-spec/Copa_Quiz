import styled from 'styled-components';

const QuizLogo = styled.img`
  margin: auto;
  width: 150px;
  display: flex;
  align-items: center;
  background-color: ${({theme}) => theme.colors.widget};
  border-radius: 50%;
  justify-content: center;
  @media screen and (max-width: 500px) {
    width: 100px;
    margin: auto;
    display: flex;
    justify-content: center;
  }
`;
export default QuizLogo;