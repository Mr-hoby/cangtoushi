function search(key){
	$('input[name=words]').val(key)
	$('#submit').trigger('click')
}
$(function(){
	$("#submit").click(function(){
		var words = $('input[name=words]').val();
		var length = $('input[name=length]:checked').val();
		var type = $('input[name=type]:checked').val();
		var mode = $('input[name=mode]:checked').val();

		if(!words){
			alert('请输入你想要的文字');
			$('input[name=words]').focus();
			return false;
		}
		
		// $.ajax({
		// 	type: "POST",
		// 	url: "/ajax.php",
		// 	dataType: "json",
		// 	data: {
		// 		words: words,
		// 		length: length,
		// 		type: type,
		// 		mode: mode,
		// 	},
		// 	beforeSend: function () {
		// 		$("#submit").val('正在生成').attr("disabled","disabled");
		// 		$("#loading").show();
		// 	},
		// 	success: function (data) {
		// 		if(data.status=='success'){
		// 			$("#words").html(data.words);
		// 			for (var i = 0; i < data.lists.length; i++) {
		// 				num = i+1;
		// 				$("#Shibox_"+num).html(data.lists[i]);
		// 			}
		// 		}else{
		// 			alert("很抱歉，未找到相关藏头诗！");
		// 		}
		// 		$("#submit").val('重新生成').removeAttr("disabled");
		// 		$("#loading").hide();
		// 	}
		// });

		$.ajax({
			type: "POST",
			url: 'http://api.tianapi.com/cangtoushi/index',
		 	dataType: "json",
			data: {
				key:'690c0a0fd807a6eab763e5819ef68e57',
				word: words,
				leng: length,
				type: type,
				pat: mode,
			},
			beforeSend: function () {
				$("#submit").val('正在生成').attr("disabled","disabled");
				$("#loading").show();
			},
			success: function (data) {
				console.log('===>',data.code)
				if(data.code=='200'){
					$("#words").html('成功！！！');
					for (var i = 0; i < data.newslist.length; i++) {
						num = i+1;
						$("#Shibox_"+num).html(data.newslist[i].list);
					}
				}else{
					alert("很抱歉，未找到相关藏头诗！");
				}
				$("#submit").val('重新生成').removeAttr("disabled");
				$("#loading").hide();
			}
		});
	});
});
