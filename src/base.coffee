fs = require('fs')

jsonFileTree = (path,obj) ->

  dirTree = (filename, obj) ->
    info = {
      path: filename,
      name: path.basename(filename)
    }

    if fs.lstatSync(filename).isDirectory()
      obj[info.name] = {}
      fs.readdirSync(filename).map (child) ->
        dirTree(filename + '/' + child, obj[info.name])
    else
      obj[info.name] = JSON.parse fs.readFileSync(info.path) if info.name.match(/json/)

  obj = {}
  dirTree(path,obj)


module.exports =
  jsonFileTree: jsonFileTree
