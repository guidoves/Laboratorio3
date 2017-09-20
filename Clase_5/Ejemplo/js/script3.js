window.addEventListener('load',()=>{
    
        var frm = document.getElementById('miFormulario');
        
        frm.addEventListener('submit',enviarDatos);
    
    
    });

    var xhr; //xhr XMLHTTPREQUEST

    function enviarDatos(e){

        e.preventDefault();
        enviarFormulario();
    }
    
    function enviarFormulario(){

        var nombre = document.getElementById('txtNombre').value;
        var edad = document.getElementById('txtEdad').value;
    
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = gestionarRespuesta;
        xhr.open('GET','pagina1.php?nombre=' + nombre + "&edad=" + edad,true);
        xhr.send();
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