/**
 * 文件上传
 * @author SIMON
 * @time 2014.4.30
 */
define(function(require, exports, module) {
	// 加载依赖模块
	require("jquery");
	require("ext");
	require("gconfig");
	require("/osoa/scripts/utils/fileupload/ajaxupload");
    
    //图片上传
     function fileUpload(buttonId,uploadUrl,callback){
    	var button = $('#'+buttonId);
        new AjaxUpload(button, {
            action: uploadUrl,
            name: 'headerImg',
            onSubmit: function (file, ext) {
                if (!(ext && /^(jpg|jpeg|JPG|JPEG|PNG|png|GIF|gif)$/.test(ext))) {
                	layerWeb.alert('图片格式不正确,请选择 jpg,png 格式的文件!',3, '系统提示');
                    return false;
                }
                // change button text, when user selects file
                button.text('上传中');
                // If you want to allow uploading only 1 file at time,
                // you can disable upload button
                this.disable();
                // Uploding -> Uploading. -> Uploading...
                var text = button.text();
                button.text('上传中...');
            },
            onComplete: function (file, response) {
                //file 本地文件名称，response 服务器端传回的信息
                // enable upload button
                this.enable();
                button.text("上传头像");
                response = JSON.parse(response);
                var errorno =response.errorno;
                var errmsg = response.errmsg;
                if(errorno =='0' && callback){
                	callback(response.filepath);
                }else{
                	layerWeb.msg(errmsg,3,3);
                	
                }
            }
        });
    };
	fileUploadUtil = {
			"fileUpload":fileUpload
	} ;
	
	// 暴露对外的接口
	module.exports = fileUploadUtil;
});
