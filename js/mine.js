var siteName= document.getElementById("bookSiteName")
var siteUrl= document.getElementById("bookSiteUrl")
var btnSubmit= document.getElementById("btnSubmit")
var booksarr=[]
var urlRegex=/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/
var nameRegex = /^\w{3,}$/



if(localStorage.getItem("ourlocalStorage") !=null )
{
    booksarr= JSON.parse(localStorage.getItem("ourlocalStorage"));
    displayTable(booksarr);
}

// push..name-Url to ==> table  
btnSubmit.addEventListener("click", function()
{
    if(    siteName.classList.contains("is-valid") && siteUrl.classList.contains("is-valid"))
    {
        var bookarr= 
        {
            siteName: siteName.value ,
            siteUrl : siteUrl.value ,
        } ;
    
        booksarr.push(bookarr);
    
        localStorage.setItem("ourlocalStorage" , JSON.stringify(booksarr))
    
        clearInput()
        displayTable(booksarr);
    
        siteName.classList.remove("is-valid");
        siteUrl.classList.remove("is-valid");

    }


})

// clear inputs ==>
function clearInput() {
    siteName.value = "";
    siteUrl.value = "";
  }

// display siteName , siteUrl ==> table 
  function displayTable(arr)
  {
    var bookCartona="";
    for( var i=0 ; i < arr.length ; i++)
    {
        bookCartona += `
      <tr>
        <td>${i+1}</td>
        <td>${arr[i].siteName}</td>
        <td>       
        <a href="${arr[i].siteUrl}" target="_blank" class="btn btn-warning">
        <i class="fa-solid fa-eye pe-2"></i>
        Visit</a>
       </td>
        <td><button class="btnVisit btn btn-danger" id="btnDelete" onclick="deletebookmark(${[i]})" > <i class="fa-solid fa-trash"></i> Delete</button></td>
        

        </tr>
        ` 
    }
    document.getElementById("tableContent").innerHTML=bookCartona

  }

  function deletebookmark(index)
{
    booksarr.splice( index , 1  );

    localStorage.setItem("ourlocalStorage" , JSON.stringify(booksarr) );

    displayTable(booksarr)
}
  

siteName.addEventListener("input", function () {
    validate(siteName, nameRegex);
  });
  
  siteUrl.addEventListener("input", function () {
    validate(siteUrl, urlRegex);
  });
  
  function validate(element, regex) {
   var testRegex = regex
   if(testRegex.test(element.value)){
      element.classList.add("is-valid")
      element.classList.remove("is-invalid")
      btnSubmit.removeAttribute("data-bs-toggle","modal")
      btnSubmit.removeAttribute("data-bs-target","#exampleModalToggle")

   }else{
      element.classList.remove("is-valid")
      element.classList.add("is-invalid")
      btnSubmit.setAttribute("data-bs-toggle","modal")
      btnSubmit.setAttribute("data-bs-target","#exampleModalToggle")

   }
  }
  
