// ****没用到****
// promise 库 Q.js

const Q = require('q')
// Q.nfcall是使用call语法来返回一个promise对象

const fullFileName = path.resolve(__dirname, '../data/data1.json')
const result = Q.nfcall(fs.readFile, fullFileName, 'utf-8')		//使用Q.nfcall返回一个promise
result.then(data => {
	console.log(data)
}).catch(err => {
	console.log(err.stack)
})

const fullFileName = path.resolve(__dirname, '../data/data1.json')
const result = Q.nfapply(fs.readFile, [fullFileName, 'utf-8'])  // 使用 Q.nfapply 返回一个 promise
result.then(data => {
    console.log(data)
}).catch(err => {
    console.log(err.stack)
})













