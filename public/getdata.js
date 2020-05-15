const fs = require('fs');
const fsPromises = require('fs').promises
const path = require('path');
const puppeteer = require('puppeteer');

async function downloadCSV(page, id, parentDir, url) {
    //create temp folder for download
    const tempDir = parentDir + `/temp_${id}`

    fs.mkdirSync(tempDir)

    await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: tempDir});
    await page.goto(url);
    await page.waitFor('.viewMenuPopover')

    const hrefElement = await page.$('.viewMenuButton[tabindex="0"]');
    await hrefElement.click();

    await page.waitFor(500)

    const downloadElement = await page.$('ul.dark li[tabindex="0"]')
    await downloadElement.click()

    console.log(` \t\tgetting data from ${url}`)

    return tempDir
}

async function moveCSV(sourceDir, targetDir, targetName) {
    const files_downloaded = await fsPromises.readdir(sourceDir)
    const csv_file = files_downloaded.find(file => file.includes('.csv'))
    if (csv_file) {
        //move
        await fsPromises.rename(path.join(sourceDir, csv_file), path.join(targetDir, targetName))
    }
    //clean up
    await fsPromises.rmdir(sourceDir, {recursive: true})
}

async function updateFiles(directory) {
    //clean data folder
    console.log(' \tDownloading files to dir: '+directory)
    const files = fs.readdirSync(directory)
    for (const file of files) {
        const filePath = path.join(directory, file)
        const stat = await fsPromises.lstat(filePath);

        if (stat.isFile()) fsPromises.unlink(filePath)
        if (stat.isDirectory()) await fsPromises.rmdir(filePath, {recursive: true})
    }

    //download csv
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser', //disable when running on local machine
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page1 = await browser.newPage();
    const page2 = await browser.newPage();

    console.log(' \t * Downloading all.csv')
    const allDir = await downloadCSV(page1, 0, directory,
        'https://airtable.com/shrRBozfbknHIlpIm/tblO0CoQECxUILlN3/viw0qDsmDXN8PPGrQ?blocks=hide')
    console.log(' \t * Downloading food.csv')
    const foodDir = await downloadCSV(page2, 1, directory,
        'https://airtable.com/shrRBozfbknHIlpIm/tblvgTvcHLj5r55CH/viwGtBbRW0Elu9aYf?blocks=hide')

    await page1.waitFor(60000 * .5)
    await browser.close();

    await moveCSV(allDir, directory, 'all.csv')
    await moveCSV(foodDir, directory, 'food.csv')
}

function setupdirectory(dir) {
    // Create the folder data if it doens't exist
    if (!fs.existsSync(dir)) {
        try {
            fs.mkdirSync(dir);
            console.log(' \tCreated ' + dir)
        } catch (e) {
            throw error
        }
    } else {
        console.log(' \tdata dir already exists, skipping creation')
    }
}

function main() {
    const directory = __dirname + '/data';

    console.log(' :: Setting up directory structure')
    setupdirectory(directory)

    console.log(' :: Updating airtable data files, overwitting existing files')
    updateFiles(directory)
}

main()