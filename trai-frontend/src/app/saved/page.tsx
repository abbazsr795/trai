"use client";

import supabase from "../(supabase)/config";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../(store)/store";
import { clearItemList, addItemList, setItemList } from "../(store)/slices/itemList";
import { use, useEffect } from "react";

export default function Saved() {
    const ItemList = useSelector((state: RootState) => state.itemList.items);
    const dispatch = useDispatch();

    const fetchSavedItems = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();

        if(user != null) {
            let { data: savedItems, error } = await supabase
            .from('savedItems')
            .select('itemId')
            .eq('userId', user.id)
            if (!savedItems) {
                console.error('Error fetching saved items:', error);
            } else {
                for(let i = 0; i < savedItems.length; i++) {
                    let { data: item, error } = await supabase
                    .from('item')
                    .select('*')
                    .eq('itemId', savedItems[i].itemId)
                    
                    if (!item) {
                        console.error('Error fetching item:', error);
                    } else {
                        dispatch(addItemList(item[0]));
                    }
                }
            }
            // console.log(savedItems);
            // console.log(error);
            // console.log(user.id);
        
        }
    };

    useEffect(() => {
        fetchSavedItems();
    }, []);

    return (
        <div>
            <h1>Saved Items</h1>
            <button onClick={(e) => console.log(ItemList)}>Saved Items</button>
        </div>
    )
}