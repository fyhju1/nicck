package com.thinkive.project.interceptor;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import com.thinkive.base.config.Configuration;
import com.thinkive.base.util.CookieHelper;
import com.thinkive.base.util.SessionHelper;
import com.thinkive.base.util.StringHelper;
import com.thinkive.base.util.security.AES;
import com.thinkive.gateway.v2.result.Result;
import com.thinkive.project.WebConstants;
import com.thinkive.tbservice.interceptor.ActionInvocation;
import com.thinkive.tbservice.interceptor.Interceptor;

/**
 * ����: Ȩ��������
 * ��Ȩ: Copyright (c) 2012 
 * ��˾: ˼����Ϣ
 * ����: ���
 * �汾: 1.0 
 * ��������: Oct 9, 2013 
 * ����ʱ��: 2:02:46 PM
 */
public class SecurityInterceptor implements Interceptor
{
	
	private static Logger logger = Logger.getLogger(SecurityInterceptor.class);
	
	
	public Result intercept(ActionInvocation invocation) throws Exception
	{
		logger.info("����Ȩ��������");
		if (!isLogin(invocation.getRequest()))
		{
			Result resultVo = new Result();
			resultVo.setErr_no(-999);
			resultVo.setErr_info("����δ��¼");
			return resultVo;
		}
		return invocation.invoke();
	}
	
	/**
	 * �ж��û��Ƿ��Ѿ���¼
	 *
	 * @param actionInvocation
	 * @return
	 */
	private boolean isLogin(HttpServletRequest request)
	{
		String loginId = SessionHelper.getString(WebConstants.SESSION_CLIENT_ID, request.getSession());
		if (StringHelper.isEmpty(loginId))
		{
			//��cookie�л�ȡ�û���Ϣ
			String encodeStr = CookieHelper.getCookieValue(request, WebConstants.COOKIE_CLIENT_INFO);
			if (StringHelper.isNotEmpty(encodeStr))
			{
				String[] str = StringHelper.split(encodeStr, "&");
				if (str != null && str.length ==5) {
					String user_id = str[0];
					String verifyKey = Configuration.getString("system.verifyKey");

					AES aes = new AES(verifyKey);
					String decodeStr = aes.decrypt(user_id, "UTF-8");
					String[] temp = StringHelper.split(decodeStr, "|");// �˻�id
					if (temp.length == 2) {
						loginId = temp[0];
						SessionHelper.setString(WebConstants.SESSION_CLIENT_ID,loginId, request.getSession());
					}
				}
			}
		}
		return StringHelper.isNotEmpty(loginId) ? true : false;
	}
	
	/**
	 * �ж��û��Ե�ǰ�����Ĺ����Ƿ���Ȩ��
	 *
	 * @return
	 */
	private boolean hasPermission(ActionInvocation invocation)
	{
		//�ж��Ƿ����ڳ�������Ա
		//		if (SysLibrary.isSystemAdmin(invocation.getRequest().getSession()))
		//		{
		//			return true;
		//		}
		//		String funcNo = invocation.getFunctionConfig().getFuncId();
		//		HashSet catalogRights = SysLibrary.getUserFunctionRights(invocation.getRequest().getSession());
		//		if (catalogRights != null && catalogRights.contains(funcNo))
		//		{
		//			return true;
		//		}
		//		else
		//		{
		//			return false;
		//		}
		return true;
	}
}
