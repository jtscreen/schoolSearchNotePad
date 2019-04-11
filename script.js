const schoolName = document.getElementById("school");
const prosList = document.getElementById("prosNote");
const consList = document.getElementById("consNote");

const button = document.getElementById("submit");
button.addEventListener("click", updateDB);

const database = firebase.database().ref();

function updateDB(event){
    event.preventDefault();
    const college = schoolName.value;
    const pro = prosList.value;
    const con = consList.value;

    prosList.value = "";
    consList.value  = "";
    schoolName.value = "";

    console.log(college+":"+pro +":"+con)
    //Update database here
    const data = {
        SCHOOL: college,
        PROS: pro,
        CONS: con,
    }
    database.push(data);
}

database.on('child_added', addToList);

function addToList(rowData){
    const row = rowData.val();
    const name = row.SCHOOL;
    const pros = row.PROS;
    const cons = row.CONS;

    let collegeDiv = document.getElementById("list")
    let title = document.createElement("h2");
    let para = document.createElement("p");
    title.innerText = `${name}`;
    para.innerText = `PROS\n${pros}\n\nCONS\n${cons}`
    collegeDiv.appendChild(title);
    collegeDiv.appendChild(para);
}