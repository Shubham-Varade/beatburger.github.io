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
      <select id="selected-bot">
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

      <input type="checkbox" id="all-levels" style="height:14px; width:14px;">All levels
    </div>
    <div>
      <button id="button-calculate-stats" onclick="calculateStats()">See Stats</button>
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




