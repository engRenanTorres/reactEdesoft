import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { User } from "../../types/User";
import type { RootState } from '../../app/store';
import { editUser } from "./UserSlice";

const EditUser = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const users = useSelector((store: RootState) => store.users)
  const navigate = useNavigate();
  const existingUser = users.filter((user:User) => user.id === params.id);
  const {name, email} = existingUser[0];
  const [values, setValues] = useState<User>({
    name,
    email
  });

  const handleEditUser = () => {
    setValues({
      name:'',
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
        label="Nome"
        inputProps={{type: "text", placeholder: "Seu nome"}}
        value={values.name}
        onChange={
          (event: React.FormEvent<HTMLInputElement>)=>
            setValues(
              {
                ...values, 
                name: event.currentTarget.value
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