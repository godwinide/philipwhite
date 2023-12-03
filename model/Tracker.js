const { model, Schema } = require("mongoose");

const TrackerSchema = new Schema({
    trackingNumber: {
        type: String,
        required: true
    },
    parcel: {
        type: String,
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    receiverName: {
        type: String,
        required: true
    },
    senderNumber: {
        type: String,
        required: false
    },
    receiverNumber: {
        type: String,
        required: false
    },
    senderEmail: {
        type: String,
        required: false
    },
    receiverEmail: {
        type: String,
        required: false
    },
    originPort: {
        type: String,
        required: true
    },
    destinationPort: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: false
    },
    cubic: {
        type: String,
        required: false
    },
    packages: {
        type: String,
        required: false
    },
    carrier: {
        type: String,
        required: false
    },
    currentLocation: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: false
    },
    shipmentMode: {
        type: String,
        required: true
    },
    shipmentType: {
        type: String,
        required: true
    },
    departureDate: {
        type: String,
        required: true
    },
    deliveryDate: {
        type: String,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: false
    },
    paymentMethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
});

module.exports = User = model("User", TrackerSchema);