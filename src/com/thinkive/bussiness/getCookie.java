package com.thinkive.bussiness;

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
 * ������
 * ��Ȩ��Copyright (c) 2015
 * ��˾��˼�ϿƼ�
 * ���ߣ� ����
 * �汾�� 1.0
 * ����ʱ�䣺2015-8-13 ����7:24:07
 */
public class getCookie extends BaseAction{
   
private static Logger logger = Logger.getLogger(getCookie.class);
	
	public ActionResult doSignInUser() throws Exception {
		
		try {
			
			String encodeStr = CookieHelper.getCookieValue(this.getRequest(),"clientinfo");//�õ�cookie���ֵ
		
			String decodeStr = null;
			String name = null;
			
			if (StringHelper.isNotEmpty(encodeStr)) {
				String[] str = StringHelper.split(encodeStr,"&");
				if (str != null && str.length == 2) {
					String user_id = str[0];
					String user_name = str[1];
					String verifyKey = Configuration.getString("system.verifyKey");
					
					AES aes = new AES(verifyKey);
					 decodeStr = aes.decrypt(user_id,"UTF-8");
					 name = aes.decrypt(user_name,"UTF-8");
					 logger.info("decodeStr:"+decodeStr+"---name:"+name);
				}
			}
			boolean fage = true;
			DataRow data = new DataRow();
			
			JSONObject json = new JSONObject();
			if ((decodeStr == "" || decodeStr == null)&&(name == "" || name == null)) {
				fage = false;
				data.set("noYes", fage);// û��¼
			} else {
				data.set("noYes", fage);// �ѵ�¼
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
