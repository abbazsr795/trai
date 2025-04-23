"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../(store)/store";
import { setLabel, setDescription, setLocation, clearLabel, clearDescription, clearLocation } from "../(store)/slices/item";
import supabase from "../(supabase)/config";

export default function NewItem() {

    const dispatch = useDispatch();


    const label = useSelector((state: RootState) => state.item.label);
    const description = useSelector((state: RootState) => state.item.description);
    const location = useSelector((state: RootState) => state.item.location);

    const handleNewItem = async () => {
        const { data, error } = await supabase
        .from('item')
        .insert([
            { 
                label: label,
                description: description,
                location: location
            },
        ])

        console.log(data);
        console.log(error);

        dispatch(clearLabel());
        dispatch(clearDescription());
        dispatch(clearLocation());
    }

    return(
        <div>
            <h1>label</h1>
            <input onChange={(e) => dispatch(setLabel(e.target.value))} type="text" placeholder="Label" />
            <h1>location</h1>
            <input onChange={(e) => dispatch(setLocation(e.target.value))} type="text" placeholder="Location" />
            <h1>description</h1>
            <input onChange={(e) => dispatch(setDescription(e.target.value))} type="text" placeholder="Description" />
            <button onClick={(e) => handleNewItem()}>Submit</button>
        </div>
    ) 
}