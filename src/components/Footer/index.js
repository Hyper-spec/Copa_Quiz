import styled from 'styled-components'

// src/components/Footer/index.js
const FooterWrapper = styled.footer`
  background-color: #171B35;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  border-radius: 4px; 
  img {
    width: 68px;
    margin-right: 23px;
  }
  a {
    color: white;
    text-decoration: none;
    transition: .3s;
    &:hover,
    &:focus {
      opacity: .5;
    }
    span {
      text-decoration: underline;
    }
  }
`;

export default function Footer(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FooterWrapper {...props}>
      <a href="https://www.fifa.com">
        <img src="https://files.brandlogos.net/svg/2evITPu2ob/fifa-logo-brandlogos.net_ef027xqux.svg" alt="Logo Alura" />
      </a>
      <p>
        Saiba mais sobre
        {' '}
        a
        {' '}
        <a href="https://www.alura.com.br/">
          <span>instituição FIFA</span>
        </a>
      </p>
    </FooterWrapper>
  );
} 