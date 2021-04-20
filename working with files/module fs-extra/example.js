const fs = require('fs-extra')

// Async with promises:
fs.copy('D:/Lessons/Fourth_semestr/ipz-2/module_fs_extra/myfile.txt', 'D:/Lessons/Fourth_semestr/ipz-2/module_fs_extra/mynewfile1.txt')
    .then(() => console.log('success!'))
    .catch(err => console.error(err))

// Async with callbacks:
fs.copy('D:/Lessons/Fourth_semestr/ipz-2/module_fs_extra/myfile.txt', 'D:/Lessons/Fourth_semestr/ipz-2/module_fs_extra/mynewfile2.txt', err => {
    if (err) return console.error(err)
    console.log('success!')
})

// Sync:
try {
    fs.copySync('D:/Lessons/Fourth_semestr/ipz-2/module_fs_extra/myfile.txt', 'D:/Lessons/Fourth_semestr/ipz-2/module_fs_extra/mynewfile3.txt')
    console.log('success!')
} catch (err) {
    console.error(err)
}

// Async/Await:
async function copyFiles () {
    try {
        await fs.copy('D:/Lessons/Fourth_semestr/ipz-2/module_fs_extra/myfile.txt', 'D:/Lessons/Fourth_semestr/ipz-2/module_fs_extra/mynewfile4.txt')
        console.log('success!')
    } catch (err) {
        console.error(err)
    }
}

copyFiles()