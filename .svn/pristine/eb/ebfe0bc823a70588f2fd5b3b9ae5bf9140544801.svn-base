package com.thinkive.project.interceptor;

import java.util.Map;

import org.apache.log4j.Logger;

import com.thinkive.base.config.Configuration;
import com.thinkive.base.util.CookieHelper;
import com.thinkive.base.util.MapHelper;
import com.thinkive.base.util.StringHelper;
import com.thinkive.base.util.security.AES;
import com.thinkive.gateway.v2.result.Result;
import com.thinkive.project.WebConstants;
import com.thinkive.project.util.IPHelper;
import com.thinkive.project.util.RSA;
import com.thinkive.tbservice.interceptor.ActionInvocation;
import com.thinkive.tbservice.interceptor.Interceptor;

/**
 * 描述: 
 * 版权: Copyright (c) 2012 
 * 公司: 思迪信息
 * 作者: 李炜
 * 版本: 1.0 
 * 创建日期: Mar 10, 2014 
 * 创建时间: 10:15:43 AM
 */
public class ParamsInterceptor implements Interceptor
{
	private static Logger logger = Logger.getLogger(ParamsInterceptor.class);
	
	private static final String ENCRYPT_RSA = "encrypt_rsa:";
	
	private static final String USER_ID = "login_id" ;
	
	private static final String FUND_ACCOUNT = "fund_account" ;
	
	public Result intercept(ActionInvocation invocation) throws Exception
	{
		logger.info("进入参数拦截器");
		Map param = invocation.getParamMap();
		String url = invocation.getRequest().getRequestURI();
		if (param != null)
		{
			String ip = MapHelper.getString(param, "ip");
			if (StringHelper.isEmpty(ip))
			{
				ip = IPHelper.getIpAddr(invocation.getRequest());
				param.put("ip", ip);
			}
			String passwordFields = Configuration.getString("system.passwordFields");
			if(StringHelper.isNotBlank(passwordFields))
			{
				String[] passwords = StringHelper.split(passwordFields, "|");
				if(passwords != null && passwords.length > 0)
				{
					for(int i = 0; i < passwords.length; i ++)
					{
						String password = passwords[i];
						String encrypt = MapHelper.getString(param, password);
						if(StringHelper.isNotBlank(encrypt) && encrypt.startsWith(ENCRYPT_RSA))
						{
							encrypt = encrypt.substring(ENCRYPT_RSA.length());
							encrypt = RSA.decrypt(encrypt);
							param.put(password, encrypt);
						}
					}
				}
			}
			
			//替换user_id 和 fund_account,预防利用session串号操作
			String verifyKey = Configuration.getString("system.verifyKey");
			AES aes = new AES(verifyKey);
			String userId = MapHelper.getString(param, USER_ID);
			if(StringHelper.isNotBlank(userId)){
				String userIdAes = CookieHelper.getCookieValue(invocation.getRequest(), WebConstants.SESSION_USER_ID);
				String decodeStr = aes.decrypt(userIdAes, "UTF-8");
				if(StringHelper.isNotBlank(decodeStr) && !decodeStr.startsWith("|")){
					String[] temp = StringHelper.split(decodeStr, "|");// 账户id
					if(StringHelper.isNotBlank(temp[0])){ //如果为空不做替换
						param.put(USER_ID, temp[0]);
					}
				}
			}
			
			String fundAccount = MapHelper.getString(param, FUND_ACCOUNT);
			if(StringHelper.isNotBlank(fundAccount)){
				String fundAccountAes = CookieHelper.getCookieValue(invocation.getRequest(), WebConstants.SESSION_FUND_ACCOUNT);
				String decodeStr = aes.decrypt(fundAccountAes, "UTF-8");
				if(StringHelper.isNotBlank(decodeStr) && !decodeStr.startsWith("|")){
					String[] temp = StringHelper.split(decodeStr, "|");// 账户id
					if(StringHelper.isNotBlank(temp[0])){ //如果为空不做替换
						param.put(FUND_ACCOUNT, temp[0]);
					}
				}
			}
		}
		return invocation.invoke();
	}
	
	public static void main(String[] args) {
		
	}
}
