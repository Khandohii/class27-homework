import { useState } from "react";
import Border from "./Border";
import PropTypes from 'prop-types';

const ListItem = (props) => {
    const [description, setDescription] = useState(props.data.description)
    const {id, status, deadline, updating} = props.data;


    const descText = !status ? description : <s>{description}</s>

    const descriptionBox = !updating ?
        <div className="list-item__desc">{descText}</div>
        :
        <input type="text" value={description} name="description" onChange={(e) => setDescription(e.target.value)} />;

    const editBtn = !updating ?
        <button onClick={() => props.editItem(id)}>Edit</button>
        :
        <button onClick={() => props.updateItem(id, description)}>Update</button>;

    return(
        <li key={id} className="list-item">
            <Border>
                {descriptionBox}
                <div className="list-item__deadline">{deadline}</div>
                <input type="checkbox" onChange={(e) => props.changeStatus(e.target.checked, id)} name="done" id="" />
                <br />
                <button onClick={() => props.deleteItem(id)}>Delete</button>
                {editBtn}
            </Border>
        </li>
    )

}

ListItem.propTypes = {
  data: PropTypes.object,
};

export default ListItem;
