import './Dialog.scss';

const Dialog = ({isOpen, setOpen, width, children}) => {
  return (
    <div className={`dialog ${isOpen ? 'open' : ''}`}>
      <div className="content" style={{width: width ? width : 'auto'}}>
        <button className="close" onClick={() => setOpen(false)}>X</button>
        {children}
      </div>
    </div>
  );
}

export default Dialog;