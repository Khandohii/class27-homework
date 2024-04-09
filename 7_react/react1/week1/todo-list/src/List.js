import ListItem from "./ListItem"

const List = (props) => {
    const {list, changeStatus} = props;

    const content = (list) => {
        const result = list.map((item) => {
            return(
                <ListItem data={item} changeStatus={changeStatus} key={item.id} deleteItem={props.deleteItem}/>
            )
        })

        if (list.length === 0) {
            return "No items";
        } else{
            return result;
        }
    }

    const result = content(list);

    return(
        <ul className="list">
            {result}
        </ul>
    )
}

export default List;
