const ListItem = (props) => {
    return(
        <li className="list-item">
            <div className="list-item__desc">{props.desc}</div>

            <div className="list-item__deadline">{props.deadline}</div>
        </li>
    )
}

export default ListItem;
