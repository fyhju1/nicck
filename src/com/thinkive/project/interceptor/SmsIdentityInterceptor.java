package com.thinkive.project.interceptor;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import com.thinkive.base.util.RequestHelper;
import com.thinkive.base.util.SessionHelper;
import com.thinkive.base.util.StringHelper;
import com.thinkive.base.util.security.SecurityHelper;
import com.thinkive.gateway.v2.result.Result;
import com.thinkive.project.WebConstants;
import com.thinkive.tbservice.constant.ErrorEnum;
import com.thinkive.tbservice.interceptor.ActionInvocation;
import com.thinkive.tbservice.interceptor.Interceptor;

/**
 * 描述: 短信验证码验证拦截器
 * 版权: Copyright (c) 2012 
 * 公司: 思迪信息
 * 作者: 刘珂
 * 版本: 1.0 
 * 创建日期: Jan 27, 2014 
 * 创建时间: 11:48:55 PM
 */
public class SmsIdentityInterceptor implements Interceptor
{
	
	private static Logger logger = Logger.getLogger(SmsIdentityInterceptor.class);

	
	public Result intercept(ActionInvocation invocation) throws Exception
	{
		logger.info("进入短信验证拦截器");
		HttpServletRequest request = invocation.getRequest();
		String phone = RequestHelper.getString(request, "phone");
		String sms_code = RequestHelper.getString(request, "sms_code");
		sms_code = SecurityHelper.getMD5of32Str(phone + sms_code);
		String usms_code= SessionHelper.getString(WebConstants.SESSION_CUSTOM_SMS_CODE, request.getSession());
		 
		long nowDate=new Date().getTime();
		long sessionTime=SessionHelper.getLong(WebConstants.SESSION_CUSTOM_SMS_DATE,request.getSession());
		Result resultVo = new Result();
		if(sessionTime-nowDate>120000)
		{
			 resultVo.setErr_no(ErrorEnum.TICKET_ERROR.getErrorNo());
		     resultVo.setErr_info("验证码过时");
		     return resultVo;
		}
		  if ((StringHelper.isNotEmpty(sms_code)) && (sms_code.equals(usms_code)))
		  {
			  resultVo.setErr_no(0);
			  resultVo.setErr_info("调用成功!");
		  }
		  else
		  {
			  resultVo.setErr_no(ErrorEnum.TICKET_ERROR.getErrorNo());
		      resultVo.setErr_info("验证码输入错误");
		  }
		  return resultVo;
	}
	
	
	
}
