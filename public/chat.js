// Make connection
var socket = io.connect('https://10.14.15.72:4000');

var id;


// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

                       var xhr = new XMLHttpRequest();
			xhr.open('GET', 'https://10.14.15.72:4000/find', true);
			xhr.send();
			xhr.onreadystatechange = function(){
				   				
  		        if(this.readyState == 4 && this.status == 200) {  			
  			 	var jsonobj=xhr.responseText;		
  			 	var initalMessages=JSON.parse(jsonobj);
                                for(var x in initalMessages){
                                 feedback.innerHTML = '';
                                  output.innerHTML += '<p><strong>' + initalMessages[x].handler + ': </strong>' + initalMessages[x].msg + '</p>'; 
                                } 
  		        }}
// Emit events
btn.addEventListener('click', function(){
console.error(socket)
  send();
});
function listner(event){
var x=event.which||event.keyCode;
if(x==13)
send();
}
function send(){
  id=socket.id;
    socket.emit('chat', {
        message: message.value,
        handle: handle.value,
        id:id
    });
                        var xhr = new XMLHttpRequest();
			xhr.open('POST', 'https://10.14.15.72:4000/addMsg'+"?"+message.value+'*'+handle.value, true);
			xhr.send();
			xhr.onreadystatechange = function(){
				   				
  		   if(this.readyState == 4 && this.status == 200) {  			
  			 	var jsonobj=xhr.responseText;		
  			 	console.log(jsonobj);
  		 }
		};
    message.value = "";

}
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', function(data){
   if(id!=data.id){ 
    feedback.innerHTML = '';
    Push.create("New Message from:", {
    body:data.handle,
    icon: 'icon.jpeg',
    timeout: 4000,
    onClick: function () {
        window.focus();
        this.close();
    }
});
  }    
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
  
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
