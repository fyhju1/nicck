package com.thinkive.project;

/**
 * 描述: 
 * 版权: Copyright (c) 2012 
 * 公司: 思迪信息
 * 作者: 李炜
 * 版本: 1.0 
 * 创建日期: Feb 14, 2014 
 * 创建时间: 10:00:15 AM
 */
public class WebConstants
{
	
	/**
	 * cookie保存客户信息的ID
	 */
	public static final String COOKIE_CLIENT_INFO = "clientinfo";
	
	/**
	 * session保存客户ID的key
	 */
	public static final String SESSION_CLIENT_ID = "@session_client_id";
	
	/**
	 * session保存客户ID的key
	 */
	public static final String SESSION_USER_ID = "@session_user_id";
	/**
	 * session保存客户ID的key
	 */
	public static final String SESSION_FUND_ACCOUNT = "@session_fund_account";
	
	
	public static final String SESSION_FUND_CODE = "@session_fund_code";
	/**
	 * session中保存客户身份证的key
	 */
	public static final String SESSION_CLIENT_IDNO = "@session_client_idno";
	
	/**
	 * session中保存客户姓名的key
	 */
	public static final String SESSION_CLIENT_CUSTNAME = "@session_client_custname";
	
	/***
	 * session短信验证码
	 */
	public static final String SESSION_CUSTOM_SMS_CODE="@session_sms_code";
	
	/***
	 * session短信验证码存入时间
	 */
	public static final String SESSION_CUSTOM_SMS_DATE = "@session_sms_code_date";
	/**
	 * 调用flash的servlet 传入的 类名，首字母小写. 
	 */
	public static final String FLASH_NAME = "action";

	
}
