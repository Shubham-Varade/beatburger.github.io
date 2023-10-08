---

layout: breadcrumbs
permalink: /stats
title: "Bots Stats"
description: Bots Stats Calculator
breadcrumbs:
  "Botworld": "/#botworld"

---

<!--- HTML Code -->
<div id="stats-page">
  <h1>Stats Calculator</h1>
  {% assign allBotsDetails = site.data.base-stats | sort: "botName" %}
  <div id="stats-input-section" style="margin: 8px 0px;">
    <div id="bot-input">
      <label for="selected-bot" required>Select a Bot:</label>
      <select id="selected-bot" style="height: 24px;">
        <option value="default"> -Select a bot- </option>
          {% for bot in allBotsDetails %}
          <option value="{{ bot.botName }}">{{ bot.botName }}</option>
          {% endfor %}
      </select>
    </div>
    <div id="levels-input" style="margin: 8px 0px;">
      <label for="from-level">From Level:</label>
      <input type="number" id="from-level" value="0" min="0" max="29">
      
      <label for="to-level">To Level:</label>
      <input type="number" id="to-level" value="30" min="1" max="30">

      <br><span> OR </span><br>

      <input type="checkbox" id="all-levels" style="height:14px; width:14px; margin-right:4px;"> All levels
    </div>
    <div>
      <button id="button-calculate-stats" onclick="seeStats()">See Stats</button>
    </div>
  </div>
  
  <hr>
  
  <div id="results" style="display:none;">
    <div id="results-title">
      <span class="bot-name"></span>
    </div>
    <div id="results-data">
      <table id="results-table">
        <thead>
            <tr>
                <th>Level</th>
                <th>HP</th>
                <th>Attack</th>
                <th>DPS</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>
</div>

<!--- JavaScript Code --->
<script type="text/javascript">
  document.addEventListener("DOMContentLoaded", function () {
    const botsDetails = {{ allBotsDetails }};
    var resultsSection = document.getElementById('results'); 

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
        let fromLevel = parseInt(document.getElementById('from-level').value);
        let toLevel = parseInt(document.getElementById('to-level').value);

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

        var botStats = null;
        for(int i = 0; i < botsDetails.length; i++) {
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
          createTable(botStats);
        }
      }
    }

  function calculateStats(matchIndex, fromLevel, toLevel) {
    let helperHp = 1;
    let calculatedStats = [];
    const baseHp = botsDetails[matchIndex].baseStats.hp;
    const baseAttack = botsDetails[matchIndex].baseStats.attack;
    const baseDps = botsDetails[matchIndex].baseStats.dps;
    for(int level = fromLevel; level <= toLevel; level++) {
      if (level > 0 && level < 5) {
        helperHP = 1 + ((5 - level) * 0.03);
      }
      else {
        helperHp = 1;
      }
      // level will act as key for each level's hp and attack values  
      calculatedStats[level-fromLevel] = {
        "level": level,
        "hp": baseHp * Math.pow(1.1, level-1) * helperHp,
        "attack": baseAttack * Math.pow(1.1, level-1),
        "dps": baseDps * Math.pow(1.1, level-1)
      }
    }
    return calculatedStats;
  }

  function createTable(botStats) {
    let resultsTableBody = document.getElementById('results-table tbody');
    const row;
    botStats.forEach(levelStat => {
      row = document.createElement("tr");
      row.innerHTML = `
        <td>${levelStat.level}</td>
        <td>${levelStat.hp}</td>
        <td>${levelStat.attack}</td>
        <td>${levelStat.dps}</td>
      `;
      resultsTableBody.appendChild(row);
    }
  }
});
</script>


