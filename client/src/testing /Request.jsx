export async function Request () {

  try{
    const response = await fetch(`/triviaGame?amount=5&category=17&difficulty=hard&type=boolean`); 
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    } 

    const data = await response.json();

    if(data.response_code != 0){
      console.log("no results found");
    }
    return data;
    
    } catch(error){
      console.error("error fetching data: ", error);
    } 
};

