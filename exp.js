var track = {
    // (A) PROPERTIES
    data  : {},    // expenses data
    hDate : null,  // html add item date
    hName : null,  // html add item name
    hAmt : null,   // html add item amount
    hItems:null,
    hWrap : null,  // html records wrapper
  
    // (B) SUPPORT FUNCTION - SAVE TO LOCAL STORAGE
    save : () => {
      localStorage.setItem("expenses", JSON.stringify(track.data));
    },
  
    // (C) INIT
    init : () => {
      // (C1) GET HTML ELEMENTS
      track.hDate = document.getElementById("add_date");
      track.hName = document.getElementById("add_name");
      track.hAmt = document.getElementById("add_amt");
      track.hWrap = document.getElementById("rec_wrap");
      track.hItems = document.getElementById("add_items");
  
      // (C2) DEFAULT TODAY'S DATE
      track.hDate.valueAsDate  = new Date();
  
      // (C3) LOAD RECORDS FROM LOCAL STORAGE
      let data = localStorage.getItem("expenses");
      if (data != null) { track.data = JSON.parse(data); }
  
      // (C4) DRAW RECORDS
      track.draw();
    },
  
    // (D) DRAW RECORDS
    draw : () => {
      // (D1) EMPTY WRAPPER
      track.hWrap.innerHTML = "";
  
      // (D2) LOOP & DRAW RECORDS
      let row, total = 0;
      for (let date in track.data) { for (let i in track.data[date]) {
        let entry = track.data[date][i];
        total += parseFloat(entry[1]);
  
        row = document.createElement("div");
        row.className = "row";
        row.innerHTML = `
          <input type="button" value="X" onclick="track.del('${date}', ${i})">
          <div class="name">[${date}] ${entry[0]}</div>
          <div class="amt">${entry[1]}</div>`;
        track.hWrap.appendChild(row);
      }}
  
      // (D3) TOTAL
      row = document.createElement("div");
      row.className = "row total";
      row.innerHTML = `<div class="name">Total Expenses</div><div class="amt">${total.toFixed(2)}</div>`
      track.hWrap.appendChild(row);
    },
  
    // (E) ADD ENTRY
    add : () => {
      // (E1) PUSH NEW ENTRY
      if (track.data[track.hDate.value]==undefined) { track.data[track.hDate.value] = []; }
      track.data[track.hDate.value].push([track.hName.value, track.hAmt.value, track.hItems.value]);
  
      // (E2) SORT & SAVE TO LOCALSTORAGE
      // CREDITS : https://www.w3docs.com/snippets/javascript/how-to-sort-javascript-object-by-key.html
      track.data = Object.keys(track.data).sort().reduce((r,k) => (r[k] = track.data[k], r), {});
      track.save();
  
      // (E3) RESET FORM
      track.hName.value = "";
      track.hAmt.value = "";
      track.hItems.value="";
  
      // (E4) DRAW RECORDS
      track.draw();
      return false;
    },
  
    // (F) REMOVE ENTRY
    del : (date, i) => { if (confirm("Delete Entry?")) {
      track.data[date].splice(i, 1);
      if (track.data[date].length==0) { delete track.data[date]; }
      track.save();
      track.draw();
    }}
  };
  window.addEventListener("DOMContentLoaded", track.init);
  