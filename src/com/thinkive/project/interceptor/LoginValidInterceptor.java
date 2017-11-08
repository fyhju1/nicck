package com.thinkive.project.interceptor;

import org.apache.log4j.Logger;

import com.thinkive.base.config.Configuration;
import com.thinkive.base.util.SessionHelper;
import com.thinkive.base.util.StringHelper;
import com.thinkive.gateway.v2.result.Result;
import com.thinkive.project.WebConstants;
import com.thinkive.tbservice.interceptor.ActionInvocation;
import com.thinkive.tbservice.interceptor.Interceptor;

/**
 * 描述: 登陆状态判断
 * 版权: Copyright (c) 2012 
 * 公司: 思迪信息
 * 作者: 刘珂
 * 版本: 1.0 
 * 创建日期: Jan 27, 2014 
 * 创建时间: 11:48:55 PM
 */
public class LoginValidInterceptor implements Interceptor
{
	
	private static Logger logger = Logger.getLogger(LoginValidInterceptor.class);

	private static String domain = Configuration.getString("system.domainName");
	
	public Result intercept(ActionInvocation invocation) throws Exception
	{
		logger.info("进入登陆状态拦截器");
		Result result = null;
		String login_id=SessionHelper.getString(WebConstants.SESSION_CLIENT_ID, invocation.getRequest().getSession());
		if(StringHelper.isEmpty(login_id))
		{
			result=new Result();
			result.setErr_no(-1);
			result.setErr_info("用户登陆异常,请重新登陆！");
		}
		else
		{
			result=new Result();
			result.setErr_no(0);
		}
		return result;
	}
	
		
	
}
