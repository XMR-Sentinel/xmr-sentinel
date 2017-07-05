const main = require('./index.js')
const nodes = require('./lib/nodes.js')

function getData() {
  main
    .hash
    .getHashDataFromNodes(nodes)
    .then(res => main.hash.getHashSum(res))
    .then(sum => {
      setTimeout(function() {
        console.log(sum.total)
        getData()
      }, 1000)
    })
    .catch(err => console.log(err))
  
}

getData()
