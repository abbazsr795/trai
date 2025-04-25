"use client";

import supabase from "./(supabase)/config";

export default function Home() {

  const handleSaveItem = async (itemId : any) => {
    const { data: { user }, error } = await supabase.auth.getUser()
    if(user != null) {
      const { data, error } = await supabase
        .from('savedItems')
        .insert([
            { 
                userId : user.id,
                itemId : itemId
            },
        ])

        console.log(data);
        console.log(error);
    }else{
      console.log(error);
    }
  }

  return (
    <div>
      {/* <button onClick={(e) => handleSaveItem("04ccc448-73d9-42eb-8dfe-4703788793b3")}>Save Item</button> */}
    </div>
  );
}
