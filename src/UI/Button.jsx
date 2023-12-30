function Button({children,textOnly,className,...props}){
  return <button className={textOnly?'text-button':'button'} {...props}>{children}</button>
}

export default Button;