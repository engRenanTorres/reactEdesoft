import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { User } from "../../types/User";
import { addUser } from "./UsersSlice";
import { v4 as uuid } from 'uuid';


const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState<User>({
    name:{firstname:'', lastname:''},
    email:''
  });

  const handleAddUser = () => {
    setValues({
      name:{firstname:'', lastname:''},
      email:''
    })
    dispatch(addUser({
      id: uuid() ,
      name: values.name,
      email: values.email
    }));
    navigate('/');
  }

  return (
    <div className="mt-10 max-w-xl mx-auto">
      <TextField
        label="Nome"
        inputProps={{type: "text", placeholder: "Seu primeiro nome"}}
        value={values.name.firstname}
        onChange={
          (event: React.FormEvent<HTMLInputElement>)=>
            setValues(
              {
                ...values, 
                name: {firstname:event.currentTarget.value, lastname:values.name.lastname} 
              }
          )}
      />
      <br/>
      <TextField
        label="Sobrenome"
        inputProps={{type: "text", placeholder: "Seu sobrenome"}}
        value={values.name.lastname}
        onChange={
          (event: React.FormEvent<HTMLInputElement>)=>
            setValues(
              {
                ...values, 
                name: {firstname: values.name.firstname, lastname: event.currentTarget.value} 
              }
          )}
      />
      <br/>
      <TextField
        label="Email"
        inputProps={{type: "email", placeholder: "exemplo@email.com"}}
        value={values.email}
        onChange={
          (event: React.FormEvent<HTMLInputElement>)=>
            setValues(
              {
                ...values, 
                email: event.currentTarget.value
              }
          )}
      />
      <Button onClick={()=> handleAddUser()}>
        Salvar
      </Button>
    </div>
  )
}

export default AddUser;