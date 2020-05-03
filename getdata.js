const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const directory = __dirname + '/data';

async function updateFiles() {
    //clean folder
    const files = fs.readdirSync(directory)
    for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
        });
    }

    console.log(`${directory}, cleaned`)

    //download csv
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium-browser',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage();
    await page._client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: directory });
    await page.goto('https://airtable.com/shrRBozfbknHIlpIm/tblO0CoQECxUILlN3/viw0qDsmDXN8PPGrQ?blocks=hide');
    await page.waitFor('.viewMenuPopover')

    const hrefElement = await page.$('.viewMenuButton[tabindex="0"]');
    await hrefElement.click();
    await page.screenshot({ path: path.join(directory, 'example.png') });
    await page.waitFor(500)

    const downloadElement = await page.$('ul.dark li[tabindex="0"]')
    await downloadElement.click()

    console.log(`download clicked`)

    await page.waitFor(6000 * 2) // wait two minutes
    await browser.close();

    //check for csv
    const files_downloaded = fs.readdirSync(directory)

    console.log(`files downloaded ${files_downloaded}`)
    const csv_file = files_downloaded.find(file => file.includes('.csv'))

    //rename
    await fs.renameSync(path.join(directory, csv_file), path.join(directory, 'all.csv'))
}

updateFiles()
