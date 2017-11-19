exports.path = '/cards/:assetId';
var cardEndpoints = ["FGTNWASTELND","REVENGECARD","THEBOUNTY","THEORIGIN","MECHRUNNERS","ROGUEMECH","CRUSADECARD","DEVSTATCARD","GHOSTPILOT","LASTLIGHT"];
var allParams = [];
for (var i = 0; i <cardEndpoints.length;i++){
	var cardParam = {}
  cardParam.assetId = cardEndpoints[i];
  allParams[i] = cardParam;
}
exports.params = allParams;

