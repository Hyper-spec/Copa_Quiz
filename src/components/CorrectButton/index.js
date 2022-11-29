import styled from 'styled-components';

export const CorrectButton = styled.h1`
  width: 100%;
  background-color: ${({theme}) => `${theme.colors.primary}`};
  padding: 10px 16px;
  font-weight: 700;
  font-size: 14px;
  border-radius: ${({theme}) => `${theme.borderRadius}`}
`;

export default CorrectButton;