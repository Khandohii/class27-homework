const ListItem = (props) => {
    const {description, id, status} = props.data;

    const descText = !status ? description : <s>{description}</s>

    return(
        <li className="list-item">
            <div key={id} className="list-item__desc">{descText}</div>
            <input type="checkbox" onChange={(e) => props.changeStatus(e.target.checked, id)} name="done" id="" />
            <br />
            <button onClick={() => props.deleteItem(id)}>Delete</button>
        </li>
    )
}

export default ListItem;
