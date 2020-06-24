App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: function() {
    $("#candidatesResults").empty()
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.Election.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.votedEvent({}, {
        fromBlock: 'latest',
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded

        App.render();
      });
    });
  },

  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();
    
    var cand=new Array();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);
    for(c in myObj){
      cand.push(myObj[c]);
    }
    
      }
    };

    xmlhttp.open("GET", "js/data_2.json", true);
    xmlhttp.send();
    var check=0;
    console.log(check);
    // Load account data
    web3.eth.getAccounts(function(err, account) {
      if (err === null) {
        App.account = account[0];
        
        for(var i=0;i<cand.length;i++){
          console.log(cand[i]);
          if(typeof cand[i]=='string'){
          var acc=cand[i].toLowerCase();
          if(account[0]==acc){$("#accountAddress").html("Your Account: " + account[0]);check=1;}
          }
        }
       console.log(check);
       if(check==0){$("#load").html("Unauthorized access");}
        $("#candidatesResults").empty()
      }
    });

    // Load contract data
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount_p();
    }).then(function(candidatesCount) {
       //$("#candidatesRe"sults).empty();
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      var candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates_p(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          candidatesResults.append(candidateTemplate);

          // Render candidate ballot option
          var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
          candidatesSelect.append(candidateOption);
        });
      }

      return electionInstance.voters(App.account);
    }).then(function(hasVoted) {
      // Do not allow a user to vote
      if(hasVoted) {
        $('form').hide();
      }

      
      if(check==1){content.show();loader.hide();}
      else{loader.show();}
    }).catch(function(error) {
      console.warn(error);
    });
  },

  castVote: function() {
    var candidateId = $('#candidatesSelect').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote_p(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
