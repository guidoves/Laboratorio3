
window.addEventListener('load',()=>{
    
        var btnLeer = document.getElementById('btnLeer');
        
        btnLeer.addEventListener('click',enviar);
    
    
    });
    
    var xhr;
    
    function enviar(){
    
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = gestionarRespuesta;
        xhr.open('GET','prueba.txt',true);
        xhr.send();
        
        alert("HOLA");
    }
    
    function gestionarRespuesta(){
    
        var div = document.getElementById('contenedor');
    
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                div.innerHTML = xhr.responseText;
    
            }
            else{
    
                div.innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
            }
            
    
        }
        else{
            
            div.innerHTML = '<img src="img/gif.gif">';
        }
    
    }