package com.thinkive.project.util;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
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

public class SSOUtils
{
    public static Logger logger = Logger.getLogger(SSOUtils.class);
    public static final String verifyKey = Configuration.getString("system.verifyKey");
    public static final String domain = Configuration.getString("sso.domain");
    public static final String cookiename = Configuration.getString("sso.cookiename");
    public static final AES aes = new AES(verifyKey);
    
    public static String getSSOCustName(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        String value = CookieHelper.getCookieValue(request, cookiename);
        
        if (!StringHelper.isBlank(value)) { // 确认有没有登录
        	String custName = SessionHelper.getString(WebConstants.SESSION_CLIENT_CUSTNAME, session);
        	String clientId = SessionHelper.getString(WebConstants.SESSION_CLIENT_ID, session);
        	String values = aes.decrypt(value, "UTF-8").trim();
        	if(StringHelper.isBlank(custName) || !values.equals(clientId)){
        		Result result = new Result();
        		Map<String,String> param = new HashMap<String,String>();
        		param.put("custno", values);
        		result = BusClientUtil.invoke(901132, param);
        		DataRow data = result.getData();
        		if(result.getErr_no() == 0 || data != null){
        			SessionHelper.setString(WebConstants.SESSION_CLIENT_CUSTNAME, data.getString("c_custname"), session);
        			SessionHelper.setString(WebConstants.SESSION_CLIENT_ID, values, session);
        		}
        		return data.getString("c_custname");
        	}else{
        		return custName;
        	}
        }
        return null;
    }
    
    public static void removeSSOCookie(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession();
        CookieHelper.removeCookie(request, response, cookiename);
        CookieHelper.setCookie(response, Configuration.getString("sso.cookiename"), "",
                0, "/", Configuration.getString("sso.domain"));
        SessionHelper.setObject(WebConstants.SESSION_CLIENT_CUSTNAME, null, session);
        SessionHelper.setObject(WebConstants.SESSION_CLIENT_ID, null, session);
        session.invalidate();
    }
    
    public static boolean hasSso(HttpServletRequest request, HttpServletResponse response) {
        Cookie value = CookieHelper.getCookieByName(request, cookiename);
        if (value != null) {
            String clientId = SessionHelper.getString(WebConstants.SESSION_CLIENT_ID, request.getSession());
            if(StringHelper.isNotEmpty(clientId)){
                String cookieValue = CookieHelper.getCookieValue(request, cookiename);
                String values = aes.decrypt(cookieValue, "UTF-8").trim();
                if(!values.equals(clientId)){
                    SessionHelper.setObject(WebConstants.SESSION_CLIENT_CUSTNAME, null, request.getSession());
                    SessionHelper.setObject(WebConstants.SESSION_CLIENT_ID, null, request.getSession());
                }
            }
            return true;
        }
        return false;
    }
}
