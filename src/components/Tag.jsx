const Tag = (props) => {
    
    return <span className="card__tag">{props.titulo}</span>
}

export default Tag;


/* 
Otra opcion: desestructurando
const Tag = ({titulo}) => {
    return <span className="card__tag">{titulo}</span>
} 
*/