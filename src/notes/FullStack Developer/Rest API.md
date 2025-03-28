RESTful API is an interface that two computer systems use to exchange information securely over the internet. Most business applications have to communicate with other internal and third-party applications to perform various tasks. -> From AWS

#### What is REST?
Representational State Transfer (REST) is a software architecture that imposes conditions on how an API should work. REST was initially created as a guidance to manage communication on a couples network like the internet. you can use REST-based architecture to support high-performing and reliable communications at scales. You can easily implement and modify it, bringing visibility and cross-platform to any API system.

API developers can design APIs using several different architectures. APIs that follow the REST architectural style are called REST APIs. Web services that implement REST architectural style are called RESTful web services. The term RESTful API generally refers to RESTful web APIs. However, you can use the terms REST API interchangeably.

The following are some of the principles of the REST architectural styles:
##### Uniform interface
The uniform interface is fundamental to the design of any RESTful web service. It indicate that the server transfers information in a standard format. The formatted resource is called a representation in REST. This formate can be different from the internal representation of the resource on the server application. For example, the server can store data as text but send it in an HTML representation format.

Uniform interface imposes four architectural constraints:
1. Requests should identify resources. They do so by using a uniform resource identifier
2. Clients have enough information in the resource representation to modify or delete the resource if they want to. The server meets this condition by sending metadata that describes the resource further.
3. Clients receive information about how to process the representation further. The server achieves this by sending self-descriptive messages that contain metadata about how the client can best use them. 
4. Clients receive information about all other related resources they need to complete a task. The server achieves this by sending hyperlinks in the representation so that clients can dynamically discover more resources

##### Statelessness 
In REST architecture, statelessness means that each request from a client to the server is independent; the server does not keep any information about previous requests. This means the server can understand and fulfill each request without needing any context from past requests.

```python
# Example of a stateless request handler in Python using Flask

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/resource', methods=['GET'])
def get_resource():
    # Process the request independently
    return jsonify({'message': 'Resource data'})

if __name__ == '__main__':
    app.run(debug=True)
```

**Layered System**
A layered system architecture means the client can connect through various intermediaries (like load balancers or proxies) and still communicate with the server. These layers help with security, load balancing, and business logic but are invisible to the client.

```python
# Example of a layered architecture with Flask and a middleware layer

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.before_request
def before_request_func():
    # Example of a middleware layer handling security
    print('Middleware layer: Checking request security')

@app.route('/resource', methods=['GET'])
def get_resource():
    return jsonify({'message': 'Resource data'})

if __name__ == '__main__':
    app.run(debug=True)
```

**Cacheability**
RESTful web services can cache responses to improve response times. For example, if a website has common images on every page, the client can store (cache) these images after the first response and reuse them.

```python
# Example of a cacheable response in Flask

from flask import Flask, request, jsonify, make_response

app = Flask(__name__)

@app.route('/cacheable-resource', methods=['GET'])
def get_cacheable_resource():
    response = make_response(jsonify({'message': 'Cacheable resource data'}))
    response.headers['Cache-Control'] = 'public, max-age=3600'  # Cache for 1 hour
    return response

if __name__ == '__main__':
    app.run(debug=True)
```

**Code on Demand**
In REST, servers can send code to clients to extend their functionality temporarily. For example, when filling out a form online, your browser might get code from the server to highlight errors in real-time.

```html
<!-- Example of code on demand in HTML with JavaScript -->

<!DOCTYPE html>
<html>
<head>
    <title>Code on Demand Example</title>
    <script>
        function validateForm() {
            var phone = document.forms["myForm"]["phone"].value;
            if (isNaN(phone)) {
                alert("Phone number must be numeric");
                return false;
            }
        }
    </script>
</head>
<body>
    <form name="myForm" onsubmit="return validateForm()">
        Phone: <input type="text" name="phone">
        <input type="submit" value="Submit">
    </form>
</body>
</html>
```

