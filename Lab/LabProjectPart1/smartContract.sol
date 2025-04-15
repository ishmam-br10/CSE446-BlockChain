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
    mapping(uint256 => mapping(address => bool)) public SlotBooked;

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

    // ============= Core 
    // Registered user 
    function registerCustomer(string memory _name, string memory _NIDcard, ROLE _role) public{
        require(customers[msg.sender].role == ROLE.None, "Already registered");
        require(_role == ROLE.CIVILIAN || _role == ROLE>FEDRA, "The Role is INVALID");

        customers[msg.sender] = customer({
            name: _name,
            NIDnumber: _NIDcard,
            role: _role,
            thikanaOfUser: msg.sender
        });
        string memory roleStr = _role == ROLE.CIVILIAN ? "CIVILIAN" : "FEDRA";
        emit CustomerRegistrationKorse(msg.sender, roleStr);
    }

    # core function 2: Report missing
    function harayJawaReportKorseJe(
        string memory nameOfLost,
        uint256 ageOfLost,
        uint256 heightOfLost,
        string memory DescriptionOfLost,
        string memory DivisionOfLost,
        string memory ContactWhom
    ) public {
        require(customers[msg.sender].role == ROLE.CIVILIAN, "Anomaly can be reported ONLY by CIVILIANS.");

        URGENCY urgencyLevel;
        if (ageOfLost < 18){
            urgencyLevel = URGENCY.max;
        }
        else if(ageOfLost > 50){
            urgencyLevel = URGENCY.mid;
        }
        else{
            urgencyLevel = URGENCY.min;
        }

        harayGeseJe memory newCase = harayGeseJe({
            CaseNum: NextCaseNum,
            nameOfLost: nameOfLost,
            ageOfLost: ageOfLost,
            heightOfLost: heightOfLost,
            status: STATUS.HarayGese,
            DescriptionOfLost: DescriptionOfLost,
            DivisionOfLost: DivisionOfLost,
            ContactWhom: ContactWhom,
            urgency: urgencyLevel,
            fedra: address(0)
        })

        cases[NextCaseNum] = newCase;
        DivisionCount[DivisionOfLost]++;
        emit HarayJawaReported(NextCaseNum);
        NextCaseNum++;
    }
    
    // Core function 3: Status Update 
    function updateTheStatus(uint256 _caseNum, STATUS _newStatus) public {
        require(customers[msg.sender].role == ROLE.ADMIN, "Authorized Personnel aka ADMIN only");
        require(_caseNum < NextCaseNum, "Case Number is Invalid, REJECTED");

        harayGeseJe storage caseToUpdate = cases[_caseNum];

        require(caseToUpdate.status == STATUS.HarayGese, "Redundant Operation, Case already marked as FOUND");
        require(_newStatus == STATUS.PawaGese, "Status is not valid to update");

        caseToUpdate.status = _newStatus;
        emit StatusUpdateKorsi(_caseNum, "PawaGese");
    }

    // Core function 4: Fedra assign

    function 
}
