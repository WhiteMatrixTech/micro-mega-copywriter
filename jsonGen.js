let xlsx = require('xlsx');
let fs = require('fs')
let workbook = xlsx.readFile('./GCA Founding Councilors.xlsx');

let sheetNames = workbook.SheetNames;

let sheet = workbook.Sheets[sheetNames[0]];

const data = xlsx.utils.sheet_to_json(sheet);

const fileGenTemplate = (councilors) => {
    return `export const copywriter = {
        councilors: ${JSON.stringify(councilors)}
    }`
}

const parseData = data.map(item => {
    const mediaAccounts = [{
        name: 'Twitter',
        link: item.Twitter
    }, {
        name: 'Email',
        link: item.Email
    }, {
        name: 'Discord',
        link: item.Discord
    }].filter(item => !!item.link)

    return {
        name: item.Name,
        role: item.Roles,
        mediaAccounts
    }
})

fs.writeFile("./lib/index.ts", fileGenTemplate(parseData), () => {});
