import styled from 'styled-components'
import { Link } from 'react-router-dom';

export const Container = styled.div`
max-width: 700px;
background: #ffff;
border-radius: 4px;
box-shadow: 00 0 20px rgba(0,0,0,0.2);
padding: 30px;
margin: 80px auto;
`

export const Ownre = styled.header`
display: flex;
flex-direction: column;
align-items: center;

img{
    width: 150px;
    border-radius: 20%;
    margin: 20px 0 ;
}

h1 {
    font-size:30px;
    color: #0D2636
}

P{
    margin-top: 5px;
    font-size: 14px;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
}


`;

export const Loading = styled.div`
 color: #ffffff; 
 display: flex;
 justify-content: center;
 align-items: center;
 height: 100vh;
 `

export const BackButton = styled(Link)`
    border: 0;
    outline: 0;
    background: transparent;

 `
export const IssuesList = styled.ul`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li{
    display: flex;
    padding: 15px 10px;

    &+li{
        margin-top: 12px;
    }
  }
img{
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #0D2636;
}

div{
 
    flex: 1;
    margin-left: 12px;

    p{
        margin-top: 10px;
        font-size: 12px;     
    }
}

strong{
 font-size: 15px;
 display:flex;
 align-items: center;

 a{
    text-decoration: none;
    color: #222;
    transition: 0.3s;
    line-height:20px;

    &:hover{
        color: #0071db;
    }
 }

 span{
    background-color: #222;
    color: #eee;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 600;
    margin-left: 10px;
    padding: 4px 7px;
    text-align:center
 }

}
 `

export const PageActions = styled.div`
display: flex;
justify-content: space-between;

button{
    outline: 0;
    border: 0;
    background: #222;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;

    &:disabled{
        cursor: not-allowed;
        opacity: 0.5;
    }
}

`
export const FilterList = styled.div`
margin: 15px 0;

button{
    outline: 0;
    border: 0;
    padding: 8px;
    border-radius: 4px;
    margin: 0 3px;
    
    &:nth-child(${props=> props.active +1}){
        background: #0071db ;
        color:#fff
    }
}

`



