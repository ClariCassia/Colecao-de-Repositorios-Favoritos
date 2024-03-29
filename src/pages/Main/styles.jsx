import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
max-width:700px ;
background-color: #fff;
border-radius: 4px;
box-shadow: 0 0 20px rgba(0,0,0, 0.2);
padding: 30px;
margin: 80px auto;

h1{
    font-size: 20px;
    display: flex;
    align-items: center;

    svg{
        margin-right: 10px;
    }
}`

export const Form = styled.form`
margin-top: 30px;
display: flex;

input{
flex: 1;
border: 1px solid ${props => (props.onError ? '#ff0000' : '#eee')};
padding: 10px 15px;
border-radius: 4px;
font-size: 17px;
}`;

const animate = keyframes`
from{
    transform: rotate(0deg);
}
to{
    transform: rotate(360deg);
}`

export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading
}))`
background-color:#0D2636 ;
border: 0;
border-radius: 4px;
margin-left: 10px;
padding: 0 15px;
display: flex;
justify-content: center;
align-items: center;

&[disabled]{
    cursor: not-allowed;
    opacity: 0.5;
}

${props => props.loading &&
        css`
svg{
    animation:${animate} 2s linear infinite
}

`
}
`

export const RepositoriesList = styled.ul`
list-style: none;
max-height: 100%;
margin-top: 20px;
padding: 10px;
border-radius: 4px;
display: flex;
flex-direction: column;

li{
  width: 100%;
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  & + li{
    border-top: 1px solid #eeee;
  }

  a{
    color:#0D2636 ;
    text-decoration: none;
  }
 
}
`;

export const DeleteButton = styled.button.attrs({
    type: 'button'
})`
 padding: 8px 7px;
 border: none;
 color: #0D2636;
 background: transparent;
 outline:0;
`;

export const ErrorSubmit = styled.p`
color: red;
font-size: 12px;
padding: 5px;
`





