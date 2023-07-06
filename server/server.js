import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'
import cookieParser from 'cookie-parser'

const app = express();
app.use(cors(
    {
        methods: ["POST","GET","PUT","DELETE"],
        credentials: true
    }
));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser())




const db = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'example',
    database: 'signup'
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')    
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
    
    
})

const upload = multer({storage: storage})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error: "user not autherized"})
    } else {
        jwt.verify(token, 'jwt-secret-key', (err, decode) => {
            if(err) return res.json({Error: "token wrong"});
            req.role = decode.role;
            req.id = decode.id;

            next();
        })
    }
}

app.post('/login', (req, res) => {
   const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
   db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if(err) return res.json({status: 'error', Error: "Error in running query"});

    if(result.length > 0 ) {
        const id = result[0].id;
        const token = jwt.sign({role: 'admin'}, "jwt-secret-key", {expiresIn: '1d'})
        res.cookie('token',token)
        return res.json({status: 'ok', token: token})
    
        
    }
    else {
        return res.json({status: 'error', Error: "Invalid email or password"});
    
    
   }
    
})})

app.post('/employeeLogin', (req, res) => {
    const sql = 'SELECT * FROM employees WHERE email = ?';
    db.query(sql, [req.body.email], (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ status: 'error', Error: 'Error in running query' });
      }
  
      console.log(result); // Log the result array to inspect its contents
  
      if (result.length > 0) {
        bcrypt.compare(req.body.password.toString(), result[0].password, (err, isMatch) => {
          if (err) {
            console.log(err);
            return res.json({ status: 'error', Error: 'Error in running query' });
          }
  
          if (isMatch) {
            const id = result[0].id;
            const token = jwt.sign({ role: 'employee', id: result[0].id } , "jwt-secret-key", { expiresIn: '1d' });
            res.cookie('token', token);
            
            return res.json({ status: 'ok', token: token , id: result[0].id});
          } else {
            return res.json({ status: 'error', Error: 'Invalid email or password' });
          }
        });
      } else {
        return res.json({ status: 'error', Error: 'Invalid email or password' });
      }
    });
  });
  
 
  
app.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({status: 'ok'})

})

app.get('/adminCount', (req, res) => {
    const sql = 'SELECT COUNT(id) as admin FROM users';
    db.query(sql, (err, result) => {
        if(err) return res.json({status: 'error', Error: "Error in running query"});
        return res.json(result) 
    })

})

app.get('/employeeCount', (req, res) => {
    const sql = 'SELECT COUNT(id) as employee  FROM employees';
    db.query(sql, (err, result) => {
        if(err) return res.json({status: 'error', Error: "Error in running query"});
        return res.json(result)
    })


})

app.get('/employeeSal', (req, res) => {
    const sql = 'SELECT SUM(salary) as sumOfSalary  FROM employees';
    db.query(sql, (err, result) => {
        if(err) return res.json({status: 'error', Error: "Error in running query"});
        return res.json(result)
    })


})

app.post('/create', upload.single('image'),  (req, res) => {
    const sql = 'INSERT INTO employees (name, email, password, address, salary, image ) VALUES (?)';
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if(err) return res.json({status: 'error', Error: "Error in hashing password"});
        const values = 
            [req.body.name, req.body.email, hash, req.body.address, req.body.salary, req.file.filename]
        
        db.query(sql, [values], (err, result) => {
            if (err) {
              console.log(err); // Log the error to the console
              return res.json({ status: 'error', Error: 'Error in signup query' });
            }
            return res.json({ status: 'ok' });
          });
          
    })
})

app.get('/getEmployee', (req, res) => { 
    const sql = "SELECT * FROM employees";
    
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err); // Log the error to the console
            return res.json({ status: 'error', Error: 'Employee error' });
          }else{
                 console.log(result);
                 return res.json({status: "ok", Result: result})
                
            }
    
    })
} )




app.get('/get/:id', verifyUser , (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employees WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err); // Log the error to the console
            return res.json({ status: 'error', Error: 'Employee error' });
          }else{
                 console.log(result);
                 return res.json({status: "ok", Result: result})
                
            }
    
    
    })
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE employees SET name = ?, email = ?, address = ?, salary = ? WHERE id = ?"
    db.query(sql, [req.body.name, req.body.email, req.body.address, req.body.salary, id], (err, result) => {
        if (err) {
            console.log(err); // Log the error to the console
            return res.json({ status: 'error', Error: 'Employee error' });
          }else{
                 console.log(result);
                 return res.json({status: "ok", Result: result})
                
            }
    
    
    
    })
})


app.delete('/delete/:id', (req, res) => { 
    const id = req.params.id;
    const sql = "DELETE FROM employees WHERE id = ?"
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err); // Log the error to the console
            return res.json({ status: 'error', Error: 'delete Employee error' });
          }else{
                 console.log(result);
                 return res.json({status: "ok", Result: result})
                
            }
    
    
    
    })
})





app.get('/dashboard', verifyUser,(req, res) => {
    return res.json({status: "ok", role: req.role, id: req.id})

})


    

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

app.listen(3001, () => {
    console.log('Server started on port 3001');
})
