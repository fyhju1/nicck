package root;

import java.io.PrintWriter;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

import com.thinkive.base.config.Configuration;
import com.thinkive.base.jdbc.DataRow;
import com.thinkive.base.util.CookieHelper;
import com.thinkive.base.util.StringHelper;
import com.thinkive.base.util.security.AES;
import com.thinkive.web.base.ActionResult;
import com.thinkive.web.base.BaseAction;

/**
 * 描述：
 * 版权：Copyright (c) 2015
 * 公司：思迪科技
 * 作者： 李晖
 * 版本： 1.0
 * 创建时间：2015-8-13 下午7:24:07
 */
public class AccountloginAction extends BaseAction{
   
private static Logger logger = Logger.getLogger(AccountloginAction.class);
	
	public ActionResult doSignInUser() throws Exception {
		
		try {
			
			String encodeStr = CookieHelper.getCookieValue(this.getRequest(),"clientinfo");//得到cookie里的值
		
			String decodeStr = null;
			String name = null;
			
			if (StringHelper.isNotEmpty(encodeStr)) {
				String[] str = StringHelper.split(encodeStr,"&");
				if (str != null && str.length == 2) {
					String user_id = str[0];
					String user_name = str[1];
					String verifyKey = Configuration.getString("system.verifyKey");
					
					AES aes = new AES(verifyKey);
					 decodeStr = aes.decrypt(user_id,"GBK");
					 name = aes.decrypt(user_name,"GBK");
					 logger.info("decodeStr:"+decodeStr+"---name:"+name);
				}
			}
			boolean fage = true;
			DataRow data = new DataRow();
			
			JSONObject json = new JSONObject();
			if ((decodeStr == "" || decodeStr == null)&&(name == "" || name == null)) {
				fage = false;
				data.set("noYes", fage);// 没登录
			} else {
				data.set("noYes", fage);// 已登录
			}
			data.set("id", decodeStr);
			data.set("name", name);
			json.put("data", data);
			PrintWriter writer = null;
			writer = getResponse().getWriter();
			writer.print(json.toString());
			writer.flush();
			writer.close();
			writer = null;
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}
		return null;
	}
}
