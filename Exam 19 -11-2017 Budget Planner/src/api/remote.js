import toastr from 'toastr';
import '../../node_modules/toastr/build/toastr.min.css';

const host = 'http://localhost:5000/';

async function register(name, email, password) {
    const res = await fetch(host + 'auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });
    let data = await res.json();
    
    if (!data.success) {
         toastr.error(data.message)
         if (data.errors && data.errors.email) {
            toastr.error(data.errors.email)
         }  
    }else{
        toastr.success(data.message)           
    }
    return data 
}

async function login(email, password) {
    const res = await fetch(host + 'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    let data = await res.json();
    if (!data.success) {
         toastr.error(data.message)  
    }else{
        toastr.success(data.message)           
    }
    return data 
}

async function yearBalance(year) {
    const res = await fetch(host + 'plan/' + year, {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('authToken')
        },
    });
    return await res.json()     
}
async function monthBalance(year, month) {
    const res = await fetch(host + 'plan/' + year + "/" + month  , {
        method: 'GET',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('authToken')
        },
    });
    return await res.json()     
}

async function updateMonth(year, month, body) {
    console.log(body)
    const res = await fetch(host + 'plan/' + year + "/" + month  , {
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('authToken'),
            "Content-Type": "application/json"            
        },
        body: JSON.stringify(body)
    });
    toastr.info('Update success.')  
    
    return await res.json()     
}

async function addExpense(year, month, body) {
    const res = await fetch(host + 'plan/' + year + "/" + month + '/expense'  , {
        method: 'POST',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('authToken'),
            "Content-Type": "application/json"            
        },
        body: JSON.stringify(body)
    });
    toastr.info('Add success.')  
    
    return await res.json()     
}
async function deleteExpense(id) {
    const res = await fetch(host + 'plan/expense/' + id  , {
        method: 'DELETE',
        headers: {
            'Authorization': 'bearer ' + localStorage.getItem('authToken'),
        },
    });
    toastr.info('Delete success.')  
    
    return await res.json()     
}

export { register, login, yearBalance, monthBalance, updateMonth, addExpense, deleteExpense };