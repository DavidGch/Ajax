addEventListener('load',inicializarEventos,false);

function desactivarSeleccion(e)
{
    return false
}


var xmlHttpRequest;

function inicializarEventos()
{
    document.onmousedown=desactivarSeleccion;
    document.onmousemove=desactivarSeleccion;
    xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = procesarEventos;
    xmlHttpRequest.open('GET','php/pagina1.php', true);
    xmlHttpRequest.send();
}

var datos;
var datosNuevos;
var vectorLetras = new Array();
var intervalo = null;
var pasos = 0;

function procesarEventos()
{
    if(xmlHttpRequest.readyState == 4)
    {
        datos = JSON.parse(xmlHttpRequest.responseText);
        crearLetras();
        intervalo = window.setInterval(recargarDatos, 5000);
    } 
}

function recargarDatos()
{
    xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = procesar;
    xmlHttpRequest.open('GET','php/pagina1.php', true);
    xmlHttpRequest.send();
}

function procesar()
{
    if(xmlHttpRequest.readyState == 4)
    {
        datosNuevos = JSON.parse(xmlHttpRequest.responseText);
        moverLetras();
    } 
}



function crearLetras()
{
    for(z = 0;z < datos.length;z++)
    {      
        var ob=document.createElement('div');
        ob.style.left = datos[z].x+'px';
        ob.style.top = datos[z].y+'px';
        ob.style.width = '17px';
        ob.style.height = '17px';
        ob.style.background = '#eee';
        ob.style.position = 'absolute';
        ob.style.fontSize = '18px';
        ob.style.padding = '3px';
        ob.style.cursor = 'pointer';
        ob.id = datos[z].codigo;
        ob.style.textAlign = 'center';
        var x = document.getElementById('prueba');
        x.appendChild(ob);
        var ref = document.getElementById(datos[z].codigo);
        ref.innerHTML = datos[z].letra;
        vectorLetras[z] = new Recuadro(ob,datos[z].letra,z+1,datos[z].x,datos[z].y);
    }
}


function actualizarCoordenadas(x, y, codigo)
{
    letra = {"x":x, "y":y, "codigo":codigo};
    xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('GET','php/pagina2.php?letras='+JSON.stringify(letra));
    xmlHttpRequest.send();
}


function moverLetras()
{
    
    for(z = 0;z<datosNuevos.length;z++)
    {
       if (datosNuevos[z].x!=datos[z].x || datosNuevos[z].y!=datos[z].y)
       {
           div = document.getElementById(datosNuevos[z].codigo);
           
           //Esto es lo que provoca que se mueva, aqui podriamos colocar la animación
           if (datosNuevos[z].x != datos[z].x)
           {
               div.style.left = datosNuevos[z].x;
           }
           
           if (datosNuevos[z].y != datos[z].y)
           {
               div.style.top = datosNuevos[z].y;
           }
       }
    } 
}


//Drag and Drop

Recuadro=function(div)
{
    tX = 0;
    tY = 0;
    difX = 0;
    difY = 0;
    div.addEventListener('mousedown',inicioDrag,false);

    function coordenadaX(e)
    {
        return e.pageX;
    }

    function coordenadaY(e)
    {
        return e.pageY;
    }

    function inicioDrag(e) 
    {
        var eX = coordenadaX(e);
        var eY = coordenadaY(e);
        var oX = parseInt(div.style.left);
        var oY = parseInt(div.style.top);
        difX = oX-eX;
        difY = oY-eY;
        document.addEventListener('mousemove',drag,false);
        document.addEventListener('mouseup',soltar,false);
    }

    function drag(e) 
    { 
        tX=coordenadaY(e)+difY+'px';
        tY=coordenadaX(e)+difX+'px'
        div.style.top=tX; 
        div.style.left=tY; 
    }


    function soltar(e)
    { 
        document.removeEventListener('mousemove',drag,false);
        document.removeEventListener('mouseup',soltar,false);
        actualizarCoordenadas(e.clientX, e.clientY, e.target.id);
    }

    this.retornarX=function()
    {
        return parseInt(div.style.left);
    }

    this.retornarY=function()
    {
        return parseInt(div.style.top);
    }

    this.fijarX=function(xx)
    {
        div.style.left = xx+'px'; 
    }

    this.fijarY=function(yy)
    {
        div.style.top = yy+'px'; 
    }
}