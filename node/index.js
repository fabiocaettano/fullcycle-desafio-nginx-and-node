const http =  require('http')
const mysql = require('mysql')
const port = 3000
var conteudo = "";

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const connection1 = new mysql.createConnection(config);

connection1.connect(
    function (err) { 
    if (err) { 
        console.log("!!! Cannot connect !!! Error:");
        throw err;
    }
    else
    {
       console.log("Connection established.");       
    }
});

const sql0 = `GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root'`
connection1.query(sql0)

const sql1 = `DROP TABLE IF EXISTS people`
connection1.query(sql1,function(err,rows,fields){
    if (err) throw err;
    console.log('Tabela excluida')
})

const sql2 = `CREATE TABLE people (id int not null auto_increment, name varchar(255), primary key(id))`
connection1.query(sql2,function(err,rows,fields){
    if (err) throw err;    
    console.log('Tabela criada')
})

const sql3 = `INSERT INTO people(name) values ('Fabio')`
connection1.query(sql3,function(err,rows,fields){
    if (err) throw err;    
    console.log('Inserted ' + rows.affectedRows + ' row(s).');
});

const sql4 = `INSERT INTO people(name) values ('Michele')`
connection1.query(sql4)

const sql5 = `INSERT INTO people(name) values ('Sophia')`
connection1.query(sql5)

const sql6 = `INSERT INTO people(name) values ('Amora')`
connection1.query(sql6)

connection1.end()


async function setRespostaHtml(cb){        

    const connection2 = new mysql.createConnection(config);

    const sql7 = `SELECT * FROM people`

    await connection2.query(sql7,function(err,rows,fields){
               
       console.log(rows)     

       conteudo = "<h1>Full Cycle Rocks!</h1>"
       conteudo += "<ul>"
       
       for(i = 0; i < rows.length;  i++){
            console.log('Values: ',rows[i].name);

            conteudo += "<li>" + rows[i].name + "</li>"
        }
        
        conteudo += "</ul>"
        
    });  

    await connection2.end()
    
    return cb(conteudo);
}

const server = http.createServer((req,res)=>{
    setRespostaHtml(respostaSql => {
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.write(conteudo,'utf-8');
        res.end()
    })
    
})

server.listen(port,()=>{
    console.log('Rodando na Porta ' + port)
})