// Use AV.Cloud.define to define as many cloud functions as you want.

AV.Cloud.define("_conversationRemove", function(request, response) {
  // 在将用户踢出对话时，同时加入黑名单表

  var cid = request.params.convId;
  var members = request.params.members;

  // 假设黑名单表名为 BlackList
  var BlackList = AV.Object.extend("BlackList");
  var query = new AV.Query(BlackList);

  // 查找关于某个对话的黑名单记录
  query.equalTo("convId", cid);

  query.find({
	  success: function(results){
      var blacklist;
      if (results.length > 0) {
        blacklist = results[0];
      } else {
        blacklist = new BlackList();
        blacklist.set("convId", cid);
      }

      // 将这次踢出的用户加入黑名单
      members.forEach(function(m){
  	    blacklist.addUnique("m", m);
      });

      blacklist.save(null, {
          success: function(){
            response.success({});
          },
          error: function(e) {
            console.log(e);
            response.success({});
          }
      });
	  },
	  error: function(e) {
      console.log(e);
      response.success({});
	  }
	});
});

AV.Cloud.define("_conversationAdd", function(request, response) {
  // 在用户加入对话时，检查是否在黑名单里
  var members = request.params.members;
  var cid = request.params.convId;

  var BlackList = AV.Object.extend("BlackList");
  var member_query = [];

  members.forEach(function(m){
    var q = new AV.Query("BlackList");
    q.equalTo("m", m);
    member_query.push(q)
  });
  var query = AV.Query.or.apply(null, member_query);
  query.equalTo("convId", cid);

  query.find({
    success: function(results) {
      if (results.length > 0) {
          response.success({reject: true});
      } else {
          response.success({});
      }
    },
    error : function() {
      response.success({})
    }
  });
});
