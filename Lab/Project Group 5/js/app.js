console.log("app.js loaded");
let App = {

  web3Provider: null,
  contracts: {},
  account: null,

  init: async function () {
    return App.initWeb3();
  },

  initWeb3: async function () {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Connected to MetaMask successfully!");
      } catch (error) {
        console.error("User denied account access...", error);
        alert("Please allow MetaMask access to continue.");
        return;
      }
    } else {
      alert("MetaMask not detected! Please install MetaMask to use this application.");
      return;
    }

    App.web3 = new Web3(App.web3Provider);
    App.account = (await App.web3.eth.getAccounts())[0];
    console.log("Connected account:", App.account);
    
    return App.initContract();
  },

  initContract: function () {
    console.log("Initializing contract...");
    
    // Use a relative path
    fetch("/contracts/LokJonHarayGese.json")
      .then(response => {
        if (!response.ok) {
          throw new Error(`Contract JSON not found! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Contract data loaded successfully");
        App.contracts.LokJonHarayGese = TruffleContract(data);
        App.contracts.LokJonHarayGese.setProvider(App.web3Provider);
        App.detectUserRole();
        return App.bindEvents();
      })
      .catch(err => {
        console.error("🚨 Could not load contract JSON!", err);
        alert("Failed to load contract. Please check the console for details.");
      });
  },

  bindEvents: function () {
    console.log("Binding events...");
    
    const registerBtn = document.getElementById("registerBtn");
    if (registerBtn) {
      registerBtn.addEventListener("click", App.handleRegister);
      console.log("Register button bound");
    }

    const reportBtn = document.getElementById("reportBtn");
    if (reportBtn) {
      reportBtn.addEventListener("click", App.handleReportMissing);
      console.log("Report button bound");
    }
    
    const bookBtn = document.getElementById("bookBtn");
    if (bookBtn) {
      bookBtn.addEventListener("click", App.handleAppointmentBooking);
      console.log("Book button bound");
    }
    
    const statusBtn = document.getElementById("statusBtn");
    if (statusBtn) {
      statusBtn.addEventListener("click", App.handleUpdateStatus);
      console.log("Status button bound");
    }
    
    const scheduleBtn = document.getElementById("scheduleBtn");
    if (scheduleBtn) {
      scheduleBtn.addEventListener("click", App.handleViewSchedule);
      console.log("Schedule button bound");
    }
    
    const divisionBtn = document.getElementById("divisionBtn");
    if (divisionBtn) {
      divisionBtn.addEventListener("click", App.handleDivisionSearch);
      console.log("Division button bound");
    }
  },

  handleRegister: function (event) {
    event.preventDefault();
    console.log("Register function called");

    const name = document.getElementById("name").value;
    const nid = document.getElementById("nid").value;
    const role = parseInt(document.getElementById("role").value);
    
    console.log("Registering with:", { name, nid, role });

    App.contracts.LokJonHarayGese.deployed()
      .then(instance => {
        return instance.registerCustomer(name, nid, role, { from: App.account });
      })
      .then(receipt => {
        console.log("Registration transaction receipt:", receipt);
        alert("Registration successful!");
        App.detectUserRole();
      })
      .catch(err => {
        console.error("Registration error:", err);
        alert("Registration failed: " + err.message);
      });
  },

  handleReportMissing: function (event) {
    event.preventDefault();
    console.log("Report missing function called");

    const name = document.getElementById("mp-name").value;
    const age = parseInt(document.getElementById("mp-age").value);
    const height = parseInt(document.getElementById("mp-height").value);
    const description = document.getElementById("mp-description").value;
    const division = document.getElementById("mp-division").value;
    const contact = document.getElementById("mp-contact").value;
    
    console.log("Reporting missing person:", { name, age, height, description, division, contact });

    App.contracts.LokJonHarayGese.deployed()
      .then(instance => {
        return instance.harayJawaReportKorseJe(
          name,
          age,
          height,
          description,
          division,
          contact,
          { from: App.account }
        );
      })
      .then(receipt => {
        console.log("Report transaction receipt:", receipt);
        alert("Missing person reported successfully!");
      })
      .catch(err => {
        console.error("Report error:", err);
        alert("Failed to report missing person: " + err.message);
      });
  },
  
  handleAppointmentBooking: function (event) {
    event.preventDefault();
    console.log("Appointment booking function called");
  
    const caseNum = parseInt(document.getElementById("caseNum").value);
    const fedraAddr = document.getElementById("fedraAddress").value;
    const slotTime = parseInt(document.getElementById("slotTime").value);
    const ethAmount = App.web3.utils.toWei("0.05", "ether");
    
    console.log("Booking appointment:", { caseNum, fedraAddr, slotTime, ethAmount });
  
    App.contracts.LokJonHarayGese.deployed()
      .then(instance => {
        return instance.AppointmentBookKorse(caseNum, fedraAddr, slotTime, {
          from: App.account,
          value: ethAmount
        });
      })
      .then(receipt => {
        console.log("Booking transaction receipt:", receipt);
        alert("Appointment booked successfully!");
      })
      .catch(err => {
        console.error("Booking error:", err);
        alert("Failed to book appointment: " + err.message);
      });
  },
  
  handleUpdateStatus: function (event) {
    event.preventDefault();
    console.log("Update status function called");
  
    const caseNum = parseInt(document.getElementById("statusCaseNum").value);
    const newStatus = parseInt(document.getElementById("newStatus").value);
    
    console.log("Updating status:", { caseNum, newStatus });
  
    App.contracts.LokJonHarayGese.deployed()
      .then(instance => {
        return instance.updateTheStatus(caseNum, newStatus, { from: App.account });
      })
      .then(receipt => {
        console.log("Status update transaction receipt:", receipt);
        alert("Status updated successfully!");
      })
      .catch(err => {
        console.error("Status update error:", err);
        alert("Failed to update status. Make sure you are the Admin: " + err.message);
      });
  },
  
  handleViewSchedule: function (event) {
    event.preventDefault();
    console.log("View schedule function called");
  
    const fedraAddr = document.getElementById("scheduleFedraAddr").value;
    const listContainer = document.getElementById("scheduleList");
    listContainer.innerHTML = "";
    
    console.log("Viewing schedule for:", fedraAddr);
  
    App.contracts.LokJonHarayGese.deployed()
      .then(instance => {
        return instance.DekhteChaiSchedule.call(fedraAddr, { from: App.account });
      })
      .then(appointments => {
        console.log("Schedule data:", appointments);
        if (appointments.length === 0) {
          listContainer.innerHTML = "<li class='list-group-item'>No appointments found.</li>";
        } else {
          appointments.forEach(app => {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = `Case #${app.CaseNum}, Time: ${app.time}, Booked By: ${app.BookedByWhom}`;
            listContainer.appendChild(li);
          });
        }
      })
      .catch(err => {
        console.error("Schedule view error:", err);
        alert("Failed to fetch schedule: " + err.message);
      });
  },
  
  handleDivisionSearch: function (event) {
    event.preventDefault();
    console.log("Division search function called");
  
    const division = document.getElementById("divisionInput").value;
    const result = document.getElementById("divisionResult");
    
    console.log("Searching division:", division);
  
    App.contracts.LokJonHarayGese.deployed()
      .then(instance => {
        return instance.DivisionCount.call(division, { from: App.account });
      })
      .then(count => {
        console.log("Division count:", count.toString());
        result.innerHTML = ` ${division}: <strong>${count}</strong> case(s) reported.`;
      })
      .catch(err => {
        console.error("Division search error:", err);
        result.innerHTML = "Error fetching data. Check console.";
      });
  },
  
  detectUserRole: function () {
    console.log("Detecting user role...");
    const banner = document.getElementById("userRoleBanner");
    
    if (!App.contracts.LokJonHarayGese) {
      console.error("Contract not loaded yet");
      banner.innerHTML = " Waiting for contract to load...";
      return;
    }
  
    App.contracts.LokJonHarayGese.deployed()
      .then(instance => {
        return instance.customers(App.account);
      })
      .then(user => {
        console.log("User data:", user);
        const roleNum = user.role.toString();
        let roleName;
  
        switch (roleNum) {
          case "0":
            roleName = "Unregistered";
            break;
          case "1":
            roleName = "ADMIN";
            break;
          case "2":
            roleName = "CIVILIAN";
            break;
          case "3":
            roleName = "FEDRA";
            break;
          default:
            roleName = "Unknown";
        }
  
        banner.innerHTML = `You are logged in as: <strong>${roleName}</strong>`;
        console.log("User role detected:", roleName);
      })
      .catch(err => {
        console.error("Role check failed:", err);
        banner.innerHTML = "Could not detect role.";
      });
  }
};

window.addEventListener("load", function () {
  App.init();
});