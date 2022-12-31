const { GoogleSpreadsheet } = require("google-spreadsheet");
const fs = require("fs");
const json = require("./spreadsheet.json");
var spreadsheetID = JSON.parse(fs.readFileSync("spreadsheet.json").toString());
const doc = new GoogleSpreadsheet(spreadsheetID);

function print (toPrint) {
  console.log(toPrint);
}
console.log(json.length);
const enterButton = document.querySelector(".enter-button");
enterButton.addEventListener("click", GetDetails);

var radioBtns = document.querySelectorAll(".btn-check");
for (let i = 0; i < radioBtns.length; i++)
  {
    radioBtns[i].addEventListener("click", function(){LoadCategories(this.id)});
  };

const currentDate = new Date();
var month = parseInt(currentDate.getMonth().toString()) + 1;
var year = currentDate.getFullYear();
var dateToday = currentDate.getDate();

function GetDetails() {
  var amount = document.querySelector(".money-input").value; // 500 / 123 / 999
  var inOut = document.querySelector('input[name="btnradio"]:checked').id; // money-in / money-out
  var description = document.querySelector("#description-input").value; // Badminton Booking
  var date = document.querySelector("#date-input").value; // yyyy-mm-dd
  var category = document.querySelector(".form-select").value; // yyyy-mm-dd
  if (date == "") {
    date = `${year}-${month}-${dateToday}`;
  }

  if (category == "Category") {
    category = "Other";
  }
  LoadSpreadsheet(amount, inOut, description, date, category);
}

async function LoadCategories (inOut) {
  document.querySelector(".form-select").innerHTML = "<option selected>Category</option>";
  await doc.useServiceAccountAuth({
    client_email: "fintrack@fintrack-randomwurks.iam.gserviceaccount.com",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDjYX7eTgpGQQxM\nGHzrzKpnoS1/ZNliqr7bMiIJ99gMAv1O+occOMunMb1G/5z26xciiOjF0QP+jFH3\nDvLJSnylTKNQenPQeZkebHXvIwgSu9bXsaEeV6r87+IZ7K8lQdMqq9IcQwFnomd5\nWWqWhIy2anvOclD3UvyYLMH4eaMlnEmKox9Q5eSD4+f6FImqIBXKielYDx1O4lok\nxsa6mF8dvpcaFUP/MiyKWC0BkOCftGZFueJSRlFoIoFtJnBQnAdiz6/2docB/Jax\noN1RgLMLmtaKWpKB4xnPRhLAcr45iF3xh0fqfgspnuT/tR8o6RE4Leq60VjfTsKe\nwVRy0R07AgMBAAECggEAIahb5EI/CRk13cm+LBVWoBJerr3Z494MdFveaAVU6KpE\nnr085LOPicc2El1h+bbg7M7BTg7bfYF93IlM7PjmrH1Eq3QE0rY9MSCy8FwKJOPD\nMJhtlhU6DUjg+h9r6aLtxCI87swIWDPVB0RyH6etQI9QlkWbsJCLLWdqqwIuYTGS\nzXqvSUJKXUXXgUsKpx0s/27yqQVP1B+lXm3YGKluplWScMKCwKih8/sWI3IohBTk\nBYaWBR3LWe83l0KLsn5q6x52Bp4rFgIdklfhrNLoxLn46LfduYLaEKlvwbduTWdx\nASywpx8bxfUsicPpE2AZhl6Br3lqpYkYyQHoDxnfKQKBgQD1N7XLjK4vBJGeKMuH\n6Q6p/mu/fCX6KTPgJfKu82JgrCf1+km9AlDJvpJAX6XrGN9sKr8H5fBjU9LYSUIC\neePpPn74ntdClmKAE+eUFp94d0smePNt0ZukAUR/aim/wREBxXtdGJyvIi3Nj1EZ\nf3fxXOoQDHGisYtWFlo7OQkvrQKBgQDtYQGFYRyQia/X5Htii4d7j9jCBN4BThIV\nB2z6IUNCZtDZe3+KLSmEc8PB3kL+cJoFalDQdLt2cEnQmwkBYPfjn4rEqqnN5wtj\nNhvE+deAhRd2XQNvEb65MFGF9CpvXgE7YXCLDxvyJ48A7kfsB9SxYTBFqayG5BDJ\nwzSkFaf9hwKBgCY/UD21bZ2rysKufkBum3jsVAYD6TCBqLO3d4jOMXP+piT5qvKu\nH8e3z7v2rzxiHscSS8WBmeMEOgi+NGuKc3/33XoN3GloZ2iushopBSqXAMO5bc6d\nOPd1sydkeaqNBIgQM1Or+RRf8mDzj6S4ew7MfT2Pk1Ha+26sAdrm5IXpAoGAcRDz\nmIRZBr+OclbyLk4nikNKC6Al3plBI6MV1U5iqw4uDGk2pqo8TEqXw5AKeQdJVar+\nM0xmvlNd1W8DKxT0/gbQIjzoBJs4YVk0gO5AJ4c9VbOYHx9kqPDK4/MZA1LTY2VW\nJeZceUs+YkMdHt/b/2E7jPL0qouXM4M3X7CxA6ECgYEAwe3G7eZtNxT8DOwy0Iuz\nxpdEOlv7bztVQJAsMcJ6g3aDpFXlcVkYPdhKpxoQyTQUWJ0goYetCRcSi7EBQxzl\ndxFDSWoBRM372Lw2be4gB4GCfPnSGQa/B2yr8rdi7VcDU4tYhaLPs/v970IauvuU\n+KlGLHTfrgV7SewMO5ELYvo=\n-----END PRIVATE KEY-----\n"
  });
  var categoryVar = ""
  if (inOut == "money-out") {
    categoryVar = "B";
  }
  else {
    categoryVar = "H";
  }

  await doc.loadInfo(); 
  console.log(`Spreadsheet Name: ${doc.title}`);

  const summarySheet = doc.sheetsByIndex[0];
  console.log(`Worksheet Name: ${summarySheet.title}`);

  await summarySheet.loadCells();

  var categories = [];
  for (let i = 28; i < 100; i++) {
    const cellNumber = categoryVar + i.toString();
    const cellValue = summarySheet.getCellByA1(cellNumber);
    if (cellValue.value == null) {
        break
    }
    categories.push(cellValue.value);
  //   print(`Cell ${cellNumber}: ${cellValue.value}`);
  }
  var categorySelect = document.querySelector(".form-select");
  for (let i = 0; i < categories.length; i++) {
    categorySelect.innerHTML += `<option value='${categories[i]}'>${categories[i]}</option>`; 
  }
}

LoadCategories("money-in");

async function LoadSpreadsheet(amount = "1", inOut = "money-out", description = "No Description", date, category) {

  if (amount == "") {
    amount = 00;
  }
  amount = parseFloat(amount);

  const [year, month, day] = date.split('-');
  const result = [day, month, year].join('/');
  date = result;

  const details = [date, amount, description, category];

  var moneyVar = "";
  var categoryVar = "";
  var moneyColumn = [];
  if (inOut == "money-out") {
    moneyVar = "C";
    categoryVar = "B";
    moneyColumn = ["B", "C", "D", "E"];
  }
  else {
    moneyVar = "H";
    categoryVar = "H";
    moneyColumn = ["G", "H", "I", "J"];
  }

  await doc.useServiceAccountAuth({
    client_email: "fintrack@fintrack-randomwurks.iam.gserviceaccount.com",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDjYX7eTgpGQQxM\nGHzrzKpnoS1/ZNliqr7bMiIJ99gMAv1O+occOMunMb1G/5z26xciiOjF0QP+jFH3\nDvLJSnylTKNQenPQeZkebHXvIwgSu9bXsaEeV6r87+IZ7K8lQdMqq9IcQwFnomd5\nWWqWhIy2anvOclD3UvyYLMH4eaMlnEmKox9Q5eSD4+f6FImqIBXKielYDx1O4lok\nxsa6mF8dvpcaFUP/MiyKWC0BkOCftGZFueJSRlFoIoFtJnBQnAdiz6/2docB/Jax\noN1RgLMLmtaKWpKB4xnPRhLAcr45iF3xh0fqfgspnuT/tR8o6RE4Leq60VjfTsKe\nwVRy0R07AgMBAAECggEAIahb5EI/CRk13cm+LBVWoBJerr3Z494MdFveaAVU6KpE\nnr085LOPicc2El1h+bbg7M7BTg7bfYF93IlM7PjmrH1Eq3QE0rY9MSCy8FwKJOPD\nMJhtlhU6DUjg+h9r6aLtxCI87swIWDPVB0RyH6etQI9QlkWbsJCLLWdqqwIuYTGS\nzXqvSUJKXUXXgUsKpx0s/27yqQVP1B+lXm3YGKluplWScMKCwKih8/sWI3IohBTk\nBYaWBR3LWe83l0KLsn5q6x52Bp4rFgIdklfhrNLoxLn46LfduYLaEKlvwbduTWdx\nASywpx8bxfUsicPpE2AZhl6Br3lqpYkYyQHoDxnfKQKBgQD1N7XLjK4vBJGeKMuH\n6Q6p/mu/fCX6KTPgJfKu82JgrCf1+km9AlDJvpJAX6XrGN9sKr8H5fBjU9LYSUIC\neePpPn74ntdClmKAE+eUFp94d0smePNt0ZukAUR/aim/wREBxXtdGJyvIi3Nj1EZ\nf3fxXOoQDHGisYtWFlo7OQkvrQKBgQDtYQGFYRyQia/X5Htii4d7j9jCBN4BThIV\nB2z6IUNCZtDZe3+KLSmEc8PB3kL+cJoFalDQdLt2cEnQmwkBYPfjn4rEqqnN5wtj\nNhvE+deAhRd2XQNvEb65MFGF9CpvXgE7YXCLDxvyJ48A7kfsB9SxYTBFqayG5BDJ\nwzSkFaf9hwKBgCY/UD21bZ2rysKufkBum3jsVAYD6TCBqLO3d4jOMXP+piT5qvKu\nH8e3z7v2rzxiHscSS8WBmeMEOgi+NGuKc3/33XoN3GloZ2iushopBSqXAMO5bc6d\nOPd1sydkeaqNBIgQM1Or+RRf8mDzj6S4ew7MfT2Pk1Ha+26sAdrm5IXpAoGAcRDz\nmIRZBr+OclbyLk4nikNKC6Al3plBI6MV1U5iqw4uDGk2pqo8TEqXw5AKeQdJVar+\nM0xmvlNd1W8DKxT0/gbQIjzoBJs4YVk0gO5AJ4c9VbOYHx9kqPDK4/MZA1LTY2VW\nJeZceUs+YkMdHt/b/2E7jPL0qouXM4M3X7CxA6ECgYEAwe3G7eZtNxT8DOwy0Iuz\nxpdEOlv7bztVQJAsMcJ6g3aDpFXlcVkYPdhKpxoQyTQUWJ0goYetCRcSi7EBQxzl\ndxFDSWoBRM372Lw2be4gB4GCfPnSGQa/B2yr8rdi7VcDU4tYhaLPs/v970IauvuU\n+KlGLHTfrgV7SewMO5ELYvo=\n-----END PRIVATE KEY-----\n"
  });

  await doc.loadInfo(); 
  const sheet = doc.sheetsByIndex[1];
  console.log(`Worksheet Name: ${sheet.title}`);

  await sheet.loadCells();

  var emptyCellNumber = "";
  for (let i = 6; i < 100; i++) {
    const cellNumber = moneyVar + i.toString();
    const cellValue = sheet.getCellByA1(cellNumber);
    print(`Cell ${cellNumber}: ${cellValue.value}`)

    if (cellValue.value == null) {
        emptyCellNumber = i;
        break
    }
  }

  try {
    for (let i = 0; i < moneyColumn.length; i++) {
      var xx = moneyColumn[i] + emptyCellNumber.toString();
      var cellToUpdate = sheet.getCellByA1(xx);
      print(details[i]);
      cellToUpdate.value = details[i];
    }
    const toastLiveSuccess = document.getElementById('liveToastSuccess');
    const toast = new bootstrap.Toast(toastLiveSuccess);
    toast.show();
    print("Successful!");
  }

  catch (err) {
    const toastLiveError = document.getElementById('liveToastError');
    const toast = new bootstrap.Toast(toastLiveError);
    toast.show();
    console.log(err);
  }

  await sheet.saveUpdatedCells();

}