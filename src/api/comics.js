

export async function getComic(comic) {
    try{
        const response = await fetch(comic+"/info.0.json");
        if(!response.ok){
            throw new NetworkError()
        }
        const data = await response.json();
        return data;
    }catch(err){
        throw err;
    }
}

class NetworkError extends Error{
    constructor() {
        super("Network error")
    }
}