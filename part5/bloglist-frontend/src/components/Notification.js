const Notification = ({ messages, showElement, category }) => showElement ? <p className={category}>{messages}</p> : <></>



export default Notification