const app = require('express')(),
server = require('http').createServer(app),
bodyParser = require('body-parser'),
mysql = require('mysql'),
path = require('path'),
ejs = require('ejs')

var connection = mysql.createConnection({

    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'calcbdd'
  
  });
  
  connection.connect();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req,res){
connection.query("SELECT id,chiffre1, chiffre2, operateur, resultat FROM operation", function (err, result, fields) {
          if (err) throw err;
            res.render('index', {calculs: result});
        });
});


app.get('/calcul/:id', function(req,res){
   var id=req.params.id;
    connection.query("SELECT chiffre1, chiffre2, operateur FROM operation  WHERE id="+id, function (err, result, fields) {
              if (err) throw err;

              var resultat = 0;
              
             var chiffre1= Number(result[0].chiffre1);
             var chiffre2= Number(result[0].chiffre2);

              switch (result[0].operateur) {
                case '/':
                         resultat = chiffre1 /  chiffre2 ;
                  break;
                case '-':
                         resultat = chiffre1 - chiffre2;
                  break;
                case '+':
                         resultat = chiffre1 + chiffre2 ;
                  break;
                case '*':
                         resultat = chiffre1 * chiffre2 ;
                  break;
                default:
                        resultat = '';
              }
              console.log(resultat);
              console.log(result);
             connection.query("UPDATE operation SET resultat ="+resultat+" WHERE id="+id, function (err, result, fields) {
                if (err) throw err;
                res.redirect('/');
            
        });
    });

    });

app.get('/edit/:id', function(req,res){
    var id=req.params.id;
  
    connection.query("SELECT chiffre1, chiffre2, operateur FROM operation  WHERE id="+id, function (err, result, fields) {
        if (err) throw err;
            
        connection.query("SELECT id,chiffre1, chiffre2, operateur, resultat FROM operation", function (err, resultall, fields) {
            if (err) throw err;
              console.log(resultall);
              res.render('index', {calculs: resultall, edit: result });
          });
         
  
     
    });
});

app.post('/add', function(req, res){
    /*var operation=req.body.name;*/
   /* console.log(req.body.signe.toString());*/
    connection.query("INSERT INTO `operation` (chiffre1,chiffre2,operateur) VALUES ("+req.body.chiffre1+","+req.body.chiffre2+",'"+req.body.signe.toString()+"')", function(err, result){
        if(err) throw err;
            console.log("1 record inserted");
        });
    res.redirect('/');
});



server.listen(8081);

/*app.post('/calculate', function (req, res) {
    var chiffre1 = Number(req.body.chiffre1);
    var chiffre2 = Number(req.body.chiffre2);
    var resultat;
    // let resultat = 0;
    switch (req.body.signe) {
        case "+":
            resultat = chiffre1 + chiffre2;
            break;
        case "-":
            resultat = chiffre1 - chiffre2;
            break;
        case "*":
            resultat = chiffre1 * chiffre2;
            break;
        case "/":
            resultat = chiffre1 / chiffre2;
            break;
        default:
            error = "veuillez sélectionner un opérateur";
            break;

    }
    
    
    
    
    
    
        var error;
  
    console.log(resultat)
    res.render('index', {
        
        resultat: resultat,
        error: error,
    });
});*/




