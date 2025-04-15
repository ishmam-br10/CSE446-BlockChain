// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LokJonHarayGese{
    enum ROLE {None, ADMIN, CIVILIAN, FEDRA}
    enum STATUS {HarayGese, PawaGese}
    enum URGENCY {min, mid, max}

    struct customer {
        string name;
        string NIDnumber;
        ROLE role;
        address thikanaOfUser;
    }

    struct harayGeseJe{
        uint256 CaseNum;
        string nameOfLost;
        uint256 ageOfLost;
        uint256 heightOfLost;
        STATUS status;
        string DescriptionOfLost;
        string DivisionOfLost;
        string ContactWhom;
        URGENCY urgency;
        address whoReported;
        address fedra;
    }

    struct AppointmentForMissing{
        uint256 CaseNum;
        address fedra;
        uint256 time;
        address BookedByWhom;
    }

    // state variables
    uint256 public NextCaseNum;
    address public contractOwnedBy;

    // user registration
    mapping(address => customer) public customers;

    // haray jawa betar data
    mapping(uint256 => harayGeseJe) public cases;

    // kon kon division theke haraise
    mapping(string => uint256) public DivisionCount;

    // assign cases
    mapping(uint256 => address) public CaseToFedra;
    mapping(address => uint[]) public FedraCases;

    // appointments details
    mapping(address => AppointmentForMissing[]) public FedraSchedule;
    mapping(uint256 => mapping(address => bool)) public SlotBooked

    // event tracker for functions
    event CustomerRegistrationKorse(address customer, string role);
    event HarayJawaReported(uint256 CaseNum);
    event StatusUpdateKorsi(uint256 CaseNum, string newStatus);
    event FEDRAassigned(uint256 CaseNum, address fedra);
    event AppointmentBookKorse(address whoReported, address fedra, uint time);

    // modifier

    modifier shudhuAdmin(){

    }

    modifier shudhuJeReportKorse(){

    }

    modifier onlyCustomerReg(){

    }

    // constructor
    constructor(){
        contractOwnedBy = msg.sender;
        // bootstrapping
        customers[msg.sender] = customer("ADMIN", "N/A", ROLE.ADMIN, msg.sender);
    }

}
