const fs = require('fs-extra')

// Async with promises:
fs.copy('./txt/testFile.txt', './txt/testFile1.txt')
    .then(() => console.log('success!'))
    .catch(err => console.error(err))

// Async with callbacks:
fs.copy('./txt/testFile.txt', './txt/testFile2.txt', err => {
    if (err) return console.error(err)
    console.log('success!')
})

// Sync:
try {
    fs.copySync('./txt/testFile.txt', './txt/testFile3.txt')
    console.log('success!')
} catch (err) {
    console.error(err)
}

// Async/Await:
async function copyFiles () {
    try {
        await fs.copy('./txt/testFile.txt', './txt/testFile4.txt')
        console.log('success!')
    } catch (err) {
        console.error(err)
    }
}

copyFiles()