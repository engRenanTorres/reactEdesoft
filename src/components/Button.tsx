const Button = ({onClick, children}:{onClick:any, children:string}) => {
  return (
    <button 
    className="bg-indigo-600  text-white py-2 px-6 my-10 roundedhover:bg-indigo-700"
      onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;