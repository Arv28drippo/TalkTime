var firebaseConfig = {
    apiKey: "AIzaSyDOf0NXpbnHcZ12pz8HnK_TE5GxMGGl8sM",
    authDomain: "kwitter-9dd3a.firebaseapp.com",
    databaseURL: "https://kwitter-9dd3a-default-rtdb.firebaseio.com",
    projectId: "kwitter-9dd3a",
    storageBucket: "kwitter-9dd3a.appspot.com",
    messagingSenderId: "458222142642",
    appId: "1:458222142642:web:9fb91115d072664c34f5ab"
  };
  
  firebase.initializeApp(firebaseConfig);
  
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send()
{
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
    
          name:user_name,
          message:msg,
          like:0
    });
document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
       
       console.log(firebase_message_id);
       console.log(message_data);
       name = message_data['name'];
       message = message_data['message'];
       like = message_data['like'];
       name_with_tag = "<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
       message_with_tag = "<h4 class='message_h4'>"+message+"</h4>";
       like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
       span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";

       row = name_with_tag+message_with_tag+like_button+span_with_tag;
       document.getElementById("output").innerHTML += row;
    } });  }); }
getData();

function updateLike(message_id)
{
    console.log("clicked on like button" + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    update_like = Number(likes) + 1;
    console.log(update_like);

    firebase.database().ref(room_name).child(button_id).update({
          like : update_like
    });   
}

function logout()
{
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

function back()
{
    window.location = "kwitter_room.html";
}