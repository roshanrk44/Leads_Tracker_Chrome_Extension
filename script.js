const inputBtn = document.getElementById("input-btn")
let myLeads=[];

const inputEl =document.getElementById("input-el");
const ulEl =document.getElementById("ul-el");

const LeadsfromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if(LeadsfromLocalStorage) {
    myLeads=LeadsfromLocalStorage;
    render(myLeads);
}
const tabs=[
    {url:"https://www.linkedin.com/in/per-harald-borgen/"}
]
const tabBtn = document.querySelector("#tab-btn");
tabBtn.addEventListener("click",function(){
    // console.log(tabs[0].url);
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        render(myLeads);
    });
})

const deleteBtn = document.getElementById("delete-btn");
deleteBtn.addEventListener("click", function(){
    localStorage.clear();
    myLeads=[];
    render(myLeads);
})

inputBtn.addEventListener("click", function () {
    // console.log("Button clicked from event listener!"); 
    myLeads.push(inputEl.value);
    inputEl.value="";
    localStorage.setItem("myLeads",JSON.stringify(myLeads)); 
    render(myLeads);

    console.log(localStorage.getItem("myLeads"));
})

function render(leads) {
    let listItems ="";
    // let myLeads_ = JSON.parse(localStorage.getItem("myLeads"));
    for(let i=0;i<leads.length;i++) {
        // listItems += "<li><a target='_blank' href="+myLeads[i]+">"+myLeads[i]+"</a></li>";
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>${leads[i]}</a>
        </li>`;
        
    }
    ulEl.innerHTML = listItems;
}

// for(let i=0;i<myLeads.length;i++) {
//     ulEl.innerHTML+="<li>"+myLeads[i]+"</li>";
//     // const k = document.createElement("li");
//     // k.textContent = myLeads[i];
//     // ulEl.append(k);
// }
