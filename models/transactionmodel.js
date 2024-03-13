const { string } = require('joi');
const mongoose = require('mongoose');

const tranSchema = new mongoose.Schema({
  trandatetime: { type: String, required: true },
  Pointofserviceentrymode: { type: String, required: true },
  Pointofserviceconditioncode: { type: String, required: true },
  PAN: { type: String, required: true },
  ProcessingCode:{ type: String, required: true },
  TransactionAmount:{ type: String, required: true },
  SettlementConversionRate:{ type: String, required: true },
  SystemTraceAuditNumber:{ type: String, required: true },
  Track2Data:{ type: String, required: true },
  RetrievalReferenceNumber:{ type: String, required: true },
  ICCData:{ type: String, required: true },

}, { collection: 'transactions' });

const Tran = mongoose.model('Tran', tranSchema);

module.exports = Tran;
