### Difference between GET and POST requests 

#### Get
Get is used to request data from a specified resource. The data returned by GET will be unchanged unless requested again. GET requests can be cached, bookmarked, stored in the browser history, and are limited in length due to URL length limitations. 

Example
```javascript
fetch('http://example.com/data')
	.then(response => response.json())
	.then(data => console.log(data));
```

### Post
Post, on the other hand, is used to submit an entity (e.g. a form or data) to the specified resource, often causing a change in state or a side effect on the server. POST requests are not cached, cannot be bookmarked, do not limit data length, and can be used to send binary and other types of data

Example
```javascript
fetch('http://example.com/data', {
	method: 'POST', 
	header: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		name: 'John Doe' 
		age: 32 
	})
})
	.then(response => response.json())
	.then(data => console.log(data));
```

In summary, GET requests are used to retrieve data while POST requests are used to submit data and cause change on the server. 

