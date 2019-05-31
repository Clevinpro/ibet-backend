# ibet-backend

## Installation

	npm i

## Dev
    npm start

### Auth current
```
    fetch('http://localhost:8080/api/auth/current',
    { 
        method: 'get',
        headers: { 'content-type': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IjEzMTMxMzEzIiwiaWQiOiI1Y2VmYTNmNGRjNWFhNzI0OTg3N2NlNmMiLCJpYXQiOjE1NTkyMTYyODcsImV4cCI6MTU1OTMwMjY4N30.bs_Eq86Fh57tW2YpSciwV-MoP6snlUJJbw8eKyK1yIE' }

    }).then( (response)=>{ response.json()
    .then( (data)=>{ console.log(data) } ) } )
    .catch((err)=>{console.log(err)})
```

### Signip

```
fetch('http://localhost:8080/api/auth/signup',
 { 
    method: 'POST',
    body: JSON.stringify(
        { 
			userName: "Nikolay",
			email: 'Nikolay@mail.com',
			password: '13131313',
         }
    ),
   headers: { 'content-type': 'application/json' }

}).then( (response)=>{ response.json()
.then( (data)=>{ console.log(data) } ) } )
.catch((err)=>{console.log(err)})

```

### Signin

```
fetch('http://localhost:8080/api/auth/signin',
 { 
    method: 'POST',
    body: JSON.stringify(
        { 
			userName: "Nikolay",
			email: 'Nikolay@mail.com',
			password: '13131313',
         }
    ),
   headers: { 'content-type': 'application/json' }

}).then( (response)=>{ response.json()
.then( (data)=>{ console.log(data) } ) } )
.catch((err)=>{console.log(err)})
```

### Create Bet
```
fetch('http://localhost:8080/api/bets',
 { 
    method: 'POST',
	body: JSON.stringify({
		userID: '1',
        userName: 'Bro',
        points: 100,
        type: 'random',
        betValue: '10',
        exitDate: new Date().getTime() + 60000,
        creatingDate: new Date().getTime(),
	})
    headers: { 'content-type': 'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IjEzMTMxMzEzIiwiaWQiOiI1Y2VmYTNmNGRjNWFhNzI0OTg3N2NlNmMiLCJpYXQiOjE1NTkyMTYyODcsImV4cCI6MTU1OTMwMjY4N30.bs_Eq86Fh57tW2YpSciwV-MoP6snlUJJbw8eKyK1yIE' }

}).then( (response)=>{ response.json()
.then( (data)=>{ console.log(data) } ) } )
.catch((err)=>{console.log(err)})
```