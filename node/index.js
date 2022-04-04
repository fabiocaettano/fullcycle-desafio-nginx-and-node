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

//Iniciar conexão
const connection1 = new mysql.createConnection(config);

// Testar a Conexão
connection1.connect(
    function (err) { 
    if (err)throw err;
    console.log("Conexão estabelecida.");           
});

//Fila de query
var sql = new Array(9)
sql[0] = "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root'"
sql[1] = "DROP TABLE IF EXISTS people"
sql[2] = "CREATE TABLE people (id int not null auto_increment, name varchar(255), primary key(id))"
sql[3] = "INSERT INTO people(name) values ('Fabio')"
sql[4] = "INSERT INTO people(name) values ('Michele')"
sql[5] = "INSERT INTO people(name) values ('Sophia')"
sql[6] = "INSERT INTO people(name) values ('Amora')"
sql[7] = "INSERT INTO people(name) values ('Caetano')"
sql[8] = "INSERT INTO people(name) values ('Flavia')"
sql[9] = "INSERT INTO people(name) values ('Tereza')"


//Executar Query
var i;
for(i = 0;i < sql.length;i++){
    console.log(sql[i])
    connection1.query(sql[i])    
}

//Fechar conexão
connection1.end()


// Dados da Pagina
async function setRespostaHtml(cb){        

    const connection2 = new mysql.createConnection(config);

    let sqlSelect = `SELECT * FROM people`

    await connection2.query(sqlSelect,function(err,rows,fields){

       conteudo = "<h1>Full Cycle Rocks!</h1>"
       conteudo += "<ul>"       
       for(i = 0; i < rows.length;  i++){            
            conteudo += "<li>" + rows[i].name + "</li>"
        }        
        conteudo += "</ul>"        
    });  

    await connection2.end()
    
    return cb(conteudo);
}

//Trata a requisiçãp
http.createServer((req,res)=>{
    //chama a função setrRespostaHtml que retorna o conteudo da página
    setRespostaHtml(respostaSql => {
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.write(conteudo,'utf-8');
        res.end()
    })    
}).listen(port,()=>{
    console.log('Rodando na Porta ' + port)
})