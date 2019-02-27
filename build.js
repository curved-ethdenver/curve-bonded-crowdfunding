const glob = require("glob");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const shell = require("shelljs");

try {
  fs.rmdirSync("lib/artifacts");
} catch (e) {
  console.log(e);
}

try {
  shell.mkdir("-p", "lib/artifacts");
} catch (e) {
  console.log(e);
}

const rootContracts = glob.GlobSync("contracts/**/*.sol").found;
const allContracts = _.map(
  _.without(_.concat(rootContracts), "contracts/Migrations.sol"),
  r => path.basename(r)
);

function processContract(contract) {
  const builtPath =
    "build/contracts/" + path.basename(contract.replace(".sol", ".json"));

  if (fs.existsSync(builtPath)) {
    fs.readFile(builtPath, (err, data) => {
      const dataJson = JSON.parse(data);
      const path = builtPath
        .replace("build/", "lib/")
        .replace("/contracts/", "/artifacts/")
        .replace(".json", ".js");
      console.log("writing abi for " + contract + " to " + path);
      fs.writeFileSync(
        path,
        "module.exports = " + JSON.stringify(dataJson, null, 2)
      );
    });
  }
}

allContracts.forEach(contract => {
  processContract(contract);
});
