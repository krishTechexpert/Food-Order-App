import { useEffect,useRef } from "react";
import { createPortal } from "react-dom";

function Modal({children,open,className='',closeOnEscKey}){
    const dialog=useRef();
    useEffect(() => {
      const modal=dialog.current;
      console.log('useeffect run')
      if(open){
        modal.showModal();
      }
      return () => {
        console.log('modal clean up run')
        modal.close();}
    },[open])

  return createPortal(
  <dialog ref={dialog} className={`modal ${className}`} onClose={closeOnEscKey}>{children}</dialog>,document.getElementById('modal'))
}
export default Modal;