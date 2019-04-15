const schoolName = document.getElementById("school");
const notesList = document.getElementById("thoughtNotes")
const prosList = document.getElementById("prosNote");
const consList = document.getElementById("consNote");

const button = document.getElementById("submit");
button.addEventListener("click", updateDB);

const database = firebase.database().ref();

function updateDB(event){
    event.preventDefault();
    const college = schoolName.value;
    const note = notesList.value;
    const pro = prosList.value;
    const con = consList.value;

    notesList.value = "";
    prosList.value = "";
    consList.value  = "";
    schoolName.value = "";

    console.log(college+":"+note+":"+pro +":"+con)
    //Update database here
    const data = {
        SCHOOL: college,
        NOTE: note,
        PROS: pro,
        CONS: con,
    }
    database.push(data);
}

database.on('child_added', addToList);

function addToList(rowData){
    const row = rowData.val();
    const name = row.SCHOOL;
    const note = row.NOTE;
    const pros = row.PROS;
    const cons = row.CONS;

    let collegeDiv = document.getElementById("list")
    let title = document.createElement("h2");
    let para = document.createElement("p");
    title.innerText = `${name}`;
    para.innerText = `NOTES\n${note}`
    if (pros != ""){para.innerText += `\n\nPROS\n${pros}`};
    if(cons != ""){`\n\nCONS\n${cons}`};
    collegeDiv.appendChild(title);
    collegeDiv.appendChild(para);
}