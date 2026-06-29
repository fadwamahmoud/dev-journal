// timers pc(pending callbacks/ internal ops) polling check(setimmediate)  cc

// Within the main module, their order is non-deterministic. Inside an I/O callback, setImmediate always
// fires before setTimeout(fn, 0) because the check phase comes
// before the timers phase wraps around. setImmediate is preferred for deferring within I/O callbacks.

### streams 

fs.createReadableStream 


### Back Pressure

when a writable stream buffer fills up and it emits 'pause' to the readable stream then when it's drained it emits 'drain'
this is all handled by `pipe()`

### Duplex vs Transform 

A transform has data that is Written in transformed and readable out zlib.creategzip()
Duplex has independant sides one is readable and the other is writable and the readable
the output is dependant on the input

### Buffer

allocUnsafe => overrwrites
alloc(n) => initializes and zero fills them then allocates

### Child process spawn vs exec

spawn streams stdio in real time which makes it suitable for large output and long running processes 
fork is a specialization of spawn it creates a IPC channel between parent and child enabling pricess.send() and process.on(message)
it's the foundation of cluster mode
exec buffers all output when its done then calls back, capped at max buffer (def 1 mb)
exec creates a shell so shell commands like pipe are available

### app.use() vs app.get()
app.use() is responsible for all the verbs
app.get() is responsible for the get requests  

### express error handling
errors are passed to error middlewares which are passed down the chain until they are 
Express 4 vs 5: 4 passes catches synchronous errors and passes them to error middleware,
async error have to be passed into next(err)
5: catches error automatically

### req.query and req.body

req.query => query params, parsed as strings
req.param => route params
req.body => request body

### commonjs modules

when a module is required it's cached and then node uses that cached instance 
stored in require.cache

### esmodules 

reference the actual export not a copy
the imported module may see undefined at first but then it updates once
the exporter finishes initializing

### cb vs promises
cb uses callbacks when the operation is done and either return error/null in first arg and result in second arg
promises enable async await

### scripts field in package.json

used for scripts that run like dev, test using node process
defines runnable shell commands, Special names like 'start', 'test', 'build' can be run without 'run

### V8 garbage collection

gc cleans up unused objects in memory for new objects to be allocated memory when created
young and old space are the main two spaces in heap


### set