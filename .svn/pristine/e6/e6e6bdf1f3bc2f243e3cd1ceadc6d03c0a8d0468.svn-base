package com.thinkive.project.interceptor;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import com.thinkive.base.config.Configuration;
import com.thinkive.base.util.CookieHelper;
import com.thinkive.gateway.v2.result.Result;
import com.thinkive.project.WebConstants;
import com.thinkive.tbservice.interceptor.ActionInvocation;
import com.thinkive.tbservice.interceptor.Interceptor;

public class LogoutInterceptor implements Interceptor
{
	private static final long serialVersionUID = 8318249557521641189L;
	
	private static Logger logger = Logger.getLogger(LogoutInterceptor.class);
	
	private static String domain = Configuration.getString("system.domainName");
	
	public Result intercept(ActionInvocation invocation) throws Exception
	{
		logger.info("进入退出登录拦截器");
		
		HttpServletRequest request = invocation.getRequest();
		logger.info("logout sessionid:" + request.getSession().getId());
		request.getSession().invalidate();
		CookieHelper.setCookie(invocation.getResponse(), WebConstants.COOKIE_CLIENT_INFO, "", 0, "/", domain);
		
		Result resultVo = new Result();
		resultVo.setErr_no(0);
		resultVo.setErr_info("调用成功!");
		return resultVo;
	}
}