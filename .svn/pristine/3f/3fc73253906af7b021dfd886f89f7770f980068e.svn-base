package root;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;
import com.thinkive.base.jdbc.DBPage;
import com.thinkive.base.jdbc.DataRow;
import com.thinkive.gateway.v2.client.BusClient;
import com.thinkive.gateway.v2.client.Client;
import com.thinkive.gateway.v2.client.GateWayManager;
import com.thinkive.gateway.v2.client.impl.BusClientV1;
import com.thinkive.gateway.v2.factory.BusClientFactory;
import com.thinkive.gateway.v2.result.Result;
import com.thinkive.project.util.BusClientUtil;
import com.thinkive.tbservice.result.ResultVo;
import com.thinkive.tbservice.util.JsonHelper;
import com.thinkive.web.base.ActionResult;
import com.thinkive.web.base.BaseAction;

/**
 * 描述: 
 * 版权: Copyright (c) 2012 
 * 公司: 思迪信息
 * 作者: 李炜
 * 版本: 1.0 
 * 创建日期: Feb 14, 2014 
 * 创建时间: 3:46:21 PM
 */
public class TestAction extends BaseAction
{
	
	private static Logger logger = Logger.getLogger(TestAction.class);
	
	public ActionResult doDefault()
	{
		int funcNo = this.getIntParameter("funcNo");
		funcNo=900001;
		int currentPage = this.getIntParameter("curPage",1);
		int numPerPage = this.getIntParameter("numPerPage",20);
		String catalogId=this.getStrParameter("catalogId");
		String isPage=this.getStrParameter("isPage", "Y");
		String state=this.getStrParameter("state","3");
		int length = this.getIntParameter("length",20); 
		String gpdm=this.getStrParameter("gpdm");
		String type_fund=this.getStrParameter("type_fund");  //1.基金文章查询
		Map paraMap = new HashMap();
		paraMap.put("catalogId", catalogId);
		paraMap.put("gpdm", gpdm);
		paraMap.put("curPage", currentPage);
		paraMap.put("numPerPage", numPerPage);
		paraMap.put("isPage", "Y");
		paraMap.put("type_fund", type_fund);
		paraMap.put("state", state);
		Result result = new Result();
		DBPage page=null;
		try {
			result =BusClientUtil.invoke(funcNo, paraMap);
			if(result.getErr_no()==0)
			{
				page=result.getPage();
			}
			else
			{
				logger.error("文章分页调用BUS_ERROR："+result.getErr_info());
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 
	 * 描述：测试登陆
	 * 作者：刘宝
	 * 时间：2014-4-15 下午06:07:54
	 * @return
	 */
	private ResultVo testLogin()
	{
		ResultVo resultVo = new ResultVo();
		String userName = this.getStrParameter("userName");
		String password = this.getStrParameter("password");
		if(userName.equals("liubao") && password.equals("888888"))
		{
			DataRow userInfo = new DataRow();
			userInfo.set("userName", "刘宝");
			userInfo.set("age", "25");
			userInfo.set("lover", "猪媳妇");
			ArrayList dataList = new ArrayList();
			dataList.add(userInfo);
			resultVo.setErrorNo("0");
			resultVo.setErrorInfo("登陆成功！");
			resultVo.setResults(dataList);
		}
		else
		{
			resultVo.setErrorNo("-1");
			resultVo.setErrorInfo("用户名或者密码错误！");
		}
		return resultVo;
	}
	
	/**
	 * 
	 * 描述：测试查询
	 * 作者：刘宝
	 * 时间：2014-4-15 下午08:09:46
	 * @return
	 */
	private ResultVo testQuery()
	{
		ResultVo resultVo = new ResultVo();
		ArrayList dataList = new ArrayList();
		for(int i = 0; i < 10; i ++)
		{
			DataRow userInfo = new DataRow();
			userInfo.set("name", "刘宝");
			userInfo.set("age", "25");
			userInfo.set("lover", "猪媳妇");
			userInfo.set("sex", "0");
			dataList.add(userInfo);
		}
		resultVo.setErrorNo("0");
		resultVo.setErrorInfo("查询成功！");
		resultVo.setResults(dataList);
		return resultVo;
	
	}
}
