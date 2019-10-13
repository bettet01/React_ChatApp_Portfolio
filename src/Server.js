

var API_URL = "https://us1.pusherplatform.io/services/chatkit/v6/fd95a29c-ae54-4deb-9622-a62f83ec36b5";




async function GetUser(id) {
    const api_call = await fetch(API_URL + "/users/" + id)
    const data = await api_call.json();
    console.log(data);
}


export default {GetUser}