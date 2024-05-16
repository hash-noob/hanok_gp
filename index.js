document.getElementById('insert').addEventListener("click", ()=>{
    var id1 = document.getElementById('id').value;
    var name1 = document.getElementById('name').value;
    var dept1 = document.getElementById('dept').value;

    axios.post('http://localhost:3000/insert',{
        id:id1,
        name:name1,
        dept:dept1
    }).then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
})

document.getElementById('display').addEventListener("click",async ()=>{
    var res = document.getElementById('result');
    var tab = `<table><thead><th>ID</th><th>Name</th><th>Dept</th></thead>`;
    
    axios.get("http://localhost:3000/display").then((data)=>{
        for(let i of data.data){
            // console.log(i.id + " " + i.name + " " + i.dept)
            tab += `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.dept}</td></tr>`;
        }
        tab += '</table>'
        res.innerHTML = tab;
        
    }).catch((error)=>{
        console.log(error)
    });
    // data.then((data)=>console.log(data), (error)=>console.log(error))
    
})


document.getElementById('delete').addEventListener("click", ()=>{
    var id1 = document.getElementById('id').value;
    axios.post('http://localhost:3000/remove',{
        id:id1
    }).then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
})