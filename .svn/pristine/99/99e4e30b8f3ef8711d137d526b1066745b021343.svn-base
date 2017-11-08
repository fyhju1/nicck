package com.thinkive.project.interceptor;

import java.util.List;

import org.apache.log4j.Logger;

import com.thinkive.base.jdbc.DBPage;
import com.thinkive.base.jdbc.DataRow;
import com.thinkive.base.util.SessionHelper;
import com.thinkive.base.util.StringHelper;
import com.thinkive.gateway.v2.result.Result;
import com.thinkive.project.WebConstants;
import com.thinkive.tbservice.constant.ErrorEnum;
import com.thinkive.tbservice.interceptor.ActionInvocation;
import com.thinkive.tbservice.interceptor.Interceptor;

/**
 * 描述: 用户信息拦截器
 * 版权: Copyright (c) 2012 
 * 公司: 思迪信息
 * 作者: 刘珂
 * 版本: 1.0 
 * 创建日期: Mar 10, 2014 
 * 创建时间: 10:15:43 AM
 */
public class UserInfoInterceptor implements Interceptor
{
	private static Logger logger = Logger.getLogger(UserInfoInterceptor.class);
	
	public Result intercept(ActionInvocation invocation) throws Exception
	{
		logger.info("进入 用户信息拦截器");
		Result result = invocation.invoke();
		DataRow resultData =null;
		if (result != null && result.getErr_no() == ErrorEnum.SUCCESS_CODE.getErrorNo())
		{
			List list=null;
			resultData= result.getData();
			if(resultData==null)
			{
				DBPage page=result.getPage();
				if(page!=null)
				{
					list=page.getData();
				}
				else
				{
					list=result.getList();
				}
				
			}
			
			if(list!=null&&list.size()>0)
			{
				resultData=(DataRow) list.get(0);
			}
			
			if(resultData!=null)
			{
				String mobile=resultData.getString("mobile"); 
				String cardno=resultData.getString("cardno");
				
				mobile=replaceSubString(mobile,3,7);
				cardno=replaceSubString(cardno,6,14);
				
				String sfundacco=SessionHelper.getString(WebConstants.SESSION_FUND_ACCOUNT, invocation.getRequest().getSession());
				if(StringHelper.isNotEmpty(sfundacco))
				{
						String[] strs=sfundacco.split("\\|");
						int strLength=strs.length;
						StringBuffer buff=new StringBuffer();
						for (int i=0;i<strLength;i++)
						{
							String key = strs[i];
							if (StringHelper.isNotEmpty(key))
							{
								if(i!=0)
								{
									buff.append("<span class='ml20'>"+replaceSubString(key,4,8)+"</span>");
								}
								else
								{
									buff.append(replaceSubString(key,4,8));
								}
							}
						}
						if(StringHelper.isNotEmpty(buff.toString()))
						{
							sfundacco=buff.toString();
						}
				}
				resultData.set("mobile", mobile);
				resultData.set("cardno", cardno);
				resultData.set("sfundacco", sfundacco);
				result.setResult(resultData);
			}
		}
		return result;
	}
	
	 public static String replaceSubString(String str,int begin,int end){
	        String sub="";
	        int length=str.length();
	        if(begin>=end)
	        {
	        	return str;
	        }
	        if(begin>=length)
	        {
	        	return str;
	        }
	        if(end>=length)
	        {
	        	end=length;
	        }
	       
	        try {
	            sub = str.substring(0, begin);
	            String endStr=str.substring(end,length);
	            StringBuffer sb=new StringBuffer();
	            for(int i=0;i<end-begin;i++){
	                sb=sb.append("*");
	            }
	            sub+=sb.toString();
	            sub+=endStr;
	        } catch (Exception e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	        }
	        return sub;
	    }
	
	public static void main(String[] args) {
		 String account="430482198902060014";
		 System.out.println(replaceSubString(account,6,14));
	}
}
