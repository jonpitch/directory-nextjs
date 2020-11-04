var lunr = require('lunr'),
    stdin = process.stdin,
    stdout = process.stdout,
    buffer = []

stdin.resume()
stdin.setEncoding('utf8')

stdin.on('data', function (data) {
  buffer.push(data)
})

stdin.on('end', function () {
  var documents = JSON.parse(buffer.join(''))

  var idx = lunr(function () {
    this.ref('id')
    this.field('name')
    this.field('keywords')
    this.field('city')
    this.field('state')
    this.field('country')
    this.field('products_and_services')
    this.field('website')
    this.field('sector')
    this.field('industry_category')
    this.field('indusry')
    this.field('description')

    documents.forEach(function (doc) {
      this.add(doc)
    }, this)
  })

  stdout.write(JSON.stringify(idx))
})
