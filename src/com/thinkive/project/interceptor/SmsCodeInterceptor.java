package com.thinkive.project.interceptor;

import java.util.Date;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.thinkive.base.jdbc.DataRow;
import com.thinkive.base.util.StringHelper;
import com.thinkive.gateway.v2.result.Result;
import com.thinkive.project.WebConstants;
import com.thinkive.tbservice.constant.ErrorEnum;
import com.thinkive.tbservice.interceptor.ActionInvocation;
import com.thinkive.tbservice.interceptor.Interceptor;

/**
 * 描述: 短信接口拦截器
 * 版权: Copyright (c) 2012 
 * 公司: 思迪信息
 * 作者: 刘珂
 * 版本: 1.0 
 * 创建日期: Jan 27, 2014 
 * 创建时间: 11:48:55 PM
 */
public class SmsCodeInterceptor implements Interceptor
{
	
	private static Logger logger = Logger.getLogger(SmsCodeInterceptor.class);

	
	public Result intercept(ActionInvocation invocation) throws Exception
	{
		logger.info("进入短信验证生成拦截器");
		Result result = invocation.invoke();
		
		if (result != null && result.getErr_no() == ErrorEnum.SUCCESS_CODE.getErrorNo())
		{
			DataRow resultData = result.getData();
			String sms_code = resultData.getString("sms_code");
			
			if (StringHelper.isNotEmpty(sms_code))
			{
				HttpSession session = invocation.getRequest().getSession();
				session.setAttribute(WebConstants.SESSION_CUSTOM_SMS_CODE, sms_code);
				session.setAttribute(WebConstants.SESSION_CUSTOM_SMS_DATE,new Date().getTime());
			}
		}
		return result;
	}
	
	
	
}
