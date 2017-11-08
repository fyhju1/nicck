<%@ page language="java" isErrorPage="true" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
对不起，服务器内部发生异常！!!!!
<%
	exception.printStackTrace();
	out.print(exception);
%>