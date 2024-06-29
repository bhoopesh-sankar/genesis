//SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract Agroblockchain {
    address public owner;
    uint256 public Balance;
    uint256 public OrdersCount;
    uint256 public purchaseCount;
    uint256 public deliverycount;
    statsStruct public stats;
    OrdersStruct[] TotOrders;
    ReviewStruct[] TotReviews;

    mapping(address => OrdersStruct[]) OrdersOf;
    mapping(uint256 => buyerStruct[]) buyersOf;
    mapping(uint256 => bool) OrdersExist;

    struct statsStruct {
        uint256 totalorders;
    }

    struct ReviewStruct {
        string review;
        uint rating;
    }

    struct OrdersStruct {
        uint256 id;
        address payable owner;
        string prdname;
        uint256 quantity;
        string description;
        string imageURL;
        uint256 cost;
        string loc;
        uint256 timestamp;
        uint256 expiresAt;
    }

    struct buyerStruct {
        address owner;
        uint256 boughtquantity;
        string buyerloc;
        string buyeremail;
        uint256 price;
        uint256 timestamp;
    }

    modifier ownerOnly() {
        require(msg.sender == owner, "Owner reserved only");
        _;
    }

    event Action(
        uint256 id,
        string actionType,
        address indexed executor,
        uint256 timestamp
    );

    constructor() {
        owner = msg.sender;
    }

    function CreateOrders(
        string memory prdname,
        uint256 quantity,
        string memory description,
        string memory imageURL,
        uint256 cost,
        string memory loc,
        uint256 expiresAt
    ) public returns (bool) {
        require(bytes(prdname).length > 0, "Product Name cannot be empty");
        require(quantity > 0, "Quantity cannot be empty");
         require(bytes(description).length > 0, "Description cannot be empty");
        require(cost > 0 ether, "Price cannot be expty");
        require(bytes(loc).length > 0, "Location cannot be empty");
        require(expiresAt > 0, "Expiry date cannot be empty");
        require(bytes(imageURL).length > 0, "ImageURL cannot be empty");

        OrdersStruct memory order;
        order.id = OrdersCount;
        order.owner = payable(msg.sender);
        order.prdname = prdname;
        order.quantity = quantity;
        order.description = description;
        order.imageURL = imageURL;
        order.cost = cost;
        order.loc = loc;
        order.timestamp = block.timestamp;
        order.expiresAt = expiresAt;

        TotOrders.push(order);
        OrdersExist[OrdersCount] = true;
        OrdersOf[msg.sender].push(order);
        stats.totalorders += 1;

        emit Action(
            OrdersCount++,
            "ORDER CREATED",
            msg.sender,
            block.timestamp
        );

        return true;
    }

    function getOrders() public view returns (OrdersStruct[] memory) {
        return TotOrders;
    }

    function getOrdersCount() public view returns (uint) {
        return OrdersCount;
    }

    function getOrder(uint256 id) public view returns (OrdersStruct memory) {
        require(OrdersExist[id], "Project not found");

        return TotOrders[id];
    }

    function purchaseOrder(uint256 id,
        uint256 quantity,
        string memory buyeremail,
        string memory buyerloc) public payable {
        require(OrdersExist[id], "Project not found");
        address seller = TotOrders[id].owner;
        require(TotOrders[id].quantity != 0, "Stock not available");
        require(TotOrders[id].owner != msg.sender, "You can't buy your own product");
        TotOrders[id].quantity = TotOrders[id].quantity - quantity;
        payable(seller).transfer(msg.value);
        purchaseCount++;
         buyersOf[id].push(
            buyerStruct(
                msg.sender,
                quantity,
                buyerloc,
                buyeremail,
                msg.value,
                block.timestamp
            )
        );

        emit Action(id, "PROJECT PURCHASED", msg.sender, block.timestamp);
    }

    function getpurchaseCount() public view returns (uint) {
        return purchaseCount;
    }

    function getBuyer(uint256 id) public view returns (buyerStruct[] memory) {
        return buyersOf[id];
    }

    function getReview(string memory rev, uint rat) public {
        ReviewStruct memory reviews;
        reviews.review = rev;
        reviews.rating = rat;
        TotReviews.push(reviews);
    }

    function getReviewlist() public view returns(ReviewStruct[] memory) {
        return TotReviews;
    }
}
