import ListItem from "./ListItem"

const List = (props) => {
    const {list} = props;

    const result = list.map((item) => {
        return(
            <ListItem desc={item.desc} deadline={item.deadline}/>
        )
    })

    return(
        <ul className="list">
            {result}
        </ul>
    )
}

export default List;
