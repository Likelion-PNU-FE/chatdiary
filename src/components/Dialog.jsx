import './Dialog.scss';

const Dialog = ({isOpen, setOpen, style, children}) => {
  return (
    <div className={`dialog ${isOpen ? 'open' : ''}`}>
      <div className="content" style={style}>
        <button className="close" onClick={() => setOpen(false)}>ㄨ</button>
        {children}
      </div>
    </div>
  );
}

export default Dialog;