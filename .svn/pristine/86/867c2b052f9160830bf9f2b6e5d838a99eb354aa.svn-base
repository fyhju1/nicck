package com.thinkive.project.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.thinkive.base.config.Configuration;
import com.thinkive.base.jdbc.DataRow;
import com.thinkive.base.util.CookieHelper;
import com.thinkive.base.util.SessionHelper;
import com.thinkive.base.util.StringHelper;
import com.thinkive.base.util.security.AES;
import com.thinkive.gateway.v2.result.Result;
import com.thinkive.project.WebConstants;
import com.thinkive.tbservice.constant.ErrorEnum;
import com.thinkive.tbservice.interceptor.ActionInvocation;
import com.thinkive.tbservice.interceptor.Interceptor;

/**
 * 描述: 
 * 版权: Copyright (c) 2012 
 * 公司: 思迪信息
 * 作者: 李炜
 * 版本: 1.0 
 * 创建日期: Jan 27, 2014 
 * 创建时间: 11:48:55 PM
 */
public class LoginInterceptor implements Interceptor
{
	
	private static Logger logger = Logger.getLogger(LoginInterceptor.class);

	private static String domain = Configuration.getString("system.domainName");
	
	public Result intercept(ActionInvocation invocation) throws Exception
	{
		logger.info("进入登录拦截器");
		Result result = invocation.invoke();
		if (result != null && result.getErr_no() == ErrorEnum.SUCCESS_CODE.getErrorNo())
		{
			DataRow resultData = result.getData();
			String id = resultData.getString("login_id");
			String name= resultData.getString("name");
			String mobile= resultData.getString("mobile");
			String cardno = resultData.getString("cardno");
			String account_name = resultData.getString("account_name");
			String fund_account = resultData.getString("sfundacco");
			if (StringHelper.isNotEmpty(id))
			{
				saveUserSession(invocation.getRequest().getSession(), resultData);
				String clientinfo = setUserCookie(invocation.getRequest(), invocation.getResponse(),id,name,cardno,account_name,fund_account);
				resultData.set("clientinfo", clientinfo);
				String jessionid = invocation.getRequest().getSession().getId();
				resultData.set("jsessionid", jessionid);
			}
		}
		return result;
	}
	
	/**
	 * 
	 * 描述：保存登录信息到cookie
	 * 作者：李炜
	 * 时间：Feb 14, 2014 10:29:29 AM
	 * @param request
	 * @param id
	 */
	private String setUserCookie(HttpServletRequest request, HttpServletResponse response, String id,String name,String cardno,String account_name,String fund_account)
	{
		String verifyKey = Configuration.getString("system.verifyKey");
		AES aes = new AES(verifyKey);
		String user_id_aes = aes.encrypt(id + "|" + System.currentTimeMillis(), "UTF-8");
		String user_name_aes = aes.encrypt(name + "|" + System.currentTimeMillis(), "UTF-8");
		String client_id =aes.encrypt(cardno+"|"+System.currentTimeMillis(),"UTF-8");
		String account_name_aes =aes.encrypt(account_name+"|"+System.currentTimeMillis(),"UTF-8");
		String fund_account_aes =aes.encrypt(fund_account+"|"+System.currentTimeMillis(),"UTF-8");
		CookieHelper.setCookie(response, WebConstants.COOKIE_CLIENT_INFO, user_id_aes+"&"+user_name_aes+"&"+client_id+"&"+account_name_aes+"&"+fund_account_aes,-1, "/", domain);
		//报存user_id 和 fund_account
		CookieHelper.setCookie(response, WebConstants.SESSION_USER_ID, user_id_aes , -1, "/", domain);
		CookieHelper.setCookie(response, WebConstants.SESSION_FUND_ACCOUNT, fund_account_aes , -1, "/", domain);
		return user_id_aes;
	}
	
	/**
	 * 
	 * 描述：保存用户信息到session
	 * 作者：李炜
	 * 时间：Feb 14, 2014 10:10:46 AM
	 * @param session
	 * @param dataRow
	 */
	private void saveUserSession(HttpSession session, DataRow dataRow)
	{
		String id = dataRow.getString("login_id");
		String custname = dataRow.getString("name");
		String cardno = dataRow.getString("cardno");
		String fund_account = dataRow.getString("sfundacco");
		String fund_code = dataRow.getString("sfundcode");
//		
		SessionHelper.setString(WebConstants.SESSION_CLIENT_IDNO, cardno, session);
		SessionHelper.setString(WebConstants.SESSION_CLIENT_ID, id, session);
		SessionHelper.setString(WebConstants.SESSION_CLIENT_CUSTNAME, custname, session);
		SessionHelper.setString(WebConstants.SESSION_FUND_ACCOUNT, fund_account, session);
		SessionHelper.setString(WebConstants.SESSION_FUND_CODE, fund_code, session);
		
		
	}
	
	
	
}
