const fs = require('fs')
const glob = require('glob')

// Find all external links in our docs
const images = glob.sync('src/**/images/*')
var imageSizeArr = []
let i = 0
images.reduce((accum, image) => {
  let stats = fs.statSync(image)
  let fileSizeInBytes = stats["size"]
  // console.log(image, fileSizeInBytes)
  imageSizeArr.push({image, fileSizeInBytes})
  i++
})


imageSizeArr = imageSizeArr.sort(function (a, b) {
  return a.fileSizeInBytes - b.fileSizeInBytes;
});

console.log('Total Number of Images:', i)
console.log('Top 10 Largest Images (MB)')
const top10Images = imageSizeArr.slice(imageSizeArr.length-10,imageSizeArr.length)
top10Images.reduce((accum, image) => {
  console.log(`${image.image}: ${image.fileSizeInBytes/1000000} MB`)
})


