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
 * ����: ������֤����֤������
 * ��Ȩ: Copyright (c) 2012 
 * ��˾: ˼����Ϣ
 * ����: ����
 * �汾: 1.0 
 * ��������: Jan 27, 2014 
 * ����ʱ��: 11:48:55 PM
 */
public class SmsIdentityInterceptor implements Interceptor
{
	
	private static Logger logger = Logger.getLogger(SmsIdentityInterceptor.class);

	
	public Result intercept(ActionInvocation invocation) throws Exception
	{
		logger.info("���������֤������");
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
		     resultVo.setErr_info("��֤���ʱ");
		     return resultVo;
		}
		  if ((StringHelper.isNotEmpty(sms_code)) && (sms_code.equals(usms_code)))
		  {
			  resultVo.setErr_no(0);
			  resultVo.setErr_info("���óɹ�!");
		  }
		  else
		  {
			  resultVo.setErr_no(ErrorEnum.TICKET_ERROR.getErrorNo());
		      resultVo.setErr_info("��֤���������");
		  }
		  return resultVo;
	}
	
	
	
}
