import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { User } from "../../types/User";
import type { RootState } from '../../app/store';
import { editUser } from "./UsersSlice";

const EditUser = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const users = useSelector((store: RootState) => store.usersAPI)
  const navigate = useNavigate();
  const existingUser = users.users.filter((user:User) => String(user.id) === params.id);
  console.log('user.id' + typeof(users.users[0].id));
  console.log('user.id' + typeof(params.id));
  const {name, email} = existingUser[0];
  const [values, setValues] = useState<User>({
    name: {
      firstname: name.firstname,
      lastname: name.lastname
    },
    email
  });

  const handleEditUser = () => {
    setValues({
      name:{firstname:'',lastname:''},
      email:''
    })
    dispatch(editUser({
      id: params.id,
      name: values.name,
      email: values.email
    }));
    navigate('/');
  }

  return (
    <div className="mt-10 max-w-xl mx-auto">
      <TextField
        label="Primeiro Nome"
        inputProps={{type: "text", placeholder: "Seu primeiro nome"}}
        value={values.name.firstname}
        onChange={
          (event: React.FormEvent<HTMLInputElement>)=>
            setValues(
              {
                ...values, 
                name: {firstname: event.currentTarget.value, lastname: values.name.lastname}
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
      <Button onClick={()=> handleEditUser()}>
        Editar
      </Button>
    </div>
  )
}

export default EditUser;