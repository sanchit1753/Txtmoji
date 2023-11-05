

function encryption() {
    document.querySelector("#encrypt-btn").addEventListener('click', function () {
        var clutter = "";
        // Get the input
        var input = document.getElementById("txtmsg").value;
        console.log(input); 
        // Get the password
        var password = document.getElementById("enc-password").value;
        
        if(input!='' && password!=''){
            document.querySelector("#enc-result").style.display = "block";
            }

        // Converting it into a Set of Emoji
        const str = input.split("");
        str.forEach(element => {
            clutter += `&#128${element.charCodeAt()} `
        });
        

        // Showing Result
        document.querySelector("#enc-result").innerHTML = clutter;
        

        // Storage in localStorage
        var dataArr = [];
        if (JSON.parse(localStorage.getItem('data'))) {
            dataArr = JSON.parse(localStorage.getItem('data'))
            dataArr.push({ "pass": password, "input": input, "clutter": clutter })
        }
        else {
            dataArr = [{ "pass": password, "input": input, "clutter": clutter }]
        }

        localStorage.setItem('data', JSON.stringify(dataArr));          
    })
}

function decryption(){
    document.querySelector("#decrypt-btn").addEventListener("click", function () {
    var clutter2 = '';
    var input = document.querySelector("#emojimsg").value;
    var password = document.querySelector("#dec-password").value;
    var user = JSON.parse(localStorage.getItem('data'));
    

    var str = input.split(" ");
    str.forEach(element => {
        clutter2 += `&#${(element.codePointAt(0))} `
    });
    

    var found;
    var flag = 0;
    for(let i of user){
        if(i.clutter==clutter2 && i.pass==password){
            found = i;
            flag = 1;      
        }
    }
    
    
    if(flag==1){
        document.querySelector("#dec-result").innerHTML = found.input;
        document.querySelector("#dec-result").style.display = "block";
        document.querySelector("#dec-result").style.backgroundColor = "#25d366";
        document.querySelector("#dec-result").style.color = "black";
        console.log("found");
    }
    else{
        document.querySelector("#dec-result").innerHTML = "Incorrect Password/No Emojis Found :(";
        document.querySelector("#dec-result").style.display = "block";
        document.querySelector("#dec-result").style.backgroundColor = "#fca5a5";
        document.querySelector("#dec-result").style.color = "red";
        console.log("not found");
    }
  })
}






function btnClick() {
    document.querySelector("#decrypt").addEventListener('click', function () {
        document.querySelector("#decryption").style.display = "block";
        document.querySelector("#encryption").style.display = "none";
        document.querySelector("#decrypt").style.backgroundColor = "#333";
        document.querySelector("#encrypt").style.backgroundColor = "#222";
        document.querySelector("#main>h1 span img").style.rotate = "270deg";
        document.querySelector("#enc-result").style.display = "none";
        document.querySelector("#txtmsg").value = "";
        document.querySelector("#enc-password").value = "";
    })

    document.querySelector("#encrypt").addEventListener('click', function () {
        document.querySelector("#encryption").style.display = "block";
        document.querySelector("#decryption").style.display = "none";
        document.querySelector("#encrypt").style.backgroundColor = "#333";
        document.querySelector("#decrypt").style.backgroundColor = "#222";
        document.querySelector("#main>h1 span img").style.rotate = "90deg";
        document.querySelector("#dec-result").style.display = "none";
        document.querySelector("#emojimsg").value = "";
        document.querySelector("#dec-password").value = "";
    })

    

    // document.querySelector("#decrypt-btn").addEventListener('click', function () {
    //     document.querySelector("#result").style.display = "block";
    // })

}

encryption();
decryption();
btnClick();