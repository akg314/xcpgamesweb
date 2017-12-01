exports.path = '/cards/:assetId';
var cardEndpoints = ["FGTNWASTELND","REVENGECARD","THEBOUNTY","THEORIGIN","MECHRUNNERS","ROGUEMECH","CRUSADECARD","DEVSTATCARD","GHOSTPILOT","LASTLIGHT","ETHEREUMCARD","XAJIBOSS","SATOSHICARD","CRYSTALIBUR","SARUTOBICARD","BTCMEETUPCD","NEMCARD","FORKCARD","CARDAUGUR","SATOSHILITE","DASHCD","DAOSOGCARD"];
var allParams = [];
for (var i = 0; i <cardEndpoints.length;i++){
	var cardParam = {}
  cardParam.assetId = cardEndpoints[i];
  allParams[i] = cardParam;
}
exports.params = allParams;

