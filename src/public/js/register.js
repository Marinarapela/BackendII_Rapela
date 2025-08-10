const inputEmail=document.getElementById("email")
const inputPassword=document.getElementById("password")
const btnRegister=document.getElementById("btnRegister")
const inputEdad = document.getElementById("edad");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");

const divMensaje=document.getElementById("mensaje")

btnRegister.addEventListener("click", async (e)=>{
    e.preventDefault()

    let email = inputEmail.value.trim()
    let password = inputPassword.value.trim()
    let age = inputEdad.value.trim();
    let firstName = inputNombre.value.trim();
    let lastName = inputApellido.value.trim();

    if(!email || !password|| !age || !firstName|| !lastName){
        divMensaje.textContent=`Complete los datos..`
        setTimeout(()=>{
            divMensaje.textContent=""
        }, 3000)
        return
    }
        let response=await fetch ("/api/sessions/register",{
            method: "post",
            headers:{
                    "Content-Type":"application/json"
            }
            body: JSON.stringify({email,password, age, firstName, lastName})
        })

        let data=await response.json()
        if(response.status>=400){
            divMensaje.textContent=`Error: ${data.error}`
            setTimeout(()=> {
                divMensaje.textContent=""
            }, 3000)
        }else{
            window.location.href="/"
        }
})