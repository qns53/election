# election

E-Voting using Blockchain


In every democracy, the security of an election is a matter of national security. Electronic voting machines have been viewed as flawed, by the security community, primarily based on physical security concerns. Anyone with physical access to such machine can sabotage the machine, thereby affecting all votes cast on the aforementioned machine.
A blockchain is a distributed, immutable, incontrovertible, public ledger. This new technology works through four main features: 
(i)	The ledger exists in many different locations: No single point of failure in the maintenance of the distributed ledger. 
(ii)	There is distributed control over who can append new transactions to the ledger. 
(iii)	Any proposed “new block” to the ledger must reference the previous version of the ledger, creating an immutable chain from where the blockchain gets its name, and thus preventing tampering with the integrity of previous entries.
(iv)	A majority of the network nodes must reach a consensus before a proposed new block of entries becomes a permanent part of the ledger. 

These technological features operate through advanced cryptography, providing a security level equal and/or greater than any previously known database. The blockchain technology is therefore considered, to be the ideal tool, to be used to create the new modern democratic voting process.

You will require following dependencies installed to successfully on machine on which you are implementing above logic:
1.Node Package Manager
2.Ganache
3.Truffle
4.Lite-Server
5.Metamask

Procedure to run project:
•	First launch Ganache which will provide you with blockchain along with accounts.
•	Then launch smart contract using truffle.
•	Then add accounts public key in .json file.
•	Login in Metamask with authorized account i.e account which is allowed to vote for that constituency.
•	Launch website(front-end) from src folder above.


Smart Contract is present in election-2019_update/contracts and .json file for each constituency which in which that constituency accounts are recorded which are authorized to vot for that constituency is in src/js.



