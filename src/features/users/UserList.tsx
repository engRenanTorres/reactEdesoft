import type { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { deleteUser } from './UsersSlice';
import { useEffect, useState } from 'react';
import { getUsers } from './UsersSlice';
import SectionLoading from '../../components/SectionLoading';

function UserList () {  
  const dispatch = useDispatch<AppDispatch>();
  const usersAPI = useSelector((store: RootState) => store.usersAPI);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  let status = "loading";

  const nameFormatter = (string:string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  
  const hadleRemoveUser = (id:string) => {
    dispatch(deleteUser({id: id}));
    
  }
  useEffect(()=>{
    dispatch(getUsers());
    status = usersAPI.status;
    setIsLoadingUsers(false)
  },[dispatch,status])

  
  
  const renderCard = () => usersAPI.users.map( user => (
    <div 
      className="bg-gray-300 p-5 flex items-center justify-between"
      key={user.id}>
      <div>
        <h3 className="font-bold text-lg text-gray-700">{nameFormatter(user.name.firstname)} {nameFormatter(user.name.lastname)}</h3>
        <span className="font-normal text-gray-600">{user.email}</span>
      </div>
      <div className="flex gap-4">
        <Link to={`edit-user/${user.id}`}>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </Link>
        <button
        onClick={() => hadleRemoveUser(String(user.id))}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

    </div>
  ))

  return (
    <>
      
      <Link to="/add-user"><Button onClick={()=>{}}>Adiciona Usuário</Button></Link>
      {usersAPI.status === "loading" && <SectionLoading />}
      <div className="grid gap-5 md:grid-cols-2">
        {usersAPI.users.length ? renderCard() : <p className="text-center col-span-2 text-gray-700 font-semibold">Usuários não encontrados</p>}
      </div>
    </>
  )
}

export default UserList;
