export function status(res) {
    if( res.ok){
        return res.json();
    }
    throw new Error(res.statusText);
}