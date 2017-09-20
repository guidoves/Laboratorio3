
    window.addEventListener('load',()=>{
        
            var btnEnviar = document.getElementById('btnEnviar');
            
            btnEnviar.addEventListener('click',enviar);
        
        
        });
        
        var xhr;
        
        function enviar(){
        
            var nombre = document.getElementById('txtNombre').value;
            var edad = document.getElementById('txtEdad').value;
        
            xhr = new XMLHttpRequest();
            xhr.onreadystatechange = gestionarRespuesta;
            xhr.open('GET','pagina1.php?nombre=' + nombre + "&edad=" + edad,true);
            xhr.send();
            
        
        }
        
        function gestionarRespuesta(){
        
            var div = document.getElementById('mensaje');
        
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