App = {
  web3Provider: null,
  contracts: {},
  account: "0x0",
  hasVoted: false,

  init: function () {
    return App.initWeb3();
  },

  initWeb3: function () {
    if (typeof web3 !== "undefined") {
      const ethEnabled = () => {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          return true;
        }
        return false;
      };
      if (!ethEnabled()) {
        alert(
          "Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"
        );
      }
      web3 = window.web3;
      App.web3Provider = web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function () {
    $.getJSON("Election.json", function (election) {
      App.contracts.Election = TruffleContract(election);
      App.contracts.Election.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  listenForEvents: function () {
    App.contracts.Election.deployed().then(function (instance) {
      instance
        .votedEvent(
          {},
          {
            fromBlock: 0,
            toBlock: "latest",
          }
        )
        .watch(function (error, event) {
          console.log("event triggered", event);
          App.render();
        });
    });
  },

  render: async () => {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");
    var results = $("#resultsBlock");

    loader.show();
    content.hide();
    results.hide();

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      App.account = accounts[0];
      $("#accountAddress").html("Your Account: " + App.account);
    } catch (error) {
      if (error.code === 4001) {
      }
      console.log(error);
    }

    App.contracts.Election.deployed()
      .then(function (instance) {
        electionInstance = instance;
        return electionInstance.candidatesCount();
      })
      .then(async (candidatesCount) => {
        const promise = [];
        for (var i = 1; i <= candidatesCount; i++) {
          promise.push(electionInstance.candidates(i));
        }

        const candidates = await Promise.all(promise);
        var candidatesResults = $("#candidatesResults");
        candidatesResults.empty();

        var candidatesSelect = $("#candidatesSelect");
        candidatesSelect.empty();

        for (var i = 0; i < candidatesCount; i++) {
          var id = candidates[i][0];
          var name = candidates[i][1];
          var voteCount = candidates[i][2];

          var candidateTemplate =
            "<tr><th>" +
            id +
            "</th><td>" +
            name +
            "</td><td>" +
            voteCount +
            "</td></tr>";
          candidatesResults.append(candidateTemplate);

          var candidateOption =
            "<option value='" + id + "' >" + name + "</ option>";
          candidatesSelect.append(candidateOption);
        }
        return electionInstance.voters(App.account);
      })
      .then(function (hasVoted) {
        // Do not allow a user to vote
        if (hasVoted) {
          $("form").hide();
          results.show();
        }
        loader.hide();
        content.show();
      })
      .catch(function (error) {
        console.warn(error);
      });
  },

  castVote: function () {
    var candidateId = $("#candidatesSelect").val();
    App.contracts.Election.deployed()
      .then(function (instance) {
        return instance.vote(candidateId, { from: App.account });
      })
      .then(function (result) {
        $("#content").hide();
        $("#loader").show();
        $(".resultsButton").hide();
      })
      .catch(function (err) {
        console.error(err);
      });
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});

document.getElementById("returnButton").addEventListener("click", function () {
  window.location.href = "index.html";
});

document.getElementById("resultsButton").addEventListener("click", function () {
  window.location.href = "results.html";
});
