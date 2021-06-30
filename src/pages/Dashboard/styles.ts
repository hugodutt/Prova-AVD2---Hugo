import styled from "styled-components"

 export const Container = styled.div`
form{
  display: flex ;
  flex-direction: column;
}

input{
  margin-top: 15px;
  border-radius: 5px;
  border:none;
  height: 30px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  background-color: #cfcfcf;
  color: white;
  padding: 5px;
}
input::placeholder{
color:white;

}
input:hover{
  background-color: #b0b0b0;
}

button{
  margin-top: 20px;
  border: none;
  height: 40px;
  border-radius: 5px;
  background-color: #e32d4c;
  color:white;

}
button:hover{
  background-color: #ad1f37;
}


h1{
  text-align: center;
  padding: 0;
  margin: 0px;
}

div{
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

table,
th{
  border: none;
  padding: 10px;
  font-size: 18px;
}

table button{
  width: 8rem;
  margin-right: 5px;
}

tr:first-of-type{
  background-color: #cfcfcf;
  border-radius: 5px;
}
`;

