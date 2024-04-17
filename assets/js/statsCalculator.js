/* Get the user inputs and check if the bot data exists in the data
 * Once everything is checked, send details to calculateStats()
 */
function seeStats() {
  const selectedBot = document.getElementById('selected-bot').value.toLowerCase();
  if (selectedBot == 'default') {
    alert('Please select a bot');
    return;
  }
  else {
    let fromLevel, toLevel;
    if(allLevelsCheckbox.checked) {
      fromLevel = 1;
      toLevel = 30;
    }
    else {
      fromLevel = parseInt(document.getElementById('from-level').value);
      toLevel = parseInt(document.getElementById('to-level').value);
    
      // Level adjustments if incorrect
      if (fromLevel < 1) {
        fromLevel = 1;
      }
      else if (fromLevel > 30) {
        fromLevel = 30;
      }
      
      if (toLevel < fromLevel) {
        toLevel = fromLevel;
      }
      else if (toLevel < 1) {
        toLevel = 1;
      }
      else if (toLevel > 30) {
        toLevel = 30;
      }
    }

    var botStats = null;
    for(let i = 0; i < botsDetails.length; i++) {
      if(botsDetails[i].botName.toLowerCase() == selectedBot) {
        botStats = calculateStats(i, fromLevel, toLevel);
        break;
      }
    }
    if(botStats == null) {
      alert('Bot details not found! Please contact a wiki staff or send a feedback');
      return;
    }
    else {
      document.getElementById('results-section').style.display = "block";
      document.querySelector('#results-title .bot-name').innerText = selectedBot;
      createTable(botStats);
    }
  }
}

/* Main logic of the stats calculator
 * 
 *
 */
function calculateStats(matchIndex, fromLevel, toLevel) {
  let helperHp = 1;
  let calculatedStats = [];
  const baseHp = botsDetails[matchIndex].baseStats.hp;
  const baseAttack = botsDetails[matchIndex].baseStats.attack;
  const baseDps = botsDetails[matchIndex].baseStats.dps;
  for(let level = fromLevel; level <= toLevel; level++) {
    if (level > 0 && level < 5) {
      // Exta 1.12, 1.09, 1.06, 1.03 multiplier for levels 1 to 4 respectively 
      helperHp = 1 + ((5 - level) * 0.03);
    }
    else {
      helperHp = 1;
    }
    // (level - fromLevel) = 0, 1, 2, ... which will act as indices for the array
    calculatedStats[level - fromLevel] = {
      "level": level,
      "hp": Math.round(baseHp * Math.pow(1.1, level-1) * helperHp),
      "attack": Math.round(baseAttack * Math.pow(1.1, level-1)),
      "dps": Math.round(baseDps * Math.pow(1.1, level-1))
    }
  }
  return calculatedStats;
}

// Creates table body to show calculated stats
function createTable(botStats) {
  let resultsTableBody = document.querySelector('#results-table tbody');
  resultsTableBody.innerHTML = "";
  let row;
  botStats.forEach(levelStat => {
    row = document.createElement("tr");
    row.innerHTML = `
      <td>${levelStat.level}</td>
      <td>${levelStat.hp}</td>
      <td>${levelStat.attack}</td>
      <td>${levelStat.dps}</td>
    `;
    resultsTableBody.appendChild(row);
  });
}  


